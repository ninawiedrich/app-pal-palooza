<template>
  <div class="container activity-page">
    <form>
      <div class="center-rectangle">
        <div class="activity-list-actions">
          <button
            type="button"
            class="add-activity-btn add-activity-btn-container"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add Activity
          </button>
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
        @click="submitAddData"
        data-bs-dismiss="modal"
      >
        Submit
      </button>
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

export default {
  components: { ModalComponent, ActivityList },
  name: "AddActivityView",
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
    async submitAddData() {
      console.log("submit was clicked");
      const authUser = getAuth().currentUser;
      console.log("user", authUser);
      const q = query(collection(db, "users"), where("id", "==", authUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.user = doc.data();
      });
      console.log(this.user);

      /* Function Uploadfile Storage*/
      const docRef = await addDoc(collection(db, "activities"), {
        location: this.location,
        date: this.date,
        time: this.time,
        activity: this.activity,
        userId: this.user.id,
      });
      console.log("activity created: ", docRef.id);
      /*const router = useRouter();
      router.push("/Activity");*/
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
