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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
function signInWithGoogle() {}
</script>
