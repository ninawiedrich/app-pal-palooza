<template>
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary"
    style="background-color: #fff0a5"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><img src="@/assets/PalPalooza_logo.png" style="height: 100px"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/activity" class="nav-link">Activity</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/addActivity" class="nav-link"
              >Add Activity</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/profile" class="nav-link">My profile</RouterLink>
          </li>
          <button
            class="btn btn-outline-success"
            type="submit"
            v-if="!isLoggedIn"
          >
            <RouterLink to="/sign-in" class="nav-link">Log in</RouterLink>
          </button>
          <button
            class="btn btn-outline-success"
            type="submit"
            @click="handleSignOut"
            v-if="isLoggedIn"
          >
            <p>Sign out</p>
          </button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "@/router";

export default {
  name: "NavBar",
  components: {
    RouterLink,
  },
  data() {
    const isLoggedIn = ref(false);
    let auth;
    return {
      isLoggedIn,
      auth,
    };
  },
  mounted() {
    this.signInUser();
  },
  methods: {
    signInUser() {
      this.auth = getAuth();
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    },
    handleSignOut() {
      signOut(this.auth).then(() => {
        router.push("/sign-in");
      });
    },
  },
};
</script>
