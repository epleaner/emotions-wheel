import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import moment from 'moment';
import uniq from 'lodash.uniq';
import { scaleTime } from 'd3-scale';
import { forceSimulation, forceCollide } from 'd3-force';
import { axisBottom } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import { timeDay } from 'd3-time';
import { extent } from 'd3-array';
import { select as d3Select } from 'd3-selection';
import { easeCubicOut } from 'd3-ease';

// eslint-disable-next-line no-unused-consts
import { transition } from 'd3-transition';

// following example at https://observablehq.com/@syyeo/commonwealth-magazine-csr-ranking-beeswarm-chart-large-en
// as well as https://observablehq.com/d/895e1046752f8295

const Beeswarm = ({ data }) => {
  const width = 600;
  const height = 200;
  const margin = 50;
  const radius = 5;
  const svgRef = useRef(null);

  data = data.map((d) => ({
    ...d,
    date: new Date(moment(d.date).format('YYY/MM/DD')),
  }));

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(
          data.length === 1
            ? [data[0].date, data[0].date]
            : extent(data, (d) => d.date)
        )
        .range([0, width - margin]),
    [data, width]
  );

  const xAxis = useMemo(
    () =>
      axisBottom()
        .scale(xScale)
        .tickValues(uniq(data.map((d) => d.date)))
        .tickFormat(timeFormat('%m/%d')),
    [xScale, data]
  );

  const forceSim = useMemo(
    () => forceSimulation(data).force('collide', forceCollide(5)),
    [data]
  );

  const showTooltip = useMemo(
    () =>
      function () {
        const annotation = d3Select(this).selectAll('.annotation');
        annotation
          .attr('visibility', 'visible')
          .transition()
          .duration(250)
          .attr('opacity', 1);
      },
    []
  );

  const hideTooltip = useMemo(
    () =>
      function () {
        const annotation = d3Select(this).selectAll('.annotation');
        annotation
          .transition()
          .duration(250)
          .attr('opacity', 0)
          .on('end', () => annotation.attr('visibility', 'hidden'));
      },
    []
  );

  useEffect(() => {
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
      .attr('cx', (d) => xScale(d.date))
      .attr('cy', height / 2)
      .attr('class', 'circles');

    circles.attr('opacity', 0).transition().duration(1000).attr('opacity', 1);

    enteredNodes.append('text').attr('class', 'annotation');

    enteredNodes
      .merge(updatedNodes)
      .select('text')
      .attr('opacity', '0')
      .attr('visibility', 'hidden')
      .attr('fill', (d) => d.color)
      .text((d) => d.note)
      .transition()
      .ease(easeCubicOut)
      .duration(750)
      .attr('x', function (d) {
        const currentWidth = +this.getBBox().width;
        const currentX = xScale(d.date);
        let newX = currentX;

        currentX + currentWidth > width - 50
          ? (newX = currentX - currentWidth - 10)
          : (newX = currentX + 10);
        return newX;
      })
      .attr('dy', -10)
      .attr('dx', -5)
      .attr('y', (d) => d.y);

    enteredNodes.insert('rect', 'text').attr('class', 'annotation');

    enteredNodes
      .merge(updatedNodes)
      .select('rect')
      .attr('opacity', '0')
      .attr('visibility', 'hidden')
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
        const currentX = xScale(d.date);
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
  }, [data, width, xAxis, forceSim, xScale, showTooltip, hideTooltip]);

  return <main ref={svgRef}></main>;
};

Beeswarm.propTypes = {
  data: PropTypes.array,
};

export default observer(Beeswarm);
