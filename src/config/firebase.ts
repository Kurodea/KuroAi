import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmcdgAp1CnfCgbzgL8nkIdNK9juoGsgXs",
  authDomain: "kuroaiapp.firebaseapp.com",
  projectId: "kuroaiapp",
  storageBucket: "kuroaiapp.firebasestorage.app",
  messagingSenderId: "286170567739",
  appId: "1:286170567739:web:c316b9371c6c7f435ab81e"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini export et
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;