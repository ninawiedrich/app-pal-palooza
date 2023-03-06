import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export { auth };
