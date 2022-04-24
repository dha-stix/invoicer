import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { EmailAuthProvider } from "firebase/auth";
import { getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBDibhtm-jK6LykfsBBxVuSzhuFXb0xsKw",
  authDomain: "invoicer-cd7db.firebaseapp.com",
  projectId: "invoicer-cd7db",
  storageBucket: "invoicer-cd7db.appspot.com",
  messagingSenderId: "177536482320",
  appId: "1:177536482320:web:2773a067569abdc38a9e95",
  measurementId: "G-NETWJZ0YL8"
};



const app = initializeApp(firebaseConfig);
const provider = new EmailAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
export {provider, auth, storage}
export default db;