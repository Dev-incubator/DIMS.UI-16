import { collection, doc, getDoc, getDocs, deleteDoc, updateDoc, addDoc, setDoc } from 'firebase/firestore/lite';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from './firebase-config';
import { cryptId } from './crypt';

const usersCollectionRef = collection(db, 'users');
const tasksCollectionRef = collection(db, 'tasks');
const tracksCollectionRef = collection(db, 'tracks');

export async function getUserById(userId) {
  try {
    const snapshot = await getDoc(doc(db, 'users', userId));

    return { ...snapshot.data(), id: snapshot.id };
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function createUser(id, user) {
  try {
    await setDoc(doc(db, 'users', id), user);
  } catch (error) {
    console.error(error);
  }
}

export function addTask(task) {
  return addDoc(tasksCollectionRef, task);
}

export function addTrack(track) {
  return addDoc(tracksCollectionRef, track);
}

export async function getAllTasks() {
  try {
    const data = await getDocs(tasksCollectionRef);

    return data.docs.map((document) => ({ ...document.data(), id: document.id }));
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function getAllUsers() {
  try {
    const data = await getDocs(usersCollectionRef);

    return data.docs
      .map((document) => ({ ...document.data(), id: document.id }))
      .filter((user) => user.id !== auth.currentUser.uid);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function getAllTracks() {
  try {
    const data = await getDocs(tracksCollectionRef);

    return data.docs.map((document) => ({ ...document.data(), id: document.id }));
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function getUserTasksById(userId) {
  try {
    const allTasks = await getAllTasks();

    return allTasks
      .map((task) => {
        const taskInfo = task.users.find((user) => user.userId === userId);

        return taskInfo
          ? {
              title: task.title,
              description: task.description,
              id: task.id,
              startDate: task.startDate,
              deadline: task.deadline,
              ...taskInfo,
            }
          : null;
      })
      .filter((el) => el);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function getTaskById(taskId) {
  try {
    const snapshot = await getDoc(doc(db, 'tasks', taskId));

    return { ...snapshot.data(), id: snapshot.id };
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function getTaskTrack(userId, taskId) {
  try {
    const allTracks = await getAllTracks();

    return allTracks.filter((track) => track.userId === userId && track.taskId === taskId);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function removeUser(userId) {
  try {
    const userDoc = doc(db, 'users', userId);
    await deleteDoc(userDoc);
    const allTracks = await getAllTracks();
    const allTasks = await getAllTasks();

    allTracks.forEach(async (track) => {
      if (track.userId === userId) {
        await deleteTrack(track.id);
      }
    });

    allTasks.forEach(async (task) => {
      const updatedTaskUsers = { users: task.users.filter((user) => user.userId !== userId) };
      await updateTask(task.id, updatedTaskUsers);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTrack(id) {
  try {
    const trackDoc = doc(db, 'tracks', id);
    await deleteDoc(trackDoc);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTask(taskId) {
  try {
    const taskDoc = doc(db, 'tasks', taskId);
    await deleteDoc(taskDoc);
    const tracks = await getAllTracks();

    tracks.forEach(async (track) => {
      if (track.taskId === taskId) {
        await deleteTrack(track.id);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateTask(taskId, updatedFields) {
  try {
    const taskDoc = doc(db, 'tasks', taskId);
    await updateDoc(taskDoc, { ...updatedFields });
  } catch (error) {
    console.error(error);
  }
}

export async function updateTrack(trackId, updatedFields) {
  try {
    const trackDoc = doc(db, 'tracks', trackId);
    await updateDoc(trackDoc, updatedFields);
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(userId, updatedFields) {
  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { ...updatedFields });
  } catch (error) {
    console.error(error);
  }
}

export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }

  return undefined;
}

export async function createUserAuth(user) {
  const { email, password } = await getUserById(auth.currentUser.uid);
  const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
  const newUserId = newUser.user.uid;
  await login(user.email, user.password);
  await sendPasswordResetEmail(auth, user.email, {
    url: `http://localhost/?uid${cryptId(newUserId)}`,
  });
  await signOut(auth);
  await login(email, password);
  await createUser(newUserId, user);

  return newUserId;
}

export async function deleteUserAuth(id) {
  const user = await getUserById(id);
  const { email, password } = user;

  const currentUser = await getUserById(auth.currentUser.uid);
  await login(email, password);
  await deleteUser(auth.currentUser);
  await signOut(auth);
  await login(currentUser.email, currentUser.password);
  await removeUser(id);
}
