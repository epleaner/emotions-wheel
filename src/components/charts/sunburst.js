import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import jsonData from '@static/emotions.json';

import * as d3 from 'd3';

const Sunburst = (props) => {
  const [sunburstSvg, setSvg] = useState(null);
  const ref = useRef(null);

  const { width = 800, height = 800 } = props;

  const formatNumber = useMemo(() => d3.format(',d'), []);

  const x = useMemo(
    () =>
      d3
        .scaleLinear()
        .range([0, 2 * Math.PI])
        .clamp(true),
    []
  );

  const maxRadius = useMemo(() => Math.min(width, height) / 2 - 5, [
    width,
    height,
  ]);

  const y = useMemo(
    () =>
      d3
        .scaleSqrt()
        .domain([0.25, 1])
        .range([maxRadius * 0.05, maxRadius]),
    [maxRadius]
  );

  const root = useMemo(() => {
    const root = d3.hierarchy(jsonData);
    root.sum((d) => d.size);

    return root;
  }, []);

  const partition = useMemo(() => d3.partition(), []);

  const color = useMemo(
    () =>
      d3
        .scaleOrdinal()
        .domain(
          partition(root)
            .descendants()
            .map((d) => d.data.name)
        )
        .range(d3.schemePaired),
    [partition, root]
  );

  const sunburstArc = useMemo(
    () =>
      d3
        .arc()
        .startAngle((d) => x(d.x0))
        .endAngle((d) => x(d.x1))
        .innerRadius((d) => Math.max(0, y(d.y0)))
        .outerRadius((d) => Math.max(0, y(d.y1)))
        .cornerRadius(4),
    [x, y]
  );

  const middleArcLine = useCallback(
    (d) => {
      const halfPi = Math.PI / 2;
      const radius = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

      const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
      const middleAngle = (angles[1] + angles[0]) / 2;
      const invertDirection = middleAngle > 0 && middleAngle < Math.Pi; // on lower quadrants write text ccw
      if (invertDirection) angles.reverse();

      const path = d3.path();
      path.arc(0, 0, radius, angles[0], angles[1], invertDirection);

      return path.toString();
    },
    [x, y]
  );

  const textFits = useCallback(
    (d) => {
      const charSpace = 6;

      const deltaAngle = x(d.x1) - x(d.x0);
      const radius = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
      const perimeter = radius * deltaAngle;

      return d.data.name.length * charSpace < perimeter;
    },
    [x, y]
  );

  const focusOn = useCallback(
    (svg, d = { x0: 0, x1: 1, y0: 0, y1: 1 }) => {
      // reset to top-level if no data point specified

      const transition = svg
        .transition()
        .duration(750)
        .tween('scale', () => {
          const xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
          const yd = d3.interpolate(y.domain(), [0.25, 1]);

          return (t) => {
            x.domain(xd(t));
            y.domain(yd(t));
          };
        });

      transition
        .selectAll('path.main-arc')
        .attrTween('d', (d) => () => sunburstArc(d));
      transition
        .selectAll('path.hidden-arc')
        .attrTween('d', (d) => () => middleArcLine(d));
      transition
        .selectAll('text')
        .attrTween('display', (d) => () => (textFits(d) ? null : 'none'));

      const moveStackToFront = (elementId) => {
        svg
          .selectAll('.slice')
          .filter((d) => d === elementId)
          .each((d, _, node) => {
            if (node.parentsNode) {
              node.parentNode.appendChild(node);
              if (d.parent) moveStackToFront(d.parent);
            }
          });
      };

      moveStackToFront(d);
    },
    [sunburstArc, middleArcLine, textFits, x, y]
  );

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .append('svg')
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
      .on('click', () => focusOn(svg)); // Reset zoom on canvas click

    setSvg(svg);
  }, [width, height, focusOn]);

  useEffect(() => {
    if (sunburstSvg === null) return;
    const slice = sunburstSvg
      .selectAll('g.slice')
      .data(partition(root).descendants().slice(1));
    slice.exit().remove();

    const newSlices = slice
      .enter()
      .append('g')
      .attr('class', 'slice')
      .style('cursor', 'pointer')
      .on('click', (d) => {
        d3.event.stopPropagation();
        focusOn(sunburstSvg, d);
      });

    newSlices
      .append('title')
      .text((d) => `${d.data.name} – ${formatNumber(d.value)}`);
    newSlices
      .append('path')
      .attr('class', 'main-arc')
      .style('fill', (d) => color((d.children ? d : d.parent).data.name))
      .style('stroke', '#fff')
      .style('stroke-width', 1)
      .attr('d', sunburstArc);
    newSlices
      .append('path')
      .attr('class', 'hidden-arc')
      .style('fill', 'none')
      .attr('id', (_, i) => `hiddenArc${i}`)
      .attr('d', middleArcLine);

    const text = newSlices
      .append('text')
      .attr('display', (d) => (textFits(d) ? null : 'none'))
      .style('pointer-events', 'none')
      .style('dominant-baseline', 'middle')
      .style('text-anchor', 'middle');

    // white contour
    text
      .append('textPath')
      .attr('startOffset', '50%')
      .attr('xlink:href', (_, i) => `#hiddenArc${i}`)
      .text((d) => d.data.name)
      .style('fill', 'none')
      .style('stroke', '#fff')
      .style('stroke-width', 5)
      .style('stroke-linejoin', 'round');

    text
      .append('textPath')
      .attr('startOffset', '50%')
      .attr('xlink:href', (_, i) => `#hiddenArc${i}`)
      .text((d) => d.data.name);
  }, [
    sunburstSvg,
    partition,
    root,
    focusOn,
    formatNumber,
    sunburstArc,
    middleArcLine,
    color,
    textFits,
  ]);

  return <main ref={ref}></main>;
};

Sunburst.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Sunburst;
