<!-- eslint-disable no-unused-vars -->
<template>
  <h1>Login</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>

  <p v-if="errMsg">{{ errMsg }}</p>

  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router"; //import router

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  //need .value because ref()
  const auth = getAuth();
  const errMsg = errMsg.value;
  signInWithEmailAndPassword(auth, email.value, password.value)
    // eslint-disable-next-line
    .then((data) => {
      console.log("Successfully sign in!");
      console.log(auth.currentUser);

      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email!";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that emailwas found!";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password!";
          break;
        default:
          errMsg.value = "Email or password was incorrect!";
          break;
      }
    });
};
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
</script>
