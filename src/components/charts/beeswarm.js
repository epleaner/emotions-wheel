import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { scaleTime } from 'd3-scale';
import { forceSimulation, forceCollide } from 'd3-force';
import { axisBottom } from 'd3-axis';
import { timeDay } from 'd3-time';
import { extent } from 'd3-array';
import { select as d3Select } from 'd3-selection';
import { easeCubicOut } from 'd3-ease';

// eslint-disable-next-line no-unused-consts
import { transition } from 'd3-transition';

// following example at https://observablehq.com/@syyeo/commonwealth-magazine-csr-ranking-beeswarm-chart-large-en
const emotions = [
  {
    _id: '5eeb605c4fc2496e371a3aa9',
    date: '2020-06-18T12:38:52.880Z',
    color: 'rgb(238, 67, 149)',
    data: ['Joy', 'Happy', 'Jovial'],
    note: 'asdf',
  },
  {
    _id: '51eb605c4fc2496e371a3aa9',
    date: '2020-05-18T12:38:52.880Z',
    color: 'rgb(238, 67, 149)',
    data: ['Joy', 'Happy', 'Jovial'],
    note: 'aa',
  },
  {
    _id: '52eb605c4fc2496e371a3aa9',
    date: '2020-05-21T12:38:52.880Z',
    color: 'rgb(238, 67, 149)',
    data: ['Joy', 'Happy', 'Jovial'],
    note: 'bb',
  },
  {
    _id: '53eb605c4fc2496e371a3aa9',
    date: '2020-05-21T12:38:52.880Z',
    color: 'rgb(238, 67, 149)',
    data: ['Joy', 'Happy', 'Jovial'],
    note: '',
  },
];

const Beeswarm = ({ data }) => {
  const width = 600;
  const height = 200;
  const margin = 50;
  const radius = 5;
  const svgRef = useRef(null);

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(
          data.length === 1
            ? [data[0].date, data[0].date]
            : extent(data, (d) => new Date(d.date))
        )
        .range([0, width - margin]),
    [data, width]
  );

  const xAxis = useMemo(
    () => axisBottom().scale(xScale).ticks(timeDay.every(7)),
    [xScale]
  );

  const forceSim = useMemo(
    () => forceSimulation(data).force('collide', forceCollide(5)),
    [data]
  );

  useEffect(() => {
    function showTooltip() {
      d3Select(this).selectAll('.annotation').attr('visibility', 'visible');
    }
    function hideTooltip() {
      d3Select(this).selectAll('.annotation').attr('visibility', 'hidden');
    }

    const svg = d3Select(svgRef.current)
      .append('svg')
      .attr('viewBox', [0, 0, width, height + margin]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin / 2}, ${margin})`);

    const updatedNodes = g.selectAll('.circleGroup').data(data);
    const enteredNodes = updatedNodes
      .enter()
      .append('g')
      .attr('class', 'circleGroup');

    const circles = enteredNodes
      .append('circle')
      .attr('r', radius)
      .attr('fill', (d) => d.color)
      .attr('cx', (d) => xScale(new Date(d.date)))
      .attr('cy', height / 2)
      .attr('class', 'circles');

    circles.attr('opacity', 0).transition().duration(1000).attr('opacity', 1);

    enteredNodes
      .append('text')
      .attr('visibility', 'hidden')
      .attr('class', 'annotation');

    enteredNodes
      .merge(updatedNodes)
      .select('text')
      .attr('fill', (d) => d.color)
      .text((d) => d.note)
      .transition()
      .ease(easeCubicOut)
      .duration(750)
      .attr('x', function (d) {
        const currentWidth = +this.getBBox().width;
        const currentX = xScale(new Date(d.date));
        let newX = currentX;

        currentX + currentWidth > width - 50
          ? (newX = currentX - currentWidth - 10)
          : (newX = currentX + 10);
        return newX;
      })
      .attr('dy', -10)
      .attr('dx', -5)
      .attr('y', (d) => d.y);

    enteredNodes
      .insert('rect', 'text')
      .attr('visibility', 'hidden')
      .attr('class', 'annotation');

    enteredNodes
      .merge(updatedNodes)
      .select('rect')
      .attr('width', function () {
        const textWidth = d3Select(this.parentNode)
          .select('text')
          .node()
          .getBBox().width;
        return textWidth > 0 ? textWidth + 10 : textWidth;
      })
      .attr('height', function () {
        const textHeight = d3Select(this.parentNode)
          .select('text')
          .node()
          .getBBox().height;
        return textHeight > 0 ? textHeight + 10 : textHeight;
      })
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('fill', '#bdbdbd')
      .attr('fill-opacity', 0.8)
      .transition()
      .ease(easeCubicOut)
      .duration(750)
      .attr('x', function (d) {
        const currentWidth = +this.getBBox().width;
        const currentX = xScale(new Date(d.date));
        let newX = currentX;

        currentX + currentWidth > width - 50
          ? (newX = currentX - currentWidth - 10)
          : (newX = currentX + 10);
        return newX;
      })
      .attr('y', (d) => d.y - 30);

    updatedNodes
      .select('.circles')
      .transition()
      .ease(easeCubicOut)
      .duration(750)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => height / 2 + d.y);

    enteredNodes
      .merge(updatedNodes)
      .on('mouseover', showTooltip)
      .on('mouseout', hideTooltip);

    forceSim.on('tick', () => {
      circles.attr('cy', (d) => d.y);
    });

    g.append('g')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis);

    return () => {
      d3Select(svg).remove();
    };
  }, [data, width, xAxis, forceSim, xScale]);

  return <main ref={svgRef}></main>;
};

Beeswarm.propTypes = {
  data: PropTypes.array,
};

export default observer(Beeswarm);
