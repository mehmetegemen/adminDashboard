import React, { FunctionComponent } from "react";
import IQuarter from "../../LineChart/IQuarter";

import "./QuarterSelectionButton.scss";

const QuarterButton: FunctionComponent<{
  changeQuarterCallback: (
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
  data: IQuarter[];
  quarter: number;
  currency: string;
}> = ({ changeQuarterCallback, currency, data, quarter }) => {
  return (
    <div className="quarter-selection-button" onClick={changeQuarterCallback}>
      <div>
        Q{quarter.toString()} ({data.map((q) => (
            q.month
          )).join(" - ")})
      </div>
      <div className="quarter-selection-button__total">{`${currency} ${data
          .map((q) => q.balance)
          .reduce((a, c) => a + c)
          .toString()}`}</div>
    </div>
  );
};

export default QuarterButton;
