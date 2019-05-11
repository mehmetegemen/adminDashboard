import moment from "moment";
import React, { FunctionComponent } from "react";
import * as schedulerConstants from "../../constants";

import "./SchedulerCalendarTimeFrame.scss";

const SchedulerCalendarTimeFrame: FunctionComponent<{
  currentDate: Date,
  dateFormat: string,
}> = (props) => {
  const { currentDate, dateFormat } = props;
  const { FORMAT_DAY, FORMAT_WEEK } = schedulerConstants;
  let timeFrameElement;
  if (dateFormat === FORMAT_DAY) {
    const isToday = moment(currentDate).format("DD-MMM-YYYY") === moment(new Date()).format("DD-MMM-YYYY");
    timeFrameElement = (
      <div className="scheduler-calendar-time-frame__only-day">
        <span className={isToday ? "currentDay" : ""}>{moment(currentDate).format("ddd")}</span>
        <span className={isToday ? "currentDay" : ""}>{moment(currentDate).format("D")}</span>
        <div className={`scheduler-calendar-time-frame__day__border ${isToday ? "currentDay" : ""}`} />
      </div>
    );
  } else if (dateFormat === FORMAT_WEEK) {
    timeFrameElement = [...Array(7).keys()].map((i) => {
      const currentDateCopy = new Date(currentDate);
      const newDate = new Date(currentDateCopy.setDate(currentDateCopy.getDate() + i - 2));
      // currentDate === newDate() is false because there is millisecond difference
      // So we formatted dates to find is it today
      const isToday = moment(newDate).format("DD-MMM-YYYY") === moment(new Date()).format("DD-MMM-YYYY");
      return (
        <div
          className="scheduler-calendar-time-frame__day"
          key={i}
        >
        <span className={isToday ? "currentDay" : ""}>{moment(newDate).format("ddd")}</span>
        <span className={isToday ? "currentDay" : ""}>{moment(newDate).format("D")}</span>
        <div className={`scheduler-calendar-time-frame__day__border ${isToday ? "currentDay" : ""}`} />
        </div>
      );
    });
  }
  return (
    <div className="scheduler-calendar-time-frame">
      <div className="scheduler-calendar-time-frame__time-zone">
        <span>GMT {moment(currentDate).format("Z")}</span>
        <div className="scheduler-calendar-time-frame__time-zone__border" />
      </div>
      {timeFrameElement}
    </div>
  );
};

export default SchedulerCalendarTimeFrame;
