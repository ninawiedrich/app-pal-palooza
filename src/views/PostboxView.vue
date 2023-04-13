<template>
  <div>
    <header><h1>This is Postbox</h1></header>

    <section>
      <main>
        <div v-for="(msg, index) in messages" v-bind:key="'index-' + index">
          <img :src="msg.photoURL" :alt="msg.displayName" />
          <p>{{ msg.text }}</p>
        </div>

        <div ref="scrollable"></div>
      </main>
      <form v-on:submit.prevent="sendMessage">
        <div class="form-group">
          <input
            class="form-control"
            v-model="message"
            type="text"
            placeholder="Enter your message!"
          />

          <ButtonComponent
            :disabled="!message"
            type="submit"
            @click="submitData"
            :btnName="'Send'"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import { messaging, auth, db } from "@/stores/firebase.js";
import { onMessage } from "firebase/messaging";

export default {
  components: { ButtonComponent },
  data() {
    return {
      user: auth.currentUser,
      message: "",
      messages: [],
    };
  },
  methods: {
    requestPermission() {
      console.log("Requesting permission...");
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    },
    messaging() {
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // ...
      });
    },

    /* sentOrReceived(userUID) {
      return userUID === this.user.uid ? "sent" : "received";
    },
    async sendMessage() {
      const messageInfo = {
        userUID: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        text: this.message,
        createdAt: Date.now(),
      };

      await this.db.collection("messages").add(messageInfo);

      this.message = "";
      this.$refs["scrollable"].scrollIntoView({ behavior: "smooth" });
    }, */
  },
  mounted() {
    this.requestPermission();
    console.log(this.user);
  },
};
</script>

<style scoped>
.form-group {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 20px;
}
</style>
