<template>
  <div class="container activity-page">
    <form>
      <div class="center-rectangle">
        <div class="activity-list-actions">
          <ButtonComponent :btnName="'Add Activity'" />
        </div>
        <div>
          <!-- Die classen + Styles mit in die Component rüber nehmen -->
          <ActivityList :activities="userActivities"></ActivityList>
        </div>
      </div>
      <br />
    </form>
  </div>

  <!-- Modal -->
  <ModalComponent :title="'Add Activity'" class="modal-style">
    <div class="col-sm-6 col-md-4">
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
    <div class="col-sm-6 col-md-4">
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
    <div class="col-sm-6 col-md-4">
      <div class="mb-4">
        <label class="form-label">Time</label>
        <div class="input-group">
          <input
            class="form-control"
            type="time"
            placeholder="Time"
            v-model="time"
          />
          <button
            class="btn btn-outline-secondary btn-costum"
            type="button"
            @click="resetTime"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <label class="form-label">Art of activity</label>
      <select class="form-control custom-select" v-model="selectedGroup">
        <option value="">Please select your group</option>
        <option
          v-for="(group, index) in activityGroups"
          :key="index"
          :value="group.name"
        >
          {{ group.name }}
        </option>
      </select>
    </div>

    <div class="col-sm-6 col-md-3" v-if="selectedGroup">
      <div class="mb-4">
        <label class="form-label">Activity</label>
        <input
          class="form-control"
          type="text"
          :placeholder="`Enter ${selectedGroup} activity`"
          v-model="activity"
        />
      </div>
    </div>
    <template v-slot:footer>
      <ButtonComponent @click="submitAddData" :btnName="'Submit'" />
    </template>
  </ModalComponent>
</template>

<script>
import ActivityList from "@/components/ActivityListComponent.vue";
import { getAuth } from "firebase/auth";
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import ModalComponent from "@/components/ModalComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  components: { ModalComponent, ActivityList, ButtonComponent },
  name: "AddActivityView",
  data() {
    return {
      userActivities: [],
      user: "",
      location: ref(""),
      date: ref(""),
      time: ref(""),
      activity: ref(""),
      selectedGroup: "",
      activityGroups: [
        { name: "Sports" },
        { name: "Arts" },
        { name: "Education" },
        { name: "Entertainment" },
      ],
    };
  },
  methods: {
    resetTime() {
      this.time = ""; // Set the time to an empty string
      const timeInput = document.querySelector('input[type="time"]');
      timeInput.value = ""; // Reset the input field value
    },
    async submitAddData() {
      console.log("submit was clicked");
      const authUser = getAuth().currentUser;
      console.log("user", authUser);
      const q = query(collection(db, "users"), where("id", "==", authUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.user = getAuth().currentUser;
      });
      console.log(this.user);

      /* Function Uploadfile Storage*/
      const docRef = await addDoc(collection(db, "activities"), {
        location: this.location,
        date: this.date,
        time: this.time,
        activity: this.activity,
        activityGroup: this.selectedGroup,
        userId: this.user.uid,
      });
      console.log("activity created: ", docRef.id);
      this.getAddData();
    },
    async getAddData() {
      const userId = getAuth().currentUser.uid;
      const q2 = query(
        collection(db, "activities"),
        where("userId", "==", userId)
      );
      const userdetails = [];
      const querySnapshot = await getDocs(q2);

      querySnapshot.forEach((doc) => {
        const userdetail = {
          id: doc.id,
          activity: doc.data().activity,
          date: doc.data().date,
          location: doc.data().location,
          time: doc.data().time,
          activityGroup: doc.data().activityGroup,
        };
        userdetails.push(userdetail);
      });
      this.userActivities = userdetails;
      console.log(this.userActivities);
    },
  },

  async created() {
    await this.getAddData();
  },
};
</script>

<style>
.btn-costum {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  height: 47px;
}
</style>
