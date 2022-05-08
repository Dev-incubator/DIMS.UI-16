import {
  ADD_USER,
  DISABLE_USERS_ERROR,
  DISABLE_USERS_LOADER,
  ENABLE_USERS_LOADER,
  GET_USERS,
  REMOVE_USER,
  SET_USERS_ERROR,
  UPDATE_USER,
} from '../type-constants';

export const setUsersErrorAction = (message) => ({ type: SET_USERS_ERROR, payload: { message } });
export const disableUsersErrorAction = () => ({ type: DISABLE_USERS_ERROR });
export const enableUsersLoaderAction = () => ({ type: ENABLE_USERS_LOADER });
export const disableUsersLoaderAction = () => ({ type: DISABLE_USERS_LOADER });
export const getUsersAction = (users) => ({ type: GET_USERS, payload: { users } });
export const removeUserAction = (id) => ({ type: REMOVE_USER, payload: { id } });
export const addUserAction = (user, id) => ({ type: ADD_USER, payload: { user, id } });
export const updateUserAction = (user, id) => ({ type: UPDATE_USER, payload: { user, id } });
