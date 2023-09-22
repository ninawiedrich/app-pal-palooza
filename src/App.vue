<template>
  <NavBar></NavBar>

  <router-view />
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<style>
.center-rectangle {
  background: linear-gradient(var(--background-color), var(--styling-color));
  padding: 40px;
  margin-top: 10px;
  border-radius: 40px;
}
/* Style for container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px;
}

body {
  background-color: var(--background-color);
}

html {
  --text-color: brown;
  --background-color: #fdf5df;
  --second-backround-color: #5ebec4;
  --styling-color: white;
  --button-color: rgb(207, 3, 92);
  --button-text-color: #fdf5df;
  --border-color: rgb(207, 3, 92);
  --button-hover-color: #ace0ef;
  --nav-decoration-color: navy;
}

.btn-outline-success {
  background-color: var(--second-backround-color);
  font-weight: bold;
  color: var(--button-color);
}
</style>
