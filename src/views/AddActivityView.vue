<template>
  <form>
    <div>
      <h4>This is Add Activity</h4>
    </div>
    <div>
      <div v-for="user in userdata" :key="user.id">
        {{ user.username }}<br />
        {{ user.addGender }} <br />
        {{ user.addAge }} <br />
        {{ user.addLocation }} <br />
        {{ user.addDate }} <br />
        <!-- check how -->
        {{ user.addTime }} <br />
        <!-- check how -->
        {{ user.addActivity }} <br />
      </div>
    </div>
    <br />
    <div>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add activty
      </button>
    </div>
  </form>

  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Add activty</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Location</label>
              <input
                class="form-control"
                type="text"
                placeholder="Location"
                v-model="addLocation"
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
                v-model="addDate"
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
                v-model="addTime"
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
                v-model="addActivity"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary btn_close"
            @click="submitAddData"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

export default {
  data() {
    return {
      userdata: [],
      user: "",
      addLocation: ref(""),
      addDate: ref(""),
      addTime: ref(""),
      addActivity: ref(""),
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
      const docRef = await addDoc(collection(db, "addActivity"), {
        addUsername: this.user.username,
        addGender: this.user.userGender,
        addAge: this.user.userAge,
        addLocation: this.addLocation,
        addDate: this.addDate,
        addTime: this.addTime,
        addActivity: this.addActivity,
      });
      console.log("activity created: ", docRef.id);
      /* const router = useRouter();
      router.push("/addActivity"); */
      this.getAddData();
    },

    async getAddData() {
      const q2 = query(collection(db, "addActivity"));
      const userdetails = [];
      const querySnapshot = await getDocs(q2);
      querySnapshot.forEach((doc) => {
        const userdetail = {
          id: doc.id,
          addActivity: doc.data().addActivity,
          addAge: doc.data().addAge,
          addDate: doc.data().addDate,
          addGender: doc.data().addGender,
          addLocation: doc.data().addLocation,
          addTime: doc.data().addTime,
          addUsername: doc.data().username,
        };
        userdetails.push(userdetail);
      });
      this.userdata = userdetails;
      console.log(this.userdata);
    },
  },

  mounted() {
    this.getAddData();
  },
};
</script>
<style>
.btn_close {
  cursor: pointer;
}
</style>
