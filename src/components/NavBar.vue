<template>
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary"
    style="background-color: #ff9900"
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
          <button class="btn btn-outline-success" type="submit">
            <RouterLink to="/sign-in" class="nav-link">Log in</RouterLink>
          </button>
          <button
            class="btn btn-outline-success"
            type="submit"
            @click="handleSignOut"
            v-if="isLoggedIn"
          >
            Sign out
          </button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "NavBar",
  components: {
    RouterLink,
  },
data () {
    const isLoggedIn  = ref(false);
    let auth;
}
methods: {

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
}

};
</script>
