<template>
  <div class="back-color">
    <div class="center-rectangle">
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
            <div
              v-for="(msg, index) in filteredMessages"
              :key="`message-${index}`"
              :class="{
                'msg-sent': msg.senderId === user.uid,
                'msg-received': msg.senderId !== user.uid,
              }"
            >
              <template v-if="msg.senderId === user.uid">
                <div class="msg-wrapper">
                  <div class="msg-content">{{ msg.text }}</div>
                  <span class="msg-time">{{ formatTime(msg.sentAt) }}</span>
                </div>
              </template>
              <template v-else>
                <div class="msg-wrapper">
                  <div class="msg-content">{{ msg.text }}</div>
                  <span class="msg-time">{{ formatTime(msg.sentAt) }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="msg-input-container">
            <input
              type="text"
              class="msg-input"
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Type your message..."
            />
            <button class="msg-send-btn" @click="sendMessage">Send</button>
          </div>
        </div>
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
    filteredMessages() {
      const sentMessages = this.messages.filter(
        (msg) =>
          msg.senderId === this.user.uid &&
          msg.recipientId === this.selectedRecipient.uid
      );

      const receivedMessages = this.messages.filter(
        (msg) =>
          msg.senderId === this.selectedRecipient.uid &&
          msg.recipientId === this.user.uid
      );

      return [...sentMessages, ...receivedMessages].sort(
        (a, b) => a.sentAt - b.sentAt
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
        onSnapshot(receivedMessagesQuery, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            messages.push(doc.data());
          });
          this.messages = messages.sort((a, b) => a.sentAt - b.sentAt);
        });
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

    formatTime(timestamp) {
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
    isReceivedMessage(msg) {
      return msg.senderId === this.selectedRecipient.uid;
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

.back-color {
  padding: 40px;
}

.center-rectangle {
  background: linear-gradient(var(--background-color), var(--styling-color));
  padding: 40px;
  margin-top: 10px;
  border-radius: 40px;
  max-width: 100%;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.recipient-list {
  border-radius: 10px;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
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
  color: rgba(165, 42, 42, 0.6);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
  display: block;
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
  color: var(--text-color);
}

.msg-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.msg-list ul {
  list-style-type: none;
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
  background-color: var(--background-color);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: bold;
  margin-right: 23px;
}

.msg-send-btn:hover {
  background-color: #006aec;
}

.msg-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
}

.msg-sent {
  margin-left: auto;
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 8px 8px 0px 8px;
  max-width: 80%;
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.msg-received {
  margin-bottom: 20px;
  background-color: #f1f0f0;
  color: var(--text-color);
  border-radius: 8px 8px 8px 0px;
  max-width: 80%;
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.msg-content {
  padding: 10px;
  word-wrap: break-word;
}

.msg-time {
  font-size: 0.7rem;
  color: grey;
  margin-left: 10px;
  white-space: nowrap;
  padding-right: 10px;
}

.sent .msg-time {
  align-self: flex-end;
}

.received .msg-time {
  align-self: flex-start;
}
</style>
