import React, { FunctionComponent, useState } from "react";
import * as schedulerConstants from "../../constants";

import "./DateFormatPicker.scss";

const DateFormatPicker: FunctionComponent<{
  dateFormat: string,
  changeDateFormatCallback: (newFormat: string) => void,
}> = (props) => {
  const { FORMAT_DAY, FORMAT_WEEK } = schedulerConstants;
  const formats = [
    FORMAT_WEEK,
    FORMAT_DAY,
  ];
  const { dateFormat, changeDateFormatCallback } = props;
  const handleClick =
  (format: string) =>
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    changeDateFormatCallback(format);
  };
  const formatButtons = formats.map((format, index) => {
    return (
      <button
        onClick={handleClick(format)}
        className={dateFormat === format ? "active" : ""}
        key={index}
      >
      {format}
      </button>
    );
  });
  return (
    <div className="date-format-picker">
      {formatButtons}
    </div>
  );
};

export default DateFormatPicker;
