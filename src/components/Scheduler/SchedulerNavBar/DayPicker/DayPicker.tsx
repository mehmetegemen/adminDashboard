import moment from "moment";
import React, { FunctionComponent, useState } from "react";
import * as schedulerConstants from "../../constants";

import "./DayPicker.scss";

const DayPicker: FunctionComponent<{
  dateFormat: string,
  changeDateCallback: (newDate: Date) => void,
  currentDate: Date,
}> = (props) => {
  const { FORMAT_DAY, FORMAT_WEEK } = schedulerConstants;
  const { dateFormat, currentDate, changeDateCallback } = props;
  const changeDate =
  (isForward: boolean) =>
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isForward) {
      if (dateFormat === FORMAT_WEEK) {
        const newDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        changeDateCallback(newDate);
      } else if (dateFormat === FORMAT_DAY) {
        const newDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        changeDateCallback(newDate);
      }
    } else {
      if (dateFormat === FORMAT_WEEK) {
        const newDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
        changeDateCallback(newDate);
      } else if (dateFormat === FORMAT_DAY) {
        const newDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
        changeDateCallback(newDate);
      }
    }
  };
  let dateString;
  if (dateFormat === FORMAT_WEEK) {
    // added -2 Because SchedulerCalendar also shows previous 2 days
    // it starts counting from 2 days earlier
    // If we don't put this -2, "June-July" like date ranges won't match
    // with time-frame's dates
    const startDate = moment(currentDate).add(-2, "d");
    // Add 6 days to first day and find last day of the week
    const endDate = startDate.clone().add(6, "d");
    const monthString =
      startDate.format("MMMM") === endDate.format("MMMM")
      ? startDate.format("MMMM")
      : `${startDate.format("MMMM")} - ${endDate.format("MMMM")}`;
    dateString = `${monthString} ${endDate.format("YYYY")}`;
  } else if (dateFormat === FORMAT_DAY) {
    dateString = moment(currentDate).format("DD MMMM YYYY");
  }
  return (
    <div className="day-picker">
      <button
        className="day-picker__back"
        onClick={changeDate(false)}
      >
        <i className="fas fa-angle-left" />
      </button>
      <h3>{dateString}</h3>
      <button
        className="day-picker__forward"
        onClick={changeDate(true)}
      >
      <i className="fas fa-angle-right" />
      </button>
    </div>
  );
};

export default DayPicker;
