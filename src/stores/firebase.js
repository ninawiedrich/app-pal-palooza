import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD2POLMivVjs-0LLtW7pd21kc_S-0eP5p0",
  authDomain: "palpalooza-e78d9.firebaseapp.com",
  projectId: "palpalooza-e78d9",
  storageBucket: "palpalooza-e78d9.appspot.com",
  messagingSenderId: "658156207228",
  appId: "1:658156207228:web:edc0410e4cbc6825aa1df9",
  measurementId: "G-L5Y3LX98WS",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging();
getToken(messaging, {
  vapidKey:
    "BIdQpNVc_cWdol0oeixbZfWvnJmONOVF_tB-354aAaYpMzYKsbuaYFGA1zgAMXM8GRnVFb2akrynBq1RJYRkN_c",
});

console.log("db:", db); // add this line to check if db is being correctly initialized

export const storageRef = (storage, path) => ref(storage, path);
export { auth, db, storage, messaging };
