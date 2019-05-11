import React, { FunctionComponent, useState } from "react";
import SchedulerCalendarTable from "./SchedulerCalendarTable/SchedulerCalendarTable";
import SchedulerCalendarTimeFrame from "./SchedulerCalendarTimeFrame/SchedulerCalendarTimeFrame";

import "./SchedulerCalendar.scss";

const SchedulerCalendar: FunctionComponent<{
  currentDate: Date,
  dateFormat: string,
}> = (props) => {
  const { currentDate, dateFormat } = props;
  return (
    <div className="scheduler-calendar">
      <div className="scheduler-calendar__time-frame">
        <SchedulerCalendarTimeFrame
          currentDate={currentDate}
          dateFormat={dateFormat}
        />
      </div>
      <div className="scheduler-calendar__table">
        <SchedulerCalendarTable
          currentDate={currentDate}
          dateFormat={dateFormat}
        />
      </div>
    </div>
  );
};

export default SchedulerCalendar;
