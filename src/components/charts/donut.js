import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

// const dataInner = ['Happy', 'Sad', 'Angry', 'Afraid', 'Lonely'];
const dataInner = [1, 2, 3, 4, 5];

const Donut = () => {
  const height = 400;
  const width = 400;

  let pie = d3.pie()(dataInner);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        <Slice pie={pie} />
      </g>
    </svg>
  );
};

const Slice = (props) => {
  let { pie } = props;

  let interpolateInner = d3.interpolateRgb('#eaaf79', '#bc3358');

  return pie.map((slice, index) => {
    let sliceColor = interpolateInner(index / (pie.length - 1));

    return (
      <Path
        key={`${slice.startAngle}-${slice.endAngle}`}
        radius={130}
        interpolate={interpolateInner}
        slice={slice}
        sliceColor={sliceColor}
      />
    );
  });
};

const Path = (props) => {
  const { radius, slice, sliceColor } = props;

  const [isHovered, setIsHovered] = useState(false);

  const onMouseOver = () => setIsHovered(true);
  const onMouseOut = () => setIsHovered(false);

  const interpolateOuter = d3.interpolateRgb('#36384b', '#4992ab');
  const dataOuter = [1, 2, 4];

  const outerRadius = isHovered ? radius * 1.1 : radius;
  const innerRadius = radius * 0.7;

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .padAngle(0.01)
    .cornerRadius(2);

  const arcSlice = arc(slice);

  let outerPie = d3.pie().startAngle(slice.startAngle).endAngle(slice.endAngle);

  const arc2 = d3
    .arc()
    .innerRadius(outerRadius * 1.01)
    .outerRadius(outerRadius * 1.3)
    .padAngle(0.005)
    .cornerRadius(0);

  return (
    <g>
      <path
        d={arcSlice}
        fill={sliceColor}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      />
      {outerPie(dataOuter).map((outerSlice, index) => {
        let sliceColorOuter = interpolateOuter(
          index / (outerPie(dataOuter).length - 1)
        );

        return (
          <path
            key={`${outerSlice.value}-${outerSlice.startAngle}-${outerSlice.endAngle}`}
            d={arc2(outerSlice)}
            fill={sliceColorOuter}
          />
        );
      })}
      {isHovered && <circle r={innerRadius * 0.95} fill={sliceColor} />}
    </g>
  );
};

Path.propTypes = {
  radius: PropTypes.number.isRequired,
  slice: PropTypes.object.isRequired,
  sliceColor: PropTypes.any.isRequired,
};

export default Donut;
