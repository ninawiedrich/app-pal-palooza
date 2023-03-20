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

<script>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router"; //import router

export default {
  data() {
    const router = useRouter();
    return {
      email: ref(""),
      password: ref(""),
      router,
    };
  },
  methods: {
    register() {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.router.push("/activity");
        })
        .catch(() => {
          alert("Login failed. Please try again.");
        });
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then(() => {
          this.router.push("/activity");
        })
        .catch(() => {
          this.router.push("/sign-in");
        });
    },
  },
};
</script>
