import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBCZSLu1jpNpkA4N7nn9d91mJ4LFYBFslo',
  authDomain: 'dims-project-f351c.firebaseapp.com',
  projectId: 'dims-project-f351c',
  storageBucket: 'dims-project-f351c.appspot.com',
  messagingSenderId: '398255262613',
  appId: '1:398255262613:web:bce6190b0d95cd788dc49c',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
