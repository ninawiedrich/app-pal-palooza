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
  //need .value because ref()
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully sign in!");
      console.log(auth.currentUser);

      router.push("/activity");
    })
    .catch((error) => {
      console.log(error.code);
      alert("Login failed. Please try again");
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
