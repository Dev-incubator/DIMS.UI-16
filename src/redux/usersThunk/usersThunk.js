import { disableErrorAC, disableLoaderAC, enableLoaderAC, setErrorAC } from '../fetchReducer/fetchReducer';
import { createUserAuth, deleteUserAuth, getAllUsers, updateUser } from '../../scripts/api-service';
import { addUserAC, getUsersAC, removeUserAC, updateUserAC } from '../usersReducer/usersReducer';

export const getUsersThunk = () => {
  return async (dispatch) => {
    dispatch(enableLoaderAC());
    const users = await getAllUsers();
    dispatch(getUsersAC(users));
    dispatch(disableLoaderAC());
  };
};

export const updateUserThunk = (id, user) => {
  return async (dispatch) => {
    dispatch(enableLoaderAC());
    await updateUser(id, user);
    dispatch(updateUserAC(user, id));
    dispatch(disableLoaderAC());
  };
};

export const createUserThunk = (user) => {
  return async (dispatch) => {
    dispatch(enableLoaderAC());
    try {
      const newUserId = await createUserAuth(user);
      dispatch(addUserAC(user, newUserId));
    } catch (error) {
      dispatch(setErrorAC(error.message));
      setTimeout(() => {
        dispatch(disableErrorAC());
      }, 3500);
    }
    dispatch(disableLoaderAC());
  };
};

export const removeUserThunk = (id) => {
  return async (dispatch) => {
    dispatch(enableLoaderAC());
    try {
      await deleteUserAuth(id);
      dispatch(removeUserAC(id));
    } catch (error) {
      dispatch(setErrorAC(error.message));
      setTimeout(() => {
        dispatch(disableErrorAC());
      }, 3500);
    }
    dispatch(disableLoaderAC());
  };
};
