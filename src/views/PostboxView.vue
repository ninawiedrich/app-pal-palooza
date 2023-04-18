<template>
  <header><h1>This is Postbox</h1></header>
  <div>
    <label class="form-label">Recipient</label>
    <select class="form-control custom-select" v-model="recipientUID">
      <option value="" disabled>Please select a recipient</option>
      <option
        v-for="recipient in recipients"
        :key="recipient.uid"
        :value="recipient.uid"
      >
        {{ recipient.username }}
      </option>
    </select>
  </div>
  <div>
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

          <button
            class="add-activity-btn add-activity-btn-container"
            :disabled="!message"
            type="submit"
            @click="sendMessage"
            name="'Send'"
          ></button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { messaging, auth, db } from "@/stores/firebase.js";
import { onMessage, onTokenRefresh } from "firebase/messaging";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

console.log("db:", db);

export default {
  data() {
    return {
      user: auth.currentUser,
      message: "",
      messages: [],
      recipients: [],
      recipientUID: "",
    };
  },
  methods: {
    requestPermission() {
      console.log("Checking permission status...");

      // Check the current permission status
      const permissionStatus = Notification.permission;

      if (permissionStatus === "granted") {
        console.log("Notification permission already granted.");
      } else if (permissionStatus === "denied") {
        console.log("Notification permission denied.");
        this.showPermissionInstructions();
      } else {
        console.log("Requesting permission...");

        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          } else {
            console.log("Notification permission denied or not granted.");
          }
        });
      }
    },

    showPermissionInstructions() {
      alert(
        "To receive notifications, please enable them in your browser settings for this website."
      );
    },

    onTokenRefresh() {
      onTokenRefresh(messaging, () => {
        messaging
          .getToken({
            vapidKey:
              "BIdQpNVc_cWdol0oeixbZfWvnJmONOVF_tB-354aAaYpMzYKsbuaYFGA1zgAMXM8GRnVFb2akrynBq1RJYRkN_c",
          })
          .then((token) => {
            console.log("Token:", token);
          })
          .catch((error) => {
            console.error("Error getting token:", error);
          });
      });
    },

    onMessage() {
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // ...
      });
    },

    sentOrReceived(userUID) {
      return userUID === this.user.uid ? "sent" : "received";
    },

    async sendMessage() {
      try {
        console.log("user", this.user);
        const messageInfo = {
          userUID: this.user.uid,
          recipientUID: this.recipientUID,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          text: this.message,
          createdAt: Date.now(),
        };

        console.log("Trying to send message...");
        console.log("db object:", db);

        const docRef = await addDoc(collection(db, "messages"), messageInfo);

        this.message = "";
        this.$refs["scrollable"].scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("Error while sending message:", error);
      }
    },

    async fetchRecipients() {
      console.log("worked");
      const q2 = query(collection(db, "users"));
      const users = [];
      const querySnapshot = await getDocs(q2);
      for (let doc of querySnapshot.docs) {
        const userData = doc.data();
        //   //const activityDetail = {
        //     id: doc.id,
        //     activity: activityData.activity,
        //     activityGroup: activityData.activityGroup,
        //     date: activityData.date,
        //     location: activityData.location,
        //     time: activityData.time,
        //  };
        //activityDetail.user = await this.getUserData(activityData.userId);
        users.push({ uid: userData.id, username: userData.username });
      }
      this.recipients = users;
      console.log(this.recipients);
    },

    async fetchRecipientsOld() {
      try {
        const querySnapshot = await db.collection("users").get();
        const recipients = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== this.user.uid) {
            recipients.push({ uid: doc.id, username: doc.data().username });
          }
        });
        this.recipients = recipients;
      } catch (error) {
        console.error("Error while fetching recipients:", error);
      }
    },
  },
  created() {
    console.log("db object:", db);
    this.fetchRecipients();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in.");
        // Listen for messages where the recipient is the current user
        db.collection("messages")
          .where("recipientUID", "==", user.uid)
          .orderBy("createdAt")
          .onSnapshot((querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
              messages.push(doc.data());
            });
            this.messages = messages;
          });
      } else {
        console.log("User is signed out.");
      }
    });
  },
};
</script>
