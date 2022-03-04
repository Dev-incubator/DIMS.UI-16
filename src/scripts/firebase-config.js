import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyB9JLpdgN3tmsOV_-bAWb4wW0FuAtrKSQA',
  authDomain: 'dims-cra.firebaseapp.com',
  projectId: 'dims-cra',
  storageBucket: 'dims-cra.appspot.com',
  messagingSenderId: '279941140536',
  appId: '1:279941140536:web:de569940c09fe9097bd6cd',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
