<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <a class="navbar-brand" href="#">
      <div class="logo-rectangle"></div>
      <img src="@/assets/logo_palpalooza_new.png" style="height: 80px" />
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
            >My profile</RouterLink
          >
        </li>

        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink to="/sign-in" class="btn btn-outline-success"
            >Log in</RouterLink
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button
            class="btn btn-outline-success"
            type="submit"
            @click="handleSignOut"
          >
            <p>Sign out</p>
          </button>
        </li>
      </ul>
    </div>

    <div class="nav-decoration"></div>
    <div class="nav-decoration-narrow"></div>
  </nav>
</template>

<script></script>

<style scoped>
.navbar {
  background-color: #5bc0de;
  height: 120px;
  position: absolut;
  padding: 0;
  margin: 0;
}

.navbar-brand {
  background-color: yellow;
  height: 120px;
  padding-left: 50px;
  padding-top: 20px;
}

.logo-rectangle {
  background-color: yellow;
  width: 250px;
}

.nav-item {
  color: yellow;
  font-weight: bold;
  margin-right: 30px;
  position: relative;
}

.nav-link:hover {
  color: brown;
}

.nav-item .active-link {
  color: brown;
}
.nav-link {
  color: yellow;
  text-decoration: none;
  position: relative;
}

.btn-outline-success {
  background-color: yellow;
  font-weight: bold;
  color: #a75f4a;
}

.navbar-nav::after {
  content: "";
  position: absolute;
  height: 20px;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 6px;
  background: linear-gradient(to bottom, yellow, navy);
}
.navbar-nav::after {
  content: "";
  position: absolute;
  height: 20px;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 6px;
  background: linear-gradient(to bottom, yellow, navy);
}

.nav-decoration {
  height: 5px;
  width: 500px;
  background-color: navy;
  position: absolute;
  bottom: 30px;
  right: 0px;
}

.nav-decoration-narrow {
  height: 10px;
  background-color: yellow;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
