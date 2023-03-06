<template>
  <nav>
    <button
      class="btn btn-outline-success"
      type="submit"
      @click="handleSignOut"
      v-if="isLoggedIn"
    >
      Sign out
    </button>
  </nav>

  <NavBar></NavBar>

  <router-view />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "./router";

import NavBar from "@/components/NavBar.vue";


</script>

<style></style>
