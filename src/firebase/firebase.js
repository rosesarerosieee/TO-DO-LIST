// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCbBKxR6b56JcD__HNruj2zfzJRkKaRhc0",
  authDomain: "todolistapp-220d9.firebaseapp.com",
  projectId: "todolistapp-220d9",
  storageBucket: "todolistapp-220d9.appspot.com",
  messagingSenderId: "1012883088830",
  appId: "1:1012883088830:web:724ed367f249c4584805ef",
  measurementId: "G-K2KCN9HB82",
  databaseURL: "https://todolistapp-220d9-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
