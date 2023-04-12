<template>
  <div>
    <header><h1>This is Postbox</h1></header>

    <section>
      <main>
        <div
          v-for="(msg, index) in messages"
          v-bind:key="'index-' + index"
          class="['message', sentOrReceived(msg.userID)]"
        >
          <img :src="msg.photoURL" :alt="msg.displayName" />
          <p>{{ msg.text }}</p>
        </div>

        <div ref="scrollable"></div>
      </main>
      <form v-on:submit.prevent="sendMessage">
        <input
          v-model="message"
          type="text"
          placeholder="Enter your message!"
        />
        <button :disabled="!message" type="submit">Send</button>
      </form>
    </section>
  </div>
</template>

<script>
// import firebase from "firebase";
import { db, storage, storageRef } from "@/stores/firebase.js";
import { getAuth, auth } from "firebase/auth";
import { updateDoc, doc, getDoc, firestore } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
  mounted() {
    console.log(this.user);
    db.collection("messages")
      .orderBy("createdAt")
      .onSnapshot((querySnap) => {
        this.messages = querySnap.docs.map((doc) => doc.data());
      });
  },
  data() {
    return {
      user: getAuth().currentUser,
      message: "",
      messages: [],
    };
  },
  methods: {
    sentOrReceived(userUID) {
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

      //   await this.db.collection("messages").add(messageInfo);

      this.message = "";
      //   this.$refs["scrollable"].scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
