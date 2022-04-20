import { createUserAuth, deleteUserAuth, getAllUsers, updateUser } from '../../scripts/api-service';
import { addUserAction, getUsersAction, removeUserAction, updateUserAction } from '../usersReducers/usersReducer';
import { disableUsersLoaderAction, enableUsersLoaderAction } from '../usersReducers/usersLoaderReducer';
import { disableUsersErrorAction, setUsersErrorAction } from '../usersReducers/usersErrorReducer';

export const getUsersThunk = () => {
  return async (dispatch) => {
    dispatch(enableUsersLoaderAction());
    const users = await getAllUsers();
    dispatch(getUsersAction(users));
    dispatch(disableUsersLoaderAction());
  };
};

export const updateUserThunk = (id, user) => {
  return async (dispatch) => {
    dispatch(enableUsersLoaderAction());
    await updateUser(id, user);
    dispatch(updateUserAction(user, id));
    dispatch(disableUsersLoaderAction());
  };
};

export const createUserThunk = (user) => {
  return async (dispatch) => {
    dispatch(enableUsersLoaderAction());
    try {
      const newUserId = await createUserAuth(user);
      dispatch(addUserAction(user, newUserId));
    } catch (error) {
      dispatch(setUsersErrorAction(error.message));
      setTimeout(() => {
        dispatch(disableUsersErrorAction());
      }, 3500);
    }
    dispatch(disableUsersLoaderAction());
  };
};

export const removeUserThunk = (id) => {
  return async (dispatch) => {
    dispatch(enableUsersLoaderAction());
    try {
      await deleteUserAuth(id);
      dispatch(removeUserAction(id));
    } catch (error) {
      dispatch(setUsersErrorAction(error.message));
      setTimeout(() => {
        dispatch(disableUsersErrorAction());
      }, 3500);
    }
    dispatch(disableUsersLoaderAction());
  };
};
