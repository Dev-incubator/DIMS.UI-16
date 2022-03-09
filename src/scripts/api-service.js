import { collection, doc, getDoc, getDocs, deleteDoc, updateDoc, addDoc } from 'firebase/firestore/lite';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase-config';

const usersCollectionRef = collection(db, 'users');
const tasksCollectionRef = collection(db, 'tasks');
const tracksCollectionRef = collection(db, 'tracks');

export async function getUserById(userId) {
  const snapshot = await getDoc(doc(db, 'users', userId));

  return { ...snapshot.data(), id: snapshot.id };
}

export async function addTask(task) {
  await addDoc(tasksCollectionRef, task);
}

export async function addTrack(track) {
  await addDoc(tracksCollectionRef, track);
}

export async function getAllTasks() {
  const data = await getDocs(tasksCollectionRef);

  return data.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function getAllUsers() {
  const data = await getDocs(usersCollectionRef);

  return data.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function getAllTracks() {
  const data = await getDocs(tracksCollectionRef);

  return data.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function getUserTasksById(userId) {
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
}

export async function getTaskById(taskId) {
  const snapshot = await getDoc(doc(db, 'tasks', taskId));

  return { ...snapshot.data(), id: snapshot.id };
}

export async function getTaskTrack(userId, taskId) {
  const task = await getTaskById(taskId);
  const allTracks = await getAllTracks();

  return allTracks
    .filter((track) => track.userId === userId && track.taskId === taskId)
    .map((track) => ({ ...track, taskTitle: task.title }));
}

export async function deleteUser(userId) {
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
}

export async function deleteTrack(id) {
  const trackDoc = doc(db, 'tracks', id);
  await deleteDoc(trackDoc);
}

export async function deleteTask(taskId) {
  const taskDoc = doc(db, 'tasks', taskId);
  await deleteDoc(taskDoc);
  const tracks = await getAllTracks();

  tracks.forEach(async (track) => {
    if (track.taskId === taskId) {
      await deleteTrack(track.id);
    }
  });
}

export async function updateTask(taskId, updatedFields) {
  const taskDoc = doc(db, 'tasks', taskId);
  await updateDoc(taskDoc, updatedFields);
}

export async function updateTrack(trackId, updatedFields) {
  const trackDoc = doc(db, 'tracks', trackId);
  await updateDoc(trackDoc, updatedFields);
}

export async function login(email, password, history) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    history.push('users');
  } catch (error) {
    return error;
  }

  return null;
}
