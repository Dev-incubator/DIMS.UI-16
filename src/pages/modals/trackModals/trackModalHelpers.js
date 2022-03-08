import { changeDateFormat, isObjectFieldsEmpty } from '../../../scripts/helpers';
import { TRACK_MODAL_TITLES } from '../../../scripts/libraries';

export const initTrackModalState = {
  modalTitle: '',
  taskName: '',
  note: '',
  date: '',
  readOnly: false,
  formErrors: {
    note: '',
    date: '',
  },
};

export const getTrackModalErrors = (note, date) => {
  const formErrors = {
    note: '',
    date: '',
  };
  if (!note.trim()) {
    formErrors.note = 'Note is required';
  }
  if (!date.trim()) {
    formErrors.date = 'Date is required';
  }

  if (!isObjectFieldsEmpty(formErrors)) {
    return formErrors;
  }

  return false;
};

export const gatherTrackModalState = (track, taskName) => {
  const state = {
    ...initTrackModalState,
    taskName,
    modalTitle: TRACK_MODAL_TITLES.create,
  };
  if (track) {
    state.modalTitle = TRACK_MODAL_TITLES.edit;
    state.note = track.note;
    state.date = changeDateFormat(track.date);
  }

  return state;
};
