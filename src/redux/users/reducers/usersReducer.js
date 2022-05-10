import { ADD_USER, GET_USERS, REMOVE_USER, UPDATE_USER } from '../type-constants';

const initialState = [];

export const usersReducer = (state = initialState, action = {}) => {
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
