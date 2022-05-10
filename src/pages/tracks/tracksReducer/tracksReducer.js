import { ADD_TRACK, UPDATE_TRACK, REMOVE_TRACK, SET_TRACKS } from './type-constants';

export function tracksReducer(state, action) {
  switch (action.type) {
    case SET_TRACKS: {
      return action.payload.tracks;
    }
    case ADD_TRACK: {
      return [...state, { ...action.payload.track, id: action.payload.id }];
    }
    case UPDATE_TRACK: {
      return state.map((track) => (track.id === action.payload.id ? { ...track, ...action.payload.track } : track));
    }
    case REMOVE_TRACK: {
      return state.filter((track) => track.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
}
