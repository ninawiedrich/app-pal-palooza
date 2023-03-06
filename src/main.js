import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2POLMivVjs-0LLtW7pd21kc_S-0eP5p0",
  authDomain: "palpalooza-e78d9.firebaseapp.com",
  projectId: "palpalooza-e78d9",
  storageBucket: "palpalooza-e78d9.appspot.com",
  messagingSenderId: "658156207228",
  appId: "1:658156207228:web:edc0410e4cbc6825aa1df9",
  measurementId: "G-L5Y3LX98WS",
};

// Initialize Firebase
initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const app = createApp(App);

app.use(router);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
