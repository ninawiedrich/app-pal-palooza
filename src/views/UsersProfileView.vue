<template>
  <div v-if="user">
    <h1>{{ user.username }}'s Profile</h1>
    <img :src="user.profileImageUrl" alt="User profile image" />
    <p><strong>First name: </strong> {{ user.firstName }}</p>
    <p><strong>Last name: </strong> {{ user.lastName }}</p>
    <p><strong>Age: </strong> {{ user.userAge }}</p>
    <p><strong>Gender: </strong> {{ user.userGender }}</p>
    <p><strong>Job: </strong>{{ user.userJob }}</p>
    <p><strong>In my free time </strong>{{ user.userFreeTime }}</p>
    <p><strong>I like </strong>{{ user.userLike }}</p>
    <p><strong>I don't like </strong>{{ user.userDontLike }}</p>
    <p><strong>Few words about me</strong>{{ user.userAboutMe }}</p>
    <!-- Display any other user information you want here -->
  </div>
  <div v-else>
    <p>Loading user profile...</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "@/stores/firebase";
import { getDoc, doc } from "firebase/firestore";

export default {
  name: "UsersProfileView",
  data() {
    return {
      user: null,
      userId: this.$route.params.userId,
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const userSnapshot = await getDoc(doc(db, "users", this.userId));
        if (userSnapshot.exists()) {
          this.user = userSnapshot.data();
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    },
  },
  async created() {
    await this.fetchUserData();
  },
};
</script>
