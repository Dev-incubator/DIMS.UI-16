import { collection, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { db } from './firebase-config';

const tasksCollectionRef = collection(db, 'tasks');
const tracksCollectionRef = collection(db, 'tracks');

export async function getUserById(userId) {
  const snapshot = await getDoc(doc(db, 'users', userId));

  return { ...snapshot.data(), userId: snapshot.id };
}

export async function getAllTasks() {
  const data = await getDocs(tasksCollectionRef);

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

  return { ...snapshot.data(), taskId: snapshot.id };
}

export async function getTaskTrack(userId, taskId) {
  const task = await getTaskById(taskId);
  const data = await getDocs(tracksCollectionRef);
  const allTracks = data.docs.map((document) => ({ ...document.data(), id: document.id }));

  return allTracks
    .filter((track) => track.userId === userId && track.taskId === taskId)
    .map((track) => ({ ...track, taskTitle: task.title }));
}

export async function deleteUser(id) {
  const userDoc = doc(db, 'users', id);
  await deleteDoc(userDoc);
}
