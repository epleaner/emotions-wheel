import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import jsonData from '@static/emotions.json';

import * as d3 from 'd3';

const Sunburst = (props) => {
  const ref = useRef(null);

  const { width = 800 } = props;

  useEffect(() => {
    const data = jsonData;
    const partition = (data) => {
      const root = d3.hierarchy(data).sum((d) => d.size);
      return d3.partition().size([2 * Math.PI, root.height + 1])(root);
    };

    const root = partition(data);
    root.each((d) => (d.current = d));

    const radius = width / 8;
    const color = d3.scaleOrdinal(
      d3.quantize(d3.interpolateRainbow, data.children.length + 1)
    );

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d) => d.y0 * radius)
      .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1))
      .cornerRadius(25);

    const svg = d3
      .select(ref.current)
      .append('svg')
      .style('width', '100vw')
      .style('height', '80vh')
      .attr('viewBox', [0, 0, width, width])
      .style('font', '10px sans-serif');

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${width / 2})`);

    const path = g
      .append('g')
      .selectAll('path')
      .data(root.descendants().slice(1))
      .join('path')
      .attr('fill', (d) => parentColor(d))
      .attr('fill-opacity', (d) => opacity(d))
      .attr('d', (d) => arc(d.current))
      .style('cursor', 'pointer')
      .on('click', clicked);

    path.append('title').text((d) => d.data.name);

    const label = g
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

    const parent = g
      .append('circle')
      .datum(root)
      .attr('r', radius / 1.1)
      .attr('fill', (d) => parentColor(d))
      .attr('pointer-events', 'all')
      .on('click', clicked);

    const parentLabel = g
      .append('text')
      .datum(root)
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .style('user-select', 'none')
      .join('text')
      .attr('dy', '0.35em')
      .text((d) => d.data.name);

    function clicked(p) {
      parent.datum(p.parent || root);

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

      const t = g.transition().duration(750);
      const tShort = g.transition().duration(100);

      parent.style('cursor', () => (p.parent ? 'pointer' : null));

      parent.transition(t).attr('fill', () => {
        return parentColor(p);
      });

      parentLabel
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
      path
        .transition(t)
        .tween('data', (d) => {
          const i = d3.interpolate(d.current, d.target);
          return (t) => (d.current = i(t));
        })
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || arcVisible(d.target);
        })
        .attr('fill-opacity', (d) => (arcVisible(d.target) ? opacity(d) : 0))
        .attrTween('d', (d) => () => arc(d.current));

      label
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || labelVisible(d.target);
        })
        .transition(t)
        .attr('fill-opacity', (d) => +labelVisible(d.target))
        .attrTween('transform', (d) => () => labelTransform(d.current));
    }

    function parentColor(d) {
      if (d.depth === 0) return 'white';
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    }

    function opacity(d) {
      return 1 / d.depth + 0.2;
    }

    function arcVisible(d) {
      return d.y1 <= 4 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 4 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  }, [width]);

  return <main ref={ref}></main>;
};

Sunburst.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Sunburst;
