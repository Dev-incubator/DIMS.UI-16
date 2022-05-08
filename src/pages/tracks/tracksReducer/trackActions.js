import { ADD_TRACK, REMOVE_TRACK, SET_TRACKS, UPDATE_TRACK } from './type-constants';

export const setTracksAction = (tracks) => ({ type: SET_TRACKS, payload: { tracks } });
export const addTrackAction = (track, id) => ({ type: ADD_TRACK, payload: { track, id } });
export const updateTrackAction = (track, id) => ({ type: UPDATE_TRACK, payload: { track, id } });
export const removeTrackAction = (id) => ({ type: REMOVE_TRACK, payload: { id } });
