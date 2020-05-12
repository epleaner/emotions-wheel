import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Pie = (props) => {
  const { data, width, height, innerRadius, outerRadius } = props;
  const ref = useRef(null);

  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const pieData = createPie(data);
    const group = d3.select(ref.current);

    const groupWithData = group.selectAll('g.arc').data(pieData);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .attr('class', 'arc');

    groupWithUpdate
      .append('path')
      .merge(groupWithData.select('path.arc'))
      .attr('class', 'arc')
      .attr('d', createArc)
      .attr('fill', (d, i) => colors(i));

    groupWithUpdate
      .append('text')
      .merge(groupWithData.select('text'))
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', (d) => `translate(${createArc.centroid(d)})`)
      .style('fill', 'white')
      .style('font-size', 10)
      .text((d) => d.label);
  });

  return (
    <svg width={width} height={height}>
      <g ref={ref} transform={`translate(${outerRadius} ${outerRadius})`} />
    </svg>
  );
};

export default Pie;
