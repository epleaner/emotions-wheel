import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Pie = (props) => {
  const { width, height, innerRadius, outerRadius } = props;
  const ref = useRef(null);

  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

  useEffect(() => {
    const data = createPie(props.data);
    console.log("data", data);
    const group = d3.select(ref.current);
    console.log("group", group);

    const groupWithData = group.selectAll("g.arc").data(data);
    console.log("groupwithdata", groupWithData);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");
    console.log("groupwithupdate", groupWithUpdate);

    groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"))
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors(i));

    groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"))
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text((d) => format(d.value));
  }, [props.data]);

  return (
    <svg width={width} height={height}>
      <g ref={ref} transform={`translate(${outerRadius} ${outerRadius})`} />
    </svg>
  );
};

export default Pie;
