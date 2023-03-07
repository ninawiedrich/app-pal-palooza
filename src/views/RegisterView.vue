<template>
  <h1>Create an Account</h1>
  <form action="">
    <p>
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        autocomplete="off"
      />
    </p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        autocomplete="off"
      />
    </p>
    <p><button @click.prevent="register">Submit</button></p>
    <p>
      <button @click.prevent="signInWithGoogle">Sign In With Google</button>
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router"; //import router

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");

      console.log(auth.currentUser);

      router.push("/activity");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      router.push("/activity");
    })
    .catch((error) => {
      router.push("/sign-in");
    });
}
</script>
