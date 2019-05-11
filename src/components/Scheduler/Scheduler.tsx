import moment from "moment";
import React, { FunctionComponent, useState } from "react";
import * as schedulerConstants from "./constants";
import SchedulerCalendar from "./SchedulerCalendar/SchedulerCalendar";
import SchedulerNavBar from "./SchedulerNavBar/SchedulerNavBar";

import "./Scheduler.scss";

const Scheduler: FunctionComponent = (props) => {
  const { FORMAT_WEEK, FORMAT_DAY } = schedulerConstants;
  const [ state, setState ] = useState(
    {
      currentDate: moment().startOf("day").toDate(),
      dateFormat: FORMAT_WEEK,
    },
  );
  const changeDate = (newDate: Date) => {
    setState(
      {
        ...state,
        currentDate: newDate,
      },
    );
  };
  const changeDateFormat = (newFormat: string) => {
    setState(
      {
        ...state,
        dateFormat: newFormat,
      },
    );
  };
  return (
    <div>
      <div>
        <SchedulerNavBar
          currentDate={state.currentDate}
          changeDateCallback={changeDate}
          dateFormat={state.dateFormat}
          changeDateFormatCallback={changeDateFormat}
        />
      </div>
      <div>
        <SchedulerCalendar
          currentDate={state.currentDate}
          dateFormat={state.dateFormat}
        />
      </div>
    </div>
  );
};

export default Scheduler;
