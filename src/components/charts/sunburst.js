import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import jsonData from '@static/emotions.json';

import { partition as d3Partition, hierarchy } from 'd3-hierarchy';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { quantize, interpolate } from 'd3-interpolate';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { arc as d3Arc } from 'd3-shape';
import { select as d3Select } from 'd3-selection';
// eslint-disable-next-line no-unused-consts
import { transition } from 'd3-transition';

// following example at https://observablehq.com/@d3/zoomable-sunburst

const Sunburst = ({
  width = 600,
  centerCircleRadius = 25,
  onSelect,
  shouldReset,
  onReset,
}) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const pathRef = useRef(null);
  const labelRef = useRef(null);
  const parentRef = useRef(null);
  const parentLabelRef = useRef(null);

  const chartRadius = useMemo(() => width / 3, [width]);

  const root = useMemo(() => {
    const partition = (data) => {
      const dataHierarchy = hierarchy(data).sum((d) => d.size);
      return d3Partition().size([2 * Math.PI, dataHierarchy.height + 1])(
        dataHierarchy
      );
    };

    const root = partition(jsonData);
    root.each((d) => (d.current = d));
    return root;
  }, []);

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([1, 3])
        .range([centerCircleRadius * 1.1, chartRadius]),
    [centerCircleRadius, chartRadius]
  );

  const color = useMemo(
    () =>
      scaleOrdinal(quantize(interpolateRainbow, jsonData.children.length + 1)),
    []
  );

  const parentColor = useMemo(
    () => (d) => {
      if (d.depth === 0) return null;
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    },
    [color]
  );

  const opacity = useMemo(
    () => (d) => {
      return 1 / d.depth + 0.2;
    },
    []
  );

  const arc = useMemo(
    () =>
      d3Arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(chartRadius * 1.5)
        .innerRadius((d) => yScale(d.y0))
        .outerRadius((d) => yScale(d.y1) - 5)
        .cornerRadius(10),
    [chartRadius, yScale]
  );

  const labelVisible = useMemo(
    () => (d) => {
      const layersToShow = 4; //isMobileOnly ? 3 : 4;

      return (
        d.y1 <= layersToShow &&
        d.y0 >= 1 &&
        (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03
      );
    },
    []
  );

  const labelTransform = useMemo(
    () => (d) => {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = yScale((d.y0 + d.y1) / 2);
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    },
    [yScale]
  );

  const getHierarchy = useMemo(
    () => (p) => {
      const hierarchy = [];
      let current = p;

      while (current.parent) {
        hierarchy.unshift(current.data.name);
        current = current.parent;
      }

      return hierarchy;
    },
    []
  );

  const arcVisible = useMemo(
    () => (d) => {
      const layersToShow = 4; //isMobileOnly ? 3 : 4;

      return d.y1 <= layersToShow && d.y0 >= 1 && d.x1 > d.x0;
    },
    []
  );

  const clicked = useCallback(
    (p) => {
      onSelect(
        p.parent ? { data: getHierarchy(p), color: parentColor(p) } : null
      );

      parentRef.current.datum(p.parent || root);

      root.each(
        (d) =>
          (d.target = {
            x0:
              Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            x1:
              Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          })
      );

      const t = gRef.current.transition().duration(750);
      const tShort = gRef.current.transition().duration(100);

      parentRef.current.style('cursor', () => (p.parent ? 'pointer' : null));

      if (p.parent) {
        parentRef.current
          .transition(t)
          .attr('fill', () => {
            return parentColor(p);
          })
          .attr('opacity', 1);
      } else {
        parentRef.current.transition(t).attr('opacity', 0);
      }

      parentRef.current
        .transition(t)
        .attr('r', p.height === 0 ? chartRadius / 2 : centerCircleRadius);

      parentLabelRef.current
        .transition(tShort)
        .attr('fill-opacity', () => 0)
        .transition()
        .delay(0)
        .text(() => p.data.name)
        .transition(tShort)
        .attr('fill-opacity', () => 1);

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      pathRef.current
        .transition(t)
        .tween('data', (d) => {
          const i = interpolate(d.current, d.target);
          return (t) => (d.current = i(t));
        })
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || arcVisible(d.target);
        })
        .attr('fill-opacity', (d) => (arcVisible(d.target) ? opacity(d) : 0))
        .attrTween('d', (d) => () => arc(d.current));

      labelRef.current
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || labelVisible(d.target);
        })
        .transition(t)
        .attr('fill-opacity', (d) => +labelVisible(d.target))
        .attrTween('transform', (d) => () => labelTransform(d.current));
    },
    [
      parentRef,
      labelRef,
      pathRef,
      gRef,
      arc,
      root,
      chartRadius,
      centerCircleRadius,
      onSelect,
      getHierarchy,
      arcVisible,
      parentColor,
      opacity,
      labelVisible,
      labelTransform,
    ]
  );

  //on mount: create the svg element and it's group child
  // on unmount: remove svg
  useEffect(() => {
    const svg = d3Select(svgRef.current)
      .append('svg')
      .style('width', '100vw')
      .style('height', '80vh')
      .attr('viewBox', [0, 0, width, width])
      .style('font', '10px sans-serif');

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${width / 2})`);

    gRef.current = g;

    // filters go in defs element
    const defs = svg.append('defs');

    //Code taken from http://stackoverflow.com/questions/9630008/how-can-i-create-a-glow-around-a-rectangle-with-svg
    //Filter for the outside glow
    const filter = defs.append('filter').attr('id', 'glow');

    filter
      .append('feGaussianBlur')
      .attr('class', 'blur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    return () => {
      d3Select('svg').remove();
    };
  }, [width]);

  useEffect(() => {
    function handleMouseOver() {
      d3Select(this).style('filter', 'url(#glow)');
    }
    function handleMouseOut() {
      d3Select(this).style('filter', 'none');
    }
    const path = gRef.current
      .append('g')
      .selectAll('path')
      .data(root.descendants().slice(1))
      .join('path')
      .attr('fill', (d) => parentColor(d))
      .attr('fill-opacity', (d) => opacity(d))
      .attr('d', (d) => arc(d.current))
      .style('cursor', 'pointer')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .on('click', clicked);

    path.append('title').text((d) => d.data.name);

    pathRef.current = path;

    const label = gRef.current
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .style('user-select', 'none')
      .selectAll('text')
      .data(root.descendants().slice(1))
      .join('text')
      .attr('dy', '0.35em')
      .attr('fill-opacity', (d) => opacity(d.current))
      .attr('transform', (d) => labelTransform(d.current))
      .text((d) => d.data.name);

    labelRef.current = label;

    const parent = gRef.current
      .append('circle')
      .datum(root)
      .attr('r', centerCircleRadius)
      .attr('opacity', () => 0)
      .attr('pointer-events', 'all')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .on('click', clicked);

    parentRef.current = parent;

    const parentLabel = gRef.current
      .append('text')
      .datum(root)
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .style('user-select', 'none')
      .join('text')
      .attr('dy', '0.35em')
      .text((d) => d.data.name);

    parentLabelRef.current = parentLabel;
  }, [
    gRef,
    arc,
    root,
    centerCircleRadius,
    clicked,
    labelTransform,
    opacity,
    parentColor,
  ]);

  useEffect(() => {
    if (shouldReset) {
      // mock clicking the root node to reuse animation logic
      clicked({
        parent: null,
        data: { name: '' },
        depth: 0,
        x0: 0,
        x1: 2 * Math.PI,
      });

      onReset();
    }
  }, [clicked, shouldReset, onReset]);

  return <main ref={svgRef}></main>;
};

Sunburst.propTypes = {
  width: PropTypes.number,
  centerCircleRadius: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  shouldReset: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Sunburst;
