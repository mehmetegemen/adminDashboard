import moment from "moment";
import React, { FunctionComponent, useState } from "react";
import deepCopy from "../../../../utils/deepCopy";
import * as schedulerConstants from "../../constants";
import ISchedulerCalendarTableNote from "./SchedulerCalendarTableNoteLayer/SchedulerCalendarTableNote/ISchedulerCalendarTableNote";
import SchedulerCalendarTableNoteLayer from "./SchedulerCalendarTableNoteLayer/SchedulerCalendarTableNoteLayer";
import SchedulerCalendarTableEditPanel from "./SchedulerCalendarTableEditPanel/SchedulerCalendarTableEditPanel";

import "./SchedulerCalendarTable.scss";

const SchedulerCalendarTable: FunctionComponent<{
  currentDate: Date,
  dateFormat: string,
}> = (props) => {
  const notes = [
    {
      noteDescription: "Some Description",
      noteTitle: "Example 1",
      timeEnd: moment().startOf("day").add(-2, "days").add(150, "minutes").toDate(),
      timeStart: moment().startOf("day").add(-2, "days").toDate(),
    },
    {
      noteDescription: "Some Other Description",
      noteTitle: "Example 2",
      timeEnd: moment().startOf("day").add(360, "minutes").toDate(),
      timeStart: moment().startOf("day").add(120, "minutes").toDate(),
    },
    {
      noteDescription: "Some Other Description",
      noteTitle: "Example 3",
      timeEnd: moment().startOf("day").add(2, "days").add(300, "minutes").toDate(),
      timeStart: moment().startOf("day").add(2, "days").add(120, "minutes").toDate(),
    },
    {
      noteDescription: "Some Other Description",
      noteTitle: "Example 4",
      timeEnd: moment().startOf("day").add(4, "days").add(150, "minutes").toDate(),
      timeStart: moment().startOf("day").add(4, "days").add(30, "minutes").toDate(),
    },
  ].map((note, index) => {
    return {
      ...note,
      id: index + 1,
    };
  });
  const [ state, setState ] = useState(
    {
      editedNoteId: 0,
      notes: deepCopy(notes),
    },
  );
  const deleteNote = (id: number) => {
    const newState = deepCopy(state.notes).filter(
      (item: any) => id !== item.id);
    setState(
      {
        ...state,
        notes: newState,
      },
    );
  };
  const editNote = (id: number) => {
    setState(
      {
        ...state,
        editedNoteId: id,
      },
    );
  };
  const cancelEditNote = () => {
    setState(
      {
        ...state,
        editedNoteId: 0,
      },
    );
  };
  const saveEditNote = (id: number, newNotes: ISchedulerCalendarTableNote[]) => {
    setState(
      {
        ...state,
        editedNoteId: 0,
        notes: newNotes,
      },
    );
  };
  const addNote = (note: ISchedulerCalendarTableNote) => {
    const newState = deepCopy(state.notes);
    const newId = newState[newState.length - 1].id + 1
    newState.push(
      {
        ...note,
        id: newId,
      },
    );
    setState(
      {
        ...state,
        editedNoteId: newId,
        notes: newState,
      },
    );
  };
  const { currentDate, dateFormat } = props;
  const { FORMAT_DAY, FORMAT_WEEK } = schedulerConstants;
  /*const continueDrag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    // 25px is half of 50px height of one cell. It corresponds to 15 minutes.
    // .5px is half of the border of the cell.
    const startingBlock = Math.floor(state.mouseDragStartY / 25.5);
    const blockAmount = Math.floor(y / 25.5) - startingBlock;
  };*/
  let table;
  if (dateFormat === FORMAT_DAY) {
    const cells = [...Array(48).keys()].map((i) => {
      return (
        <div
          className="scheduler-calendar-table__column__cell"
          key={i}
        />
      );
    });

    table = (
      <div
        className="scheduler-calendar-table__column day"
      >
        <div
          className="scheduler-calendar-table__column__note-layer"
        >
          <SchedulerCalendarTableNoteLayer
            notes={state.notes}
            currentDate={currentDate}
            dateFormat={dateFormat}
            deleteNoteCallback={deleteNote}
            editNoteCallback={editNote}
            addNoteCallback={addNote}
            index={0}
          />
        </div>      
        {cells}
      </div>
    );
  } else if (dateFormat === FORMAT_WEEK) {
    table = [...Array(7).keys()].map((i) => {
      const cells = [...Array(48).keys()].map((j) => {
        // We incremented indices because 0 indices create overlapping keys;
        return (
          <div
            className="scheduler-calendar-table__column__cell"
            key={(i + 1) * (j + 1)}
          />
        );
      });
      return (
        <div
          className="scheduler-calendar-table__column"
          key={i}
        >
          <div
            className="scheduler-calendar-table__column__note-layer"
          >
            <SchedulerCalendarTableNoteLayer
              notes={state.notes}
              currentDate={currentDate}
              dateFormat={dateFormat}
              deleteNoteCallback={deleteNote}
              editNoteCallback={editNote}
              addNoteCallback={addNote}
              index={i}
              key={i}
            />
          </div>
          {cells}
        </div>
      );
    });
  }
  return (
    <div
      className="scheduler-calendar-table"
    >
      {
        state.editedNoteId
        ?
          <div 
            className="scheduler-calendar-table__edit-panel"
          >
            <SchedulerCalendarTableEditPanel
              notes={state.notes}
              editedNoteId={state.editedNoteId}
              editNoteCallback={editNote}
              cancelEditNoteCallback={cancelEditNote}
              saveEditNoteCallback={saveEditNote}
              deleteNoteCallback={deleteNote}
            />
          </div>
        : null
      }
      <div className="scheduler-calendar-table__column">
        {
          [...Array(48).keys()].map((i) => {
            const newDate = moment(currentDate).clone().add(30 * i, "minutes");
            return (
            <div
              className="scheduler-calendar-table__column__hour-cell"
              key={i}
            >
              <span className="scheduler-calendar-table__column__hour-cell__hour">
                {i ? newDate.format("HH:mm") : ""}
              </span>
              <div className="scheduler-calendar-table__column__hour-cell__border" />
            </div>);
          })
        }
      </div>
      {table}
    </div>
  );
};

export default SchedulerCalendarTable;
