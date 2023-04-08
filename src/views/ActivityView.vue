<template>
  <div class="container">
    <form>
      <div class="center-rectangle">
        <div class="activity-list-actions">
          <button
            type="button"
            class="add-activity-btn add-activity-btn-container"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Search Activty
          </button>
        </div>
        <div>
          <!-- Die classen + Styles mit in die Component rüber nehmen -->
          <ActivityList :activities="filteredActivities"></ActivityList>
        </div>
      </div>
      <br />
    </form>
  </div>
  <!-- Modal -->
  <ModalComponent :title="'Search Activity'" class="modal-style">
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
          type="date"
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
          type="time"
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
        data-bs-dismiss="modal"
      >
        Search
      </button>
    </template>
  </ModalComponent>
</template>

<script>
import ActivityList from "@/components/ActivityListComponent.vue";
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
  components: { ModalComponent, ActivityList },
  name: "ActivityView",
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
  computed: {
    filteredActivities() {
      let filteredActivities = this.userActivities;
      if (this.userGender.length > 0) {
        filteredActivities = filteredActivities.filter(
          (activity) => activity.user.userGender === this.userGender
        );
      }
      if (this.userAge !== null) {
        filteredActivities = filteredActivities.filter(
          (activity) => activity.user.userAge === this.userAge
        );
      }
      if (this.location.length > 0) {
        filteredActivities = filteredActivities.filter((activity) =>
          activity.location.toLowerCase().includes(this.location.toLowerCase())
        );
      }
      if (this.date.length > 0) {
        filteredActivities = filteredActivities.filter(
          (activity) => activity.date === this.date
        );
      }
      if (this.time.length > 0) {
        filteredActivities = filteredActivities.filter(
          (activity) => activity.time === this.time
        );
      }

      if (this.activity.length > 0) {
        filteredActivities = filteredActivities.filter((activity) =>
          activity.activity.toLowerCase().includes(this.activity.toLowerCase())
        );
      }
      return filteredActivities;
    },
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
  },

  async created() {
    await this.getAddData();
    /*setTimeout(() => console.log("Frietag"), 10000);*/
  },
};
</script>
