importScripts(
  "https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD2POLMivVjs-0LLtW7pd21kc_S-0eP5p0",
  authDomain: "palpalooza-e78d9.firebaseapp.com",
  projectId: "palpalooza-e78d9",
  storageBucket: "palpalooza-e78d9.appspot.com",
  messagingSenderId: "658156207228",
  appId: "1:658156207228:web:edc0410e4cbc6825aa1df9",
  measurementId: "G-L5Y3LX98WS",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
