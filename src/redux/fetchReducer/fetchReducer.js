import { DISABLE_ERROR, DISABLE_LOADER, ENABLE_LOADER, SET_ERROR } from './type-constants';

const initialState = {
  isFetching: false,
  error: '',
};

// eslint-disable-next-line default-param-last
export const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_LOADER: {
      return { ...state, isFetching: true };
    }
    case DISABLE_LOADER: {
      return { ...state, isFetching: false };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload.message };
    }
    case DISABLE_ERROR: {
      return { ...state, error: '' };
    }
    default: {
      return state;
    }
  }
};

export const enableLoaderAC = () => ({ type: ENABLE_LOADER });
export const disableLoaderAC = () => ({ type: DISABLE_LOADER });
export const disableErrorAC = () => ({ type: DISABLE_ERROR });
export const setErrorAC = (message) => ({ type: SET_ERROR, payload: { message } });
