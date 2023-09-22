<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <a class="navbar-brand" href="#">
      <img src="@/assets/logo-PalPalooza-png.png" style="height: 200px" />
    </a>
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
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink
            exact
            to="/activity"
            class="nav-link"
            active-class="active-link"
            >Activity</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            exact
            to="/addActivity"
            class="nav-link"
            active-class="active-link"
            >Add Activity</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            exact
            to="/profile"
            class="nav-link"
            active-class="active-link"
            >My Profile</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            exact
            to="/postbox"
            class="nav-link"
            active-class="active-link"
            >Postbox</RouterLink
          >
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink
            to="/sign-in"
            class="btn btn-outline-success add-activity-btn:hover"
            >Log in</RouterLink
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button
            class="btn btn-outline-success add-activity-btn:hover"
            type="submit"
            @click="handleSignOut"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>

    <div class="nav-decoration"></div>
    <div class="nav-decoration-narrow"></div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "NavBar",
  setup() {
    const isLoggedIn = ref(false);
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
    });

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log("User signed out");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    };

    return { isLoggedIn, handleSignOut };
  },
};
</script>

<style scoped>
.navbar {
  background-color: var(--background-color);
  height: 120px;
  padding: 0;
  margin: 0;
}

.navbar-brand {
  background-color: var(--second-backround-color);
  height: 120px;
  padding-left: 350px;
  padding-top: 20px;
  position: relative;
  margin: 0;
}

/* Adjust the logo's positioning */
.navbar-brand img {
  position: absolute; /* Position it absolutely */
  top: 30px; /* Shift it upwards by 40 pixels (or as required) */
  left: 75px; /* Center the logo horizontally */
  transform: translateX(-50%, -50%); /* Use translate to perfectly center it */
  z-index: 1; /* Place it above the rectangle */
}

.nav-item {
  color: var(--second-backround-color);
  font-weight: bold;
  margin-right: 30px;
  position: relative;
}

.nav-link:hover {
  color: var(--text-color);
}

.nav-item .active-link {
  color: var(--text-color);
}
.nav-link {
  color: var(--second-backround-color);
  text-decoration: none;
  position: relative;
}

.navbar-nav::after {
  content: "";
  position: absolute;
  height: 20px;
  left: 0x;
  right: 0;
  bottom: -6px;
  height: 6px;
  background: linear-gradient(
    to bottom,
    var(--second-backround-color),
    var(--nav-decoration-color)
  );
}
.navbar-nav::after {
  content: "";
  position: absolute;
  height: 20px;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 6px;
  background: linear-gradient(
    to bottom,
    var(--second-backround-color),
    var(--nav-decoration-color)
  );
}

.nav-decoration {
  height: 5px;
  width: 47%;
  background-color: #f92c85;
  position: absolute;
  bottom: 30px;
  right: 0px;
}

.nav-decoration-narrow {
  height: 10px;
  background-color: var(--second-backround-color);

  bottom: 0;
  left: 0;
  right: 0px;
}

.add-activity-btn:hover {
  cursor: pointer;
  background-color: var(--button-hover-color);
}
.btn-outline-success:hover {
  background-color: var(--button-hover-color);
}
.btn-outline-success {
  border: 2px solid var(--border-color);
  color: var(--button-text-color);
}
</style>
