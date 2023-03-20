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
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/stores/firebase.js";
import { useRouter } from "vue-router"; //import router

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      const user = getAuth().currentUser;
      setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        email: user.email,
      });

      router.push("/activity");
    })
    .catch(() => {
      router.push("/sign-in");
    });
};
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(() => {
      const user = getAuth().currentUser;
      setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        email: user.email,
      });
      router.push("/activity");
    })
    .catch(() => {
      router.push("/sign-in");
    });
}
</script>
