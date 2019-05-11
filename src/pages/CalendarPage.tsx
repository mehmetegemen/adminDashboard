import React, { FunctionComponent } from "react";
import Scheduler from "../components/Scheduler/Scheduler";

import "./CalendarPage.scss";

const CalendarPage: FunctionComponent = (props) => {
  return (
    <div className="calendar-page">
      <Scheduler />
    </div>
  );
};

export default CalendarPage;
