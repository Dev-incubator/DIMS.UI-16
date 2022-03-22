import { changeDateFormat, isObjectFieldsEmpty } from '../../../scripts/helpers';
import { MODAL_VALUES, TRACK_MODAL_TITLES } from '../../../constants/libraries';

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

export const getTrackModalErrors = (state) => {
  const formErrors = {
    note: '',
    date: '',
  };
  const keys = Object.keys(formErrors);
  keys.forEach((key) => {
    if (!state[key].trim()) {
      formErrors[key] = `${MODAL_VALUES[key]} is required`;
    }
  });

  if (!isObjectFieldsEmpty(formErrors)) {
    return formErrors;
  }

  return false;
};

export const gatherTrackModalState = (track, taskName) => {
  console.log(taskName);
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
