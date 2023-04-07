<template>
  <SignInComponent :title="'Create an account'" :is-register-form="true">
  </SignInComponent>
</template>

<script>
import SignInComponent from "@/components/SignInComponent.vue";

export default {
  components: { SignInComponent },
  name: "RegisterView",
};
</script>
