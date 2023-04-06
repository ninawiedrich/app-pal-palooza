<template>
  <div class="container-sign-in">
    <h1 class="title">{{ title }}</h1>
    <form action="">
      <div class="form-group">
        <input
          class="form-control"
          type="text"
          placeholder="Email"
          v-model="email"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          type="password"
          placeholder="Password"
          v-model="password"
          autocomplete="off"
        />
      </div>
      <template v-if="isRegisterForm">
        <p>
          <button
            class="btn btn-outline-success btn-outline-success:hover"
            @click.prevent="register"
          >
            Register
          </button>
        </p>
        <p>
          <button
            class="btn btn-outline-success btn-outline-success:hover"
            @click.prevent="registerWithGoogle"
          >
            Register With Google
          </button>
        </p>
      </template>
      <template v-else>
        <div class="form-group">
          <button
            class="btn btn-outline-success btn-outline-success:hover"
            @click.prevent="signIn"
          >
            Sign In
          </button>
        </div>
        <div class="form-group">
          <button
            class="btn btn-outline-success btn-outline-success:hover"
            @click.prevent="signInWithGoogle"
          >
            Sign In With Google
          </button>
        </div>
        <p>
          You don't have an account? <br />
          Register
          <RouterLink to="/register">here.</RouterLink>
        </p>
      </template>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router"; //import router
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/stores/firebase.js";

export default {
  name: "SignInComponent",
  props: {
    title: String,
    isRegisterForm: Boolean,
  },
  data() {
    const router = useRouter();
    return {
      router,
      email: ref(""),
      password: ref(""),
    };
  },
  methods: {
    signIn() {
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
    registerWithGoogle() {
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

<style scoped>
.container-sign-in {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 80vh;
}

.title {
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-outline-success:hover {
  background-color: var(--button-hover-color);
}

.btn-outline-success {
  border: 2px solid var(--border-color);
}
</style>
