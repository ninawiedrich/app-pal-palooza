<template>
  <div class="app">
    <div class="recipient-list">
      <ul>
        <li
          v-for="(recipient, index) in filteredRecipients"
          :key="index"
          :class="{ active: selectedRecipient === recipient.uid }"
          @click="selectRecipient(recipient)"
        >
          <img :src="recipient.profileImageUrl" class="recipient-avatar" />
          <div>
            <h3 class="recipient-name">
              {{ recipient.firstName }} {{ recipient.lastName }}
            </h3>
            <p class="recipient-last-msg">{{ recipient.lastMessage }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="msg-container" v-if="selectedRecipient">
      <div class="msg-header">
        <img
          :src="selectedRecipient.profileImageUrl"
          class="recipient-avatar"
        />
        <h2 class="recipient-name">
          {{ selectedRecipient.firstName }} {{ selectedRecipient.lastName }}
        </h2>
      </div>
      <div class="msg-list" ref="msgList">
        <ul>
          <li
            v-for="(msg, index) in messages"
            :key="index"
            :class="{
              sent: msg.senderId === user.uid,
              received: msg.senderId !== user.uid,
            }"
          >
            <div class="msg-content">{{ msg.text }}</div>
          </li>
        </ul>
      </div>
      <div class="msg-input-container">
        <input
          type="text"
          class="msg-input"
          v-model="newMessage"
          placeholder="Type your message..."
        />
        <button class="msg-send-btn" @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/stores/firebase.js";
import {
  collection,
  addDoc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  doc,
} from "firebase/firestore";

export default {
  data() {
    return {
      user: auth.currentUser,
      recipients: [],
      selectedRecipient: null,
      messages: [],
      newMessage: "",
    };
  },
  computed: {
    filteredRecipients() {
      return this.recipients.filter(
        (recipient) => recipient.uid !== this.user.uid
      );
    },
  },
  methods: {
    async fetchRecipients() {
      const q = query(collection(db, "users"));
      onSnapshot(q, (querySnapshot) => {
        const recipients = [];
        querySnapshot.forEach((doc) => {
          const recipient = doc.data();
          recipient.uid = doc.id;
          recipients.push(recipient);
        });
        this.recipients = recipients;
      });
    },
    async fetchRecipient(recipientId) {
      const docRef = doc(db, "users", recipientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.selectedRecipient = docSnap.data();
        this.selectedRecipient.uid = docSnap.id;
        // fetch messages for this recipient
        this.fetchMessages();
      } else {
        console.error("Recipient not found in database");
      }
    },
    async fetchMessages() {
      const mergeMessages = (newMessages) => {
        this.messages = [...this.messages, ...newMessages].sort(
          (a, b) => a.sentAt - b.sentAt
        );
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      };

      const sentMessagesQuery = query(
        collection(db, "messages"),
        where("senderId", "==", this.user.uid),
        where("recipientId", "==", this.selectedRecipient.uid),
        orderBy("sentAt", "asc"),
        limit(50)
      );

      const receivedMessagesQuery = query(
        collection(db, "messages"),
        where("senderId", "==", this.selectedRecipient.uid),
        where("recipientId", "==", this.user.uid),
        orderBy("sentAt", "asc"),
        limit(50)
      );

      onSnapshot(sentMessagesQuery, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        mergeMessages(messages);
      });

      onSnapshot(receivedMessagesQuery, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        mergeMessages(messages);
      });
    },
    async sendMessage() {
      if (!this.newMessage) {
        return;
      }
      const newMsg = {
        text: this.newMessage,
        senderId: this.user.uid,
        recipientId: this.selectedRecipient.uid,
        sentAt: new Date().getTime(),
      };
      await addDoc(collection(db, "messages"), newMsg);
      this.selectedRecipient.lastMessage = this.newMessage;
      this.newMessage = "";
    },
    scrollToBottom() {
      if (this.$refs.msgList) {
        this.$refs.msgList.scrollTop = this.$refs.msgList.scrollHeight;
      }
    },
    selectRecipient(recipient) {
      this.selectedRecipient = recipient;
      this.fetchMessages();
    },
  },
  created() {
    this.fetchRecipients();
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-container {
  display: flex;
  flex: 1;
  height: 100%;
}

.user-container {
  width: calc(250px * 0.25);
  background-color: #f7f7f7;
  border-right: 1px solid #dcdcdc;
  width: 25%; /* Adjust this value to your desired width */
  max-width: 62.5px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-bottom: 1px solid #dcdcdc;
}

.user-name {
  margin-left: 10px;
  font-size: 1.2rem;
}

.recipient-list {
  flex: 0.25;
  overflow-y: auto;
}

.recipient-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.recipient-name {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.recipient-last-msg {
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: black;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.recipient-list ul {
  list-style-type: none;
  padding: 20px;
}

.recipient-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.recipient-list li:hover {
  background-color: #dcdcdc;
}

.recipient-list li.active {
  background-color: #dcdcdc;
  font-weight: bold;
}

.msg-container {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.msg-header {
  display: flex;
  align-items: center;
  padding: 20px;
}

.recipient-name {
  margin-left: 10px;
  font-size: 1.2rem;
}

.msg-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.msg-list ul {
  list-style-type: none;
}

.msg-list li {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.msg-content {
  padding: 10px;
  border-radius: 5px;
}

.msg-content.sent {
  background-color: #007bff;
  color: black;
  align-self: flex-end;
}

.msg-content.received {
  background-color: #f7f7f7;
  color: #333;
  align-self: flex-start;
}

.msg-input-container {
  padding: 20px;
  display: flex;
  align-items: center;
}

.msg-input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
  font-size: 1rem;
}

.msg-send-btn {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.msg-send-btn:hover {
  background-color: #006aec;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
