<template>
  <div>
    <div>
      <h1>This is Activity</h1>
      <div>
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Search activty
        </button>
      </div>
    </div>
    <div v-for="activity in userActivities" :key="activity.id">
      {{ activity.user.username }}<br />
      {{ activity.user.userAge }} <br />
      {{ activity.user.userGender }} <br />
      {{ activity.location }} <br />
      {{ activity.date }} <br />
      {{ activity.time }} <br />
      {{ activity.activity }}
    </div>
  </div>
  <!-- Modal -->
  <ModalComponent :title="'Search Activity'">
    <div class="mb-4">
      <label class="form-label">Gender</label>
      <select class="form-control custom-select" v-model="userGender">
        <option disabled value="">Please select your option</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="diverse">Diverse</option>
      </select>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="mb-4">
        <label class="form-label">Age</label>
        <input
          class="form-control"
          type="number"
          placeholder="age"
          v-model="userAge"
        />
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="mb-4">
        <label class="form-label">Location</label>
        <input
          class="form-control"
          type="text"
          placeholder="Location"
          v-model="location"
        />
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="mb-4">
        <label class="form-label">Date</label>
        <input
          class="form-control"
          type="text"
          placeholder="Date"
          v-model="date"
        />
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="mb-4">
        <label class="form-label">Time</label>
        <input
          class="form-control"
          type="text"
          placeholder="Time"
          v-model="time"
        />
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="mb-4">
        <label class="form-label">Activity</label>
        <input
          class="form-control"
          type="text"
          placeholder="Activity"
          v-model="activity"
        />
      </div>
    </div>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-primary btn_close"
        @click="filterAddData"
        data-bs-dismiss="modal"
      >
        Search
      </button>
    </template>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/ModalComponent.vue";
import { ref } from "vue";
import { db } from "@/stores/firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

export default {
  components: { ModalComponent },
  data() {
    return {
      userActivities: [],
      user: "",
      location: ref(""),
      date: ref(""),
      time: ref(""),
      activity: ref(""),
      userAge: ref(null),
      userGender: ref(""),
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
    },

    async filterAddData() {
      console.log("the filter is working");

      const ageQuery = this.userAge
        ? where("userAge", "==", this.userAge)
        : null;
      const genderQuery = this.userGender
        ? where("userGender", "==", this.userGender)
        : null;
      const locationQuery = this.location
        ? where("location", "==", this.location)
        : null;
      const dateQuery = this.date ? where("date", "==", this.date) : null;
      const timeQuery = this.time ? where("time", "==", this.time) : null;
      const activityQuery = this.activity
        ? where("activity", "==", this.activity)
        : null;

      const queries = [
        ageQuery,
        genderQuery,
        locationQuery,
        dateQuery,
        timeQuery,
        activityQuery,
      ].filter((q) => q);

      let q2 = query(collection(db, "activities"));
      if (queries.length) {
        queries.forEach((q) => {
          q2 = query(q2, q);
        });
      }

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
    },
  },

  async created() {
    await this.getAddData();
    /*setTimeout(() => console.log("Frietag"), 10000);*/
  },
};
</script>
