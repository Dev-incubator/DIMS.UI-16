import { ADD_USER, GET_USERS, REMOVE_USER, UPDATE_USER } from './type-constants';

const initialState = [];

// eslint-disable-next-line default-param-last
export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return action.payload.users;
    }
    case REMOVE_USER: {
      return state.filter((user) => user.id !== action.payload.id);
    }
    case ADD_USER: {
      return [...state, { id: action.payload.id, ...action.payload.user }];
    }
    case UPDATE_USER: {
      return state.map((user) => (user.id === action.payload.id ? { ...user, ...action.payload.user } : user));
    }
    default: {
      return state;
    }
  }
};

export const getUsersAC = (users) => ({ type: GET_USERS, payload: { users } });
export const removeUserAC = (id) => ({ type: REMOVE_USER, payload: { id } });
export const addUserAC = (user, id) => ({ type: ADD_USER, payload: { user, id } });
export const updateUserAC = (user, id) => ({ type: UPDATE_USER, payload: { user, id } });
