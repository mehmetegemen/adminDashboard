import moment from "moment";
import React, { FunctionComponent } from "react";

import "./SchedulerCalendarTableNote.scss";

const SchedulerCalendarTableNote: FunctionComponent<{
  blockStart: number,
  blockAmount: number,
  timeStart: Date,
  timeEnd: Date,
  noteTitle: string,
  noteDescription: string,
  noteId: number,
  index: number,
  deleteNoteCallback: (id: number) => void,
  editNoteCallback: (id: number) => void,
}> = (props) => {
  const {
    blockAmount,
    blockStart,
    index,
    noteDescription,
    noteTitle,
    timeEnd,
    timeStart,
    deleteNoteCallback,
    editNoteCallback,
    noteId,
  } = props;
  let borderClass;
  if (index < 3) {
    borderClass = "blue-border";
  } else if (index === 3 || index === 4) {
    borderClass = "yellow-border";
  } else {
    borderClass = "red-border";
  }
  const style = {
    height: blockAmount * 25.5 + "px",
    top: blockStart * 25.5 + "px",
  };

  const deleteNote =
  (id: number) =>
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    deleteNoteCallback(id);
  };
  const editNote =
  (id: number) =>
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    editNoteCallback(id);
  };
  return (
    <div
      className={`scheduler-calendar-table-note ${borderClass}`}
      style={style}
    >
      <div className="scheduler-calendar-table-note__top">
        <h6>{noteTitle}</h6>
        <div className="scheduler-calendar-table-note__top__controls">
          <button
            className="scheduler-calendar-table-note__top__controls__delete"
            aria-label="Delete image"
            title="Delete image"
            onClick={deleteNote(noteId)}
          >
            <i className="far fa-trash-alt" />
          </button>
          <button
            className="scheduler-calendar-table-note__top__controls__edit"
            aria-label="Edit image"
            title="Edit image"
            onClick={editNote(noteId)}
          >
            <i className="far fa-edit" />
          </button>
        </div>
      </div>
      {blockAmount * 25.5 > 25.5 * 3 ? <p>{noteDescription}</p> : null}
      {blockAmount * 25.5 > 25.5 * 1 ? <div className="scheduler-calendar-table-note__time">
        {moment(timeStart).format("HH:mm")} - {moment(timeEnd).format("HH:mm")}
      </div> : null}
    </div>
  )
};

export default SchedulerCalendarTableNote;
