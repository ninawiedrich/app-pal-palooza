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
            Add activity
          </button>
        </div>
        <div class="activity-list activity-wrapper">
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
<style>
/*.btn_close {
  cursor: pointer;
}*/

body {
  background-color: #5bc0de;
}

/* Center rectangle */
.center-rectangle {
  background: linear-gradient(#5bc0de, white);
  padding: 40px;
  margin-top: 10px;
  border-radius: 40px;
}

/* Style for container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px;
}

/* Style for add activity button container */
.activity-list-actions {
  display: flex;
  justify-content: end;
}

.add-activity-btn-container {
  /*position: absolute;*/
  top: 30px;
  right: 40px;
}

/* Style for add activity button */
.add-activity-btn {
  background-color: #a75f4a;
  color: yellow;
  border: 2px solid #ff9900;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: bold;
}

.add-activity-btn:hover {
  cursor: pointer;
  background-color: #ace0ef;
}

/* Style for activity item*/

.activity-wrapper {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding-top: 40px;
}

.activity-item {
  border: 2px solid #5bc0de;
  border-radius: 10px;
  padding: 20px;
  background-color: yellow;
  font-size: 16px;
  color: #666;
  box-sizing: border-box;
  flex-basis: calc(20% - 20px);
  max-width: 100%;
  text-align: center;
}

.cyan-rectangle-activity-list {
  background-color: white;
  color: #a75f4a;
  border-radius: 2px;
  margin: 2px;
}
</style>
