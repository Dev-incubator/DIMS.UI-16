import { changeDateFormat, isObjectFieldsEmpty } from '../../../scripts/helpers';
import { MODAL_VALUES, TRACK_MODAL_TITLES } from '../../../constants/libraries';

export const trackModalState = {
  title: '',
  taskName: '',
  note: '',
  date: '',
  readOnly: false,
  errors: {
    note: '',
    date: '',
  },
};

export const getTrackModalErrors = (state) => {
  const errors = {
    note: '',
    date: '',
  };
  const keys = Object.keys(errors);
  keys.forEach((key) => {
    if (!state[key].trim()) {
      errors[key] = `${MODAL_VALUES[key]} is required`;
    }
  });

  if (!isObjectFieldsEmpty(errors)) {
    return errors;
  }

  return null;
};

export const gatherTrackModalState = (track, taskName) => {
  const state = {
    ...trackModalState,
    taskName,
    title: TRACK_MODAL_TITLES.create,
  };
  if (track) {
    state.title = TRACK_MODAL_TITLES.edit;
    state.note = track.note;
    state.date = changeDateFormat(track.date);
  }

  return state;
};
