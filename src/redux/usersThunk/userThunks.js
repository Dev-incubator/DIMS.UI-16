import { createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { disableErrorAC, disableLoaderAC, enableLoaderAC, setErrorAC } from '../fetchReducer/fetchReducer';
import { createUser, getAllUsers, getUserById, login, removeUser, updateUser } from '../../scripts/api-service';
import { auth } from '../../scripts/firebase-config';
import { cryptId } from '../../scripts/crypt';
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
      const { email, password } = await getUserById(auth.currentUser.uid);
      const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await login(user.email, user.password);
      await sendPasswordResetEmail(auth, user.email, {
        url: `http://localhost/?uid=${cryptId(newUser.user.uid)}`,
      });
      await signOut(auth);
      await login(email, password);
      await createUser(newUser.user.uid, user);
      dispatch(addUserAC(user, newUser.user.uid));
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
  return async (dispatch, getState) => {
    dispatch(enableLoaderAC());
    const { users } = getState();
    const { email, password } = users.find((item) => item.id === id);
    try {
      const currentUser = await getUserById(auth.currentUser.uid);
      await login(email, password);
      await deleteUser(auth.currentUser);
      await signOut(auth);
      await login(currentUser.email, currentUser.password);
      await removeUser(id);
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
