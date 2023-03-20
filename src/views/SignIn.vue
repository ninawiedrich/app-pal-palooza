<template>
  <h1>Sign in</h1>
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
    <p>
      You don’t have an account? Register
      <RouterLink to="/register">here.</RouterLink>
    </p>
  </form>
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
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push("/activity");
    })
    .catch(() => {
      alert("Login failed. Please try again.");
    });
};
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(() => {
      router.push("/activity");
    })
    .catch(() => {
      router.push("/sign-in");
    });
}
</script>
