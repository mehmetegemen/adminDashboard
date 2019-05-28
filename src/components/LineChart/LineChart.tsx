import * as d3 from "d3";
import React, { FunctionComponent, useEffect, useRef } from "react";
import IQuarter from "./IQuarter";
import "./LineChart.scss";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineChart: FunctionComponent<{
  data: IQuarter[],
}> = ({ data }) => {
  const lineChart = useRef((null as unknown) as HTMLDivElement);
  const svg = useRef((null as unknown) as SVGSVGElement);
  const xAxis = useRef((null as unknown) as SVGGElement);
  const yAxis = useRef((null as unknown) as SVGGElement);
  const path = useRef((null as unknown) as SVGPathElement);
  const presentationArea = useRef((null as unknown) as SVGGElement);
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };
  useEffect(() => {
    drawChart();
  });
  const update = ({
    xScale,
    yScale,
  }: {
    xScale: d3.ScalePoint<string>;
    yScale: d3.ScaleLinear<number, number>;
  }) => {
    const points = d3
      .select(presentationArea.current)
      .selectAll(".line-chart__dot")
      .data(data);
    const line = d3
      .line<IQuarter>()
      .x((d) => xScale(d.month) as number)
      .y((d) => yScale(d.balance))
      .curve(d3.curveMonotoneX);
    yScale.domain([
      0,
      d3.max(
        data,
        (d): number => {
          return d.balance;
        },
      ) as number,
    ]);

    xScale.domain(data.map((d) => d.month));
    points.exit().transition().remove();

    points
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("class", "line-chart__dot")
      .attr("cx", (d) => xScale(d.month) as number)
      .attr("cy", (d) => yScale(d.balance) as number)
      .merge((points as unknown) as d3.Selection<
        SVGCircleElement,
        IQuarter,
        SVGGElement,
        {}
      >)
      .transition()
      .attr("cx", (d) => xScale(d.month) as number)
      .attr("cy", (d) => yScale(d.balance) as number);

    d3.select(yAxis.current).transition().call(d3.axisLeft(yScale));
    d3.select(xAxis.current).transition().call(d3.axisBottom(xScale));

    d3.select(path.current)
      .datum(data)
      .attr("class", "line-chart__line")
      .transition()
      .attr("d", line);
  };

  const drawChart = () => {
    const chartWidth = 800;
    const chartHeight = 250;
    const yScale = d3.scaleLinear().range([chartHeight, 0]);
    const xScale = d3.scalePoint().range([0, chartWidth]);
    d3.select(xAxis.current).attr(
      "transform",
      `translate(${margin.left},${chartHeight + margin.top})`,
    );
    d3.select(yAxis.current).attr(
      "transform",
      `translate(${margin.left},${margin.top})`,
    );

    update({ xScale, yScale });
  };
  return (
    <div className="line-chart" ref={lineChart}>
      <svg ref={svg} viewBox="0 0 880 330" preserveAspectRatio="xMinYMin meet">
        <g ref={yAxis} />
        <g ref={xAxis} />
        <g
          transform={`translate(${margin.left},${margin.top})`}
          ref={presentationArea}
        >
          <path ref={path} />
        </g>
        <path />
      </svg>
    </div>
  );
};

export default LineChart;
