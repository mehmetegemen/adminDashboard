import React, { FunctionComponent } from "react";
import QuarterSelectionButton from "./QuarterSelectionButton/QuarterSelectionButton";
import IQuarter from "../LineChart/IQuarter";

import "./QuarterSelection.scss";

const QuarterSelection: FunctionComponent<{
  changeQuarterCallback: (
    quarter: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
  data: IQuarter[][];
  currency: string;
}> = ({ changeQuarterCallback, currency, data }) => {
  return(
    <div className="quarter-selection">
      {data.map((q, i) => (
        <QuarterSelectionButton
          changeQuarterCallback={changeQuarterCallback.bind(null, i)}
          data={data[i]}
          currency="$"
          quarter={i + 1}
          key={i}
        />
      ))}
    </div>
  )
};

export default QuarterSelection;
