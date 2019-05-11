import React, { FunctionComponent, useState, useEffect } from "react";
import deepCopy from "../../../../../utils/deepCopy";
import ISchedulerCalendarTableNote from "../SchedulerCalendarTableNoteLayer/SchedulerCalendarTableNote/ISchedulerCalendarTableNote";

import "./SchedulerCalendarTableEditPanel.scss";

const SchedulerCalendarTableEditPanel: FunctionComponent<{
  notes: ISchedulerCalendarTableNote[],
  editedNoteId: number,
  editNoteCallback: (id: number) => void,
  deleteNoteCallback: (id: number) => void,
  cancelEditNoteCallback: () => void,
  saveEditNoteCallback: (id: number, newNotes: ISchedulerCalendarTableNote[]) => void,
}> = (props) => {
  const {
    cancelEditNoteCallback,
    editNoteCallback,
    editedNoteId,
    notes,
    saveEditNoteCallback,
    deleteNoteCallback,
  } = props;
  const editingNote =
    props.notes
    .filter((note: ISchedulerCalendarTableNote) => note.id === editedNoteId)[0];
  const [ state, setState ] = useState(
    {
      editedNoteDescription: editingNote.noteDescription,
      editedNoteTitle: editingNote.noteTitle,
    },
  );
  useEffect(() => {
    // Run when another note's edit button is clicked
    setState(
      {
        editedNoteDescription: editingNote.noteDescription,
        editedNoteTitle: editingNote.noteTitle,
      },
    );
  }, [editingNote]);
  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(event.currentTarget.id === "editedNoteTitle") {
      setState(
        {
          ...state,
          editedNoteTitle: event.currentTarget.value,
        },
      );
    } else if (event.currentTarget.id === "editedNoteDescription") {
      setState(
        {
          ...state,
          editedNoteDescription: event.currentTarget.value,
        },
      );
    }
  };
  const handleEditPanelSaveClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newNotes = deepCopy(notes);
    const editedNoteIndex = newNotes.findIndex((note: ISchedulerCalendarTableNote) => note.id === editedNoteId);
    newNotes[editedNoteIndex].noteTitle = state.editedNoteTitle;
    newNotes[editedNoteIndex].noteDescription = state.editedNoteDescription;
    saveEditNoteCallback(editedNoteId, newNotes);
  };
  const handleEditPanelCancelClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    cancelEditNoteCallback();
  };
  return (
    <div className="scheduler-calendar-table-edit-panel">
      <h3>Edit Note</h3>
      <div className="scheduler-calendar-table-edit-panel__title">
        <label htmlFor="editedNoteTitle">Title</label>
        <input
          type="text"
          id="editedNoteTitle"
          value={state.editedNoteTitle}
          onChange={handleChange}
        />
      </div>
      <div className="scheduler-calendar-table-edit-panel__description">
        <label htmlFor="editedNoteDescription">Description</label>
        <textarea
          id="editedNoteDescription"
          value={state.editedNoteDescription}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className="scheduler-calendar-table-edit-panel__cancel"
          onClick={handleEditPanelCancelClick}
        >
          Cancel
        </button>
        <button
          className="scheduler-calendar-table-edit-panel__save"
          onClick={handleEditPanelSaveClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SchedulerCalendarTableEditPanel;
