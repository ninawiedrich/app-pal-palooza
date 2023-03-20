<template>
  <div>
    <div>
      <h1>This is Activity</h1>
    </div>
    <div v-for="activity in userActivities" :key="activity.id">
      <!-- {{ user.username }}<br />
        {{ user.addGender }} <br />
        {{ user.addAge }} <br /> -->
      {{ activity.location }} <br />
      {{ activity.date }} <br />
      <!-- check how -->
      {{ activity.time }} <br />
      <!-- check how -->
      {{ activity.activity }} <br />
      {{ activity.user.userGender }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "@/stores/firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

export default {
  data() {
    return {
      userActivities: [],
      user: "",
      location: ref(""),
      date: ref(""),
      time: ref(""),
      activity: ref(""),
    };
  },
  methods: {
    async getUserData(userId) {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      let user = {};
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        user = docSnap.data();
      } else {
        console.log("No such document!");
      }

      return user;
    },

    async getAddData() {
      console.log("es klappt");
      const q2 = query(collection(db, "activities"));
      const activities = [];
      const querySnapshot = await getDocs(q2);

      for (let doc of querySnapshot.docs) {
        const activityData = doc.data();
        const activityDetail = {
          id: doc.id,
          activity: activityData.activity,
          date: activityData.date,
          location: activityData.location,
          time: activityData.time,
        };

        activityDetail.user = await this.getUserData(activityData.userId);
        activities.push(activityDetail);
      }

      this.userActivities = activities;
      console.log(this.userActivities);
    },
  },

  async created() {
    await this.getAddData();
    setTimeout(() => console.log("Frietag"), 10000);
  },
};
</script>
