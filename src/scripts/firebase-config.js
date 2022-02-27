import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAlvmZCS5rpIVaUOx26DyOysa5HVCgGgl4',
  authDomain: 'dims-project-d92a2.firebaseapp.com',
  databaseURL: 'https://dims-project-d92a2-default-rtdb.firebaseio.com',
  projectId: 'dims-project-d92a2',
  storageBucket: 'dims-project-d92a2.appspot.com',
  messagingSenderId: '898730382887',
  appId: '1:898730382887:web:6c6db80ee1328ea9fee002',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
