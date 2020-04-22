import React, { useState } from "react";
import * as d3 from "d3";

import Pie from "@components/charts/pie";
import Donut from "@components/charts/donut";

const Chart = () => {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value:
        value === null || value === undefined ? Math.random() * 100 : value,
    }));

  const [data, setData] = useState(generateData());

  const changeData = () => void setData(generateData());

  return (
    <>
      <button onClick={changeData}>New Data</button>
      <Pie
        data={data}
        width={200}
        height={200}
        innerRadius={60}
        outerRadius={100}
      />
      <Donut />
    </>
  );
};

export default Chart;
