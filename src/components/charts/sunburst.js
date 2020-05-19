import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import jsonData from '@static/emotions.json';

import { partition as d3Partition, hierarchy } from 'd3-hierarchy';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { quantize, interpolate } from 'd3-interpolate';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { arc as d3Arc } from 'd3-shape';
import { select as d3Select } from 'd3-selection';
// eslint-disable-next-line no-unused-vars
import { transition } from 'd3-transition';

const Sunburst = ({ width = 600, onSelect }) => {
  const ref = useRef(null);

  useEffect(() => {
    // following example at https://observablehq.com/@d3/zoomable-sunburst
    const data = jsonData;
    const partition = (data) => {
      const root = hierarchy(data).sum((d) => d.size);
      return d3Partition().size([2 * Math.PI, root.height + 1])(root);
    };

    const root = partition(data);
    root.each((d) => (d.current = d));

    const chartRadius = width / 3;
    const centerCircleRadius = 25;

    const yScale = scaleLinear()
      .domain([1, 3])
      .range([centerCircleRadius * 1.1, chartRadius]);

    const color = scaleOrdinal(
      quantize(interpolateRainbow, data.children.length + 1)
    );

    const arc = d3Arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(chartRadius * 1.5)
      .innerRadius((d) => yScale(d.y0))
      .outerRadius((d) => yScale(d.y1))
      .cornerRadius(25);

    const svg = d3Select(ref.current)
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
      .attr('r', centerCircleRadius)
      .attr('opacity', () => 0)
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
      onSelect(p.parent ? { ...p, color: parentColor(p) } : null);
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

      if (p.parent) {
        parent
          .transition(t)
          .attr('fill', () => {
            return parentColor(p);
          })
          .attr('opacity', 1);
      } else {
        parent.transition(t).attr('opacity', 0);
      }

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
          const i = interpolate(d.current, d.target);
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
      if (d.depth === 0) return null;
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    }

    function opacity(d) {
      return 1 / d.depth + 0.2;
    }

    function arcVisible(d) {
      const layersToShow = 4; //isMobileOnly ? 3 : 4;

      return d.y1 <= layersToShow && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      const layersToShow = 4; //isMobileOnly ? 3 : 4;

      return (
        d.y1 <= layersToShow &&
        d.y0 >= 1 &&
        (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03
      );
    }

    function labelTransform(d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = yScale((d.y0 + d.y1) / 2);
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  }, [width, onSelect]);

  return <main ref={ref}></main>;
};

Sunburst.propTypes = {
  width: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default Sunburst;
