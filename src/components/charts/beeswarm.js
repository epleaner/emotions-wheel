import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import moment from 'moment';
import uniq from 'lodash.uniq';
import { scaleTime } from 'd3-scale';
import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force';
import { axisBottom } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import { extent } from 'd3-array';
import { select as d3Select } from 'd3-selection';

// eslint-disable-next-line no-unused-consts
import { transition } from 'd3-transition';

// following example at https://observablehq.com/@syyeo/commonwealth-magazine-csr-ranking-beeswarm-chart-large-en
// as well as https://observablehq.com/d/895e1046752f8295

const Beeswarm = ({ data, onHover }) => {
  const width = 600;
  const height = 200;
  const margin = 50;
  const radius = 10;
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
      .attr('class', 'circles');

    circles.attr('opacity', 0).transition().duration(1000).attr('opacity', 1);

    forceSimulation(data)
      .force('collide', forceCollide(radius))
      .force('x', forceX((d) => xScale(d.date)).strength(1))
      .force('y', forceY(height / 2).strength(1))
      .on('tick', () => {
        circles.attr('cx', (d) => d.x);
        circles.attr('cy', (d) => d.y);
      });

    enteredNodes
      .merge(updatedNodes)
      .on('mouseover', (d) => onHover(d))
      .on('mouseout', () => onHover(null));

    g.append('g')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis);

    return () => {
      d3Select(svg).remove();
    };
  }, [data, width, xAxis, xScale, onHover]);

  return <main ref={svgRef}></main>;
};

Beeswarm.propTypes = {
  data: PropTypes.array,
  onHover: PropTypes.func.isRequired,
};

export default observer(Beeswarm);
