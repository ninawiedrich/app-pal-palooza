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

<script>
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
import ColorComponent from "@/components/ColorComponent.vue";

export default {
  name: "ColorComponent",
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
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          const user = getAuth().currentUser;
          setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            email: user.email,
          });

          this.router.push("/activity");
        })
        .catch(() => {
          this.router.push("/sign-in");
        });
    },
    signInWithGoogle() {
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
          this.router.push("/activity");
        })
        .catch(() => {
          this.router.push("/sign-in");
        });
    },
  },
};
</script>
