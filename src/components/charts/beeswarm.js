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
import { event as d3Event, select as d3Select } from 'd3-selection';

// eslint-disable-next-line no-unused-vars
import { transition } from 'd3-transition';

// following example at https://observablehq.com/@syyeo/commonwealth-magazine-csr-ranking-beeswarm-chart-large-en
// as well as https://observablehq.com/d/895e1046752f8295

const Beeswarm = ({ data = [], showDetails }) => {
  const width = 600;
  const height = 200;
  const margin = 50;
  const radius = 10;
  const growth = 5;
  const svgRef = useRef(null);
  const nodesRef = useRef(null);
  const gRef = useRef(null);

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
    () =>
      forceSimulation(data)
        .force('collide', forceCollide(radius + growth + 0.5))
        .force('x', forceX((d) => xScale(d.date)).strength(1))
        .force('y', forceY(height / 2).strength(1)),
    [data, xScale]
  );

  useEffect(() => {
    const svg = d3Select(svgRef.current)
      .append('svg')
      .attr('viewBox', [0, 0, width, height + margin]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin / 2}, ${margin})`);

    gRef.current = g;

    svg.on('click', function () {
      d3Select(this)
        .selectAll('.clicked')
        .attr('class', '')
        .transition()
        .duration(250)
        .attr('r', radius);

      showDetails(null);
    });

    return () => {
      d3Select(svg).remove();
    };
  }, [showDetails]);

  useEffect(() => {
    const updatedNodes = gRef.current
      .selectAll('.circleGroup')
      .data(data, (d) => d._id);

    updatedNodes
      .exit()
      .select('circle')
      .transition()
      .duration(500)
      .attr('r', 0)
      .remove();

    const enteredNodes = updatedNodes
      .enter()
      .append('g')
      .attr('class', 'circleGroup');

    const circles = enteredNodes
      .append('circle')
      .attr('r', radius)
      .attr('fill', (d) => d.color);

    circles.attr('opacity', 0).transition().duration(1000).attr('opacity', 1);

    forceSim.on('tick', () => {
      circles.attr('cx', (d) => d.x);
      circles.attr('cy', (d) => d.y);
    });

    gRef.current
      .append('g')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis);

    nodesRef.current = enteredNodes.merge(updatedNodes);
  }, [data, width, xAxis, xScale, forceSim, showDetails]);

  useEffect(() => {
    if (nodesRef.current)
      nodesRef.current
        .on('mouseover', function (d) {
          d3Select(this)
            .select('circle')
            .transition()
            .duration(250)
            .attr('r', radius + growth);

          showDetails(d);
        })
        .on('click', function (d) {
          d3Event.stopPropagation();

          d3Select(svgRef.current)
            .selectAll('.clicked')
            .attr('class', '')
            .transition()
            .duration(250)
            .attr('r', radius);

          d3Select(this)
            .select('circle')
            .attr('class', 'clicked')
            .transition()
            .duration(250)
            .attr('r', radius + growth);

          showDetails(d);
        })
        .on('mouseout', function () {
          if (
            // check if any nodes are already clicked
            // this should be cleaner but cannot find a way do to so via the api yet
            d3Select(svgRef.current).selectAll('.clicked')._groups[0].length ===
            0
          )
            showDetails(null);
          else showDetails(d3Select('.clicked').data()[0]);

          if (d3Select(this).select('circle').attr('class') !== 'clicked') {
            d3Select(this)
              .select('circle')
              .transition()
              .duration(250)
              .attr('r', radius);
          }
        });
  }, [data, xScale, showDetails, forceSim]);

  return <main ref={svgRef}></main>;
};

Beeswarm.propTypes = {
  data: PropTypes.array,
  showDetails: PropTypes.func.isRequired,
};

export default observer(Beeswarm);
