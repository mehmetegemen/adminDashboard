import React, { FunctionComponent, useState } from "react";
import * as schedulerConstants from "../constants";
import DateFormatPicker from "./DateFormatPicker/DateFormatPicker";
import DayPicker from "./DayPicker/DayPicker";
import "./SchedulerNavBar.scss";

const SchedulerNavBar: FunctionComponent<{
  currentDate: Date,
  changeDateCallback: (newDate: Date) => void,
  dateFormat: string,
  changeDateFormatCallback: (newFormat: string) => void,
}> = (props) => {
  const { FORMAT_DAY, FORMAT_WEEK } = schedulerConstants;
  const {
    currentDate,
    changeDateCallback,
    dateFormat,
    changeDateFormatCallback } = props;
  return (
    <nav className="scheduler-navbar">
      <DayPicker
        dateFormat={dateFormat}
        changeDateCallback={changeDateCallback}
        currentDate={currentDate}
      />
      <div className="scheduler-navbar__format-picker">
        <DateFormatPicker
          changeDateFormatCallback={changeDateFormatCallback}
          dateFormat={dateFormat}
        />
      </div>
    </nav>
  );
};

export default SchedulerNavBar;
