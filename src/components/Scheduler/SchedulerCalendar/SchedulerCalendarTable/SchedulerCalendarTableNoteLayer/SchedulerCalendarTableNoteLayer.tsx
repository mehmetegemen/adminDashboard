import moment from "moment";
import React, { FunctionComponent, useState } from "react";
import isBetween from "../../../../../utils/between";
import * as schedulerConstants from "../../../constants";
import ISchedulerCalendarTableNote from "./SchedulerCalendarTableNote/ISchedulerCalendarTableNote";
import SchedulerCalendarTableNote from "./SchedulerCalendarTableNote/SchedulerCalendarTableNote";

import "./SchedulerCalendarTableNoteLayer.scss";

const SchedulerCalendarTableNoteLayer: FunctionComponent<{
  notes: ISchedulerCalendarTableNote[],
  currentDate: Date,
  dateFormat: string,
  index: number,
  deleteNoteCallback: (id: number) => void,
  editNoteCallback: (id: number) => void,
  addNoteCallback: (note: ISchedulerCalendarTableNote) => void,
}> = (props) => {
  const { FORMAT_WEEK } = schedulerConstants;
  const {
    notes,
    currentDate,
    dateFormat,
    index,
    deleteNoteCallback,
    editNoteCallback,
    addNoteCallback,
  } = props;
  const [ state, setState ] = useState(
    {
      mouseDown: false,
      mouseDragStartY: 0,
      newNoteDescription: "Empty description",
      newNoteElementBlockAmount: 1,
      newNoteStartBlockNumber: 0,
      newNoteTimeEnd: new Date(),
      newNoteTimeStart: new Date(),
      newNoteTitle: "Untitled",
    },
  );
  // Date offset is either for week or day
  const dateOffset = dateFormat === FORMAT_WEEK ? -2 : 0;
  const filteredNotes = notes.filter((note) => {
    return moment(note.timeStart).format("D-MMM-YYYY")
    ===
    moment(currentDate).add(dateOffset + index, "days").format("D-MMM-YYYY");
  });
  const occupiedBlocks = filteredNotes.map((note, i) => {
    const blockStart =
      (Number(moment(note.timeStart).format("H")) * 60
      + Number(moment(note.timeStart).format("mm"))) / 15;
    const blockEnd =
      (Number(moment(note.timeEnd).format("H")) * 60
      + Number(moment(note.timeEnd).format("mm"))) / 15;
    return {
      blockEnd,
      blockStart,
    };
  });
  const startDrag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Disable native drag
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const startBlockNumber = Math.floor(y / 25.5);
    const isOnExistingNote = occupiedBlocks.some((block) => {
      // subtract 1 because indices start from 0
      return isBetween(startBlockNumber, block.blockStart, block.blockEnd - 1);
    });
    if (!isOnExistingNote && !state.mouseDown) {
      const timeOffset = startBlockNumber * 15;
      const timeStart = 
      moment(currentDate)
        .add(dateOffset + index, "days")
        .add(timeOffset, "minutes")
        .toDate();
      const timeEnd = moment(timeStart).add("15", "minutes").toDate();
      setState(
        {
          ...state,
          mouseDown: true,
          mouseDragStartY: y,
          newNoteStartBlockNumber: startBlockNumber,
          newNoteTimeEnd: timeEnd,
          newNoteTimeStart: timeStart,
        },
      );
    }
  }
  const continueDrag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    // 25px is half of 50px height of one cell. It corresponds to 15 minutes.
    // .5px is half of the border of the cell.
    const startingBlock = Math.floor(state.mouseDragStartY / 25.5);
    const blockAmount =
      Math.floor(y / 25.5) - startingBlock < 1
      ? 1
      : Math.floor(y / 25.5) - startingBlock;
    const endingBlock = startingBlock + blockAmount;
    const timeEnd =
      moment(state.newNoteTimeStart)
      .add(blockAmount * 15 , "minutes")
      .toDate();
    const nextBlocks =
      occupiedBlocks
      .filter((block) => block.blockStart > startingBlock)
      // We sort because a greater block start may be before a lesser one
      // and this can cause shift of stopping point
      .sort((a, b) => a.blockStart > b.blockStart ? 1 : -1);
    const otherBlockStart =
      nextBlocks.length > 0
      ? nextBlocks[0].blockStart
      : 96;
    if (state.mouseDown && blockAmount > 0 && endingBlock <= otherBlockStart) {
      setState(
        {
          ...state,
          newNoteElementBlockAmount: blockAmount,
          newNoteTimeEnd: timeEnd,
        },
      );
    }
  };
  const stopDrag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (state.mouseDown) {
      addNoteCallback(
        {
          id: 0,
          noteDescription: state.newNoteDescription,
          noteTitle: state.newNoteTitle,
          timeEnd: state.newNoteTimeEnd,
          timeStart: state.newNoteTimeStart,
        },
      );
    }
    setState(
      {
        ...state,
        mouseDown: false,
        mouseDragStartY: 0,
        newNoteDescription: "Empty description",
        newNoteElementBlockAmount: 1,
        newNoteStartBlockNumber: 0,
        newNoteTimeEnd: new Date(),
        newNoteTimeStart: new Date(),
        newNoteTitle: "Untitled",
      },
    );
  };
  const mouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState(
      {
        ...state,
        mouseDown: false,
        mouseDragStartY: 0,
        newNoteDescription: "Empty description",
        newNoteElementBlockAmount: 1,
        newNoteStartBlockNumber: 0,
        newNoteTimeEnd: new Date(),
        newNoteTimeStart: new Date(),
        newNoteTitle: "Untitled",
      },
    );
  };
  const mouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState(
      {
        ...state,
      },
    );
  };
  const noteElements = filteredNotes.map((note, j) => {
    const blockStart =
      (Number(moment(note.timeStart).format("H")) * 60
      + Number(moment(note.timeStart).format("mm"))) / 15;
    const blockAmount =
      (Number(moment(note.timeEnd).format("H")) * 60
      + Number(moment(note.timeEnd).format("mm"))) / 15 - blockStart;
    return (
      <SchedulerCalendarTableNote
        blockAmount={blockAmount}
        blockStart={blockStart}
        timeEnd={note.timeEnd}
        timeStart={note.timeStart}
        noteTitle={note.noteTitle}
        noteId={note.id}
        noteDescription={note.noteDescription}
        deleteNoteCallback={deleteNoteCallback}
        editNoteCallback={editNoteCallback}
        index={index}
        key={j}
      />
    );
  });
  const style = {
    // 51 = 50px one cell + 1px it's border. + 50px is space for mouseUp
    // at the bottom of the grid. Otherwise mouseUp is not triggered
    // because Math.floor() requires to be on below cell.
    height: 48 * 51 + 50 + "px",
    cursor: "s-resize",
  };
  return (
    <div
      className="scheduler-calendar-table-note-layer"
      onMouseDown={startDrag}
      onMouseMove={state.mouseDown ? continueDrag : undefined}
      onMouseUp={stopDrag}
      onMouseLeave={mouseLeave}
      onMouseEnter={mouseEnter}
      style={style}
    >
      {state.mouseDown
      ?
      <SchedulerCalendarTableNote
        blockAmount={state.newNoteElementBlockAmount}
        blockStart={state.newNoteStartBlockNumber}
        timeEnd={state.newNoteTimeEnd}
        timeStart={state.newNoteTimeStart}
        noteId={-1}
        noteTitle={state.newNoteTitle}
        noteDescription={state.newNoteDescription}
        deleteNoteCallback={deleteNoteCallback}
        editNoteCallback={editNoteCallback}
        index={index}
      />
      : null}
      {noteElements}
    </div>
  );
}

export default SchedulerCalendarTableNoteLayer;
