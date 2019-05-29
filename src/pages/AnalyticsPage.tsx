import React, { FunctionComponent, useEffect, useState } from "react";
import LineChart from "../components/LineChart/LineChart";
import QuarterSelection from "../components/QuarterSelection/QuarterSelection";

import IQuarter from "../components/LineChart/IQuarter";
import "./AnalyticsPage.scss";

const data: IQuarter[][] = [
  [
    {
      balance: 960,
      month: "January",
    },
    {
      balance: 1400,
      month: "February",
    },
    {
      balance: 1960,
      month: "March",
    },
  ],
  [
    {
      balance: 1160,
      month: "April",
    },
    {
      balance: 400,
      month: "May",
    },
    {
      balance: 960,
      month: "June",
    },
  ],
  [
    {
      balance: 960,
      month: "July",
    },
    {
      balance: 2400,
      month: "August",
    },
    {
      balance: 1200,
      month: "September",
    },
  ],
  [
    {
      balance: 1960,
      month: "October",
    },
    {
      balance: 400,
      month: "November",
    },
    {
      balance: 200,
      month: "December",
    },
  ],
];

const AnalyticsPage: FunctionComponent = (props) => {
  const [state, setState] = useState({
    quarter: 0,
  });
  const changeQuarter = (quarter: number, event?: React.MouseEvent) => {
    setState({
      quarter,
    });
  };
  return (
    <div className="analytics-page">
      <LineChart
        data={data[state.quarter]}
        width={800}
        height={250}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      />
      <div className="analytics-page__quarter-selection">
        <QuarterSelection
            changeQuarterCallback={changeQuarter}
            data={data}
            currency="$"
          />
      </div>
    </div>
  );
};

export default AnalyticsPage;
