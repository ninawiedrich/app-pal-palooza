<template>
  <form>
    <div>
      <h4>My Profile</h4>
    </div>
    <div>
      <div>
        <div>
          <img
            src="${ user.profileImageUrl}"
            alt="Joker"
            style="height: 300px"
          /><!-- in src '${ user.profileImageUrl}' -->
        </div>
        <!-- Not needed?! -->
        <div v-for="user in this.userdata" :key="user.id">
          <p>Name: {{ user.username }}</p>
          <br />
          {{ user.firstName }} <br />
          {{ user.lastName }} <br />
          {{ user.userAge }} <br />
          {{ user.userGender }} <br />
          {{ user.userJob }} <br />
          {{ user.userFreeTime }} <br />
          {{ user.userLike }} <br />
          {{ user.userDontLike }} <br />
          {{ user.userAboutMe }} <br />
        </div>
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
        Launch static backdrop modal
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
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Edit Profile
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body"></div>
        <div v-for="user in userdata" :key="user.id">
          <div>
            <input type="file" @change="uploadFile" />
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Username</label>
              <input
                class="form-control"
                type="text"
                placeholder="choos your name"
                v-model="username"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-4">
              <label class="form-label">First Name</label>
              <input
                class="form-control"
                type="text"
                placeholder="First name"
                v-model="firstName"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-4">
              <label class="form-label">Last Name</label>
              <input
                class="form-control"
                type="text"
                placeholder="Last Name"
                v-model="lastName"
              />
            </div>
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
          <div class="col-md-5">
            <div class="mb-4">
              <select class="form-control custom-select" v-model="userGender">
                <option disabled value="">Please select onr option</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="diverse">Diverse</option>
              </select>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Job</label>
              <input
                class="form-control"
                type="text"
                placeholder="job"
                v-model="userJob"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-0">
              <label class="form-label">In my free time...</label>
              <textarea
                class="form-control"
                rows="5"
                placeholder="In my free time"
                v-model="userFreeTime"
              ></textarea>
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-0">
              <label class="form-label">I like...</label>
              <textarea
                class="form-control"
                rows="5"
                placeholder="Here can be your description"
                v-model="userLike"
              ></textarea>
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-0">
              <label class="form-label">I don't like...</label>
              <textarea
                class="form-control"
                rows="5"
                placeholder="I don't like"
                v-model="userDontLike"
              ></textarea>
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-0">
              <label class="form-label">Few words about me... </label>
              <textarea
                class="form-control"
                rows="5"
                placeholder="description"
                v-model="userAboutMe"
              ></textarea>
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
              @click="submitData"
              data-bs-dismiss="modal"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage, storageRef } from "@/stores/firebase.js";
import { getAuth } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
/* import { uploadBytes, ref as fbref } from "firebase/storage"; */

export default {
  data() {
    const router = useRouter();
    return {
      userdata: [],
      user: "",

      profileImageUrl: "",

      username: ref(""),
      firstName: ref(""),
      lastName: ref(""),
      userAge: ref(""),
      userGender: "female",
      userJob: ref(""),
      userFreeTime: ref(""),
      userLike: ref(""),
      userDontLike: ref(""),
      userAboutMe: ref(""),

      router,
    };
  },
  methods: {
    /* uploadFile() {
      const storageRef = fbref(storage, "images");

      
uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
  this.profileImageUrl = await getDownloadURL(snapshot.ref);
            this.submitData();
}); */

    async submitData() {
      this.user = getAuth().currentUser;
      const docRef = doc(db, "users", this.user.uid);
      await updateDoc(docRef, {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        userAge: this.userAge,
        userGender: this.userGender,
        userJob: this.userJob,
        userFreeTime: this.userFreeTime,
        userLike: this.userLike,
        userDontLike: this.userDontLike,
        userAboutMe: this.userAboutMe,
        profileImageUrl: this.profileImageUrl,
      });

      console.log("Name change");

      this.router.go();
    },

    async getData() {
      this.user = getAuth().currentUser;
      console.log(this.user.uid);
      const docRef = doc(db, "users", this.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.userdata.push(docSnap.data());
      } else {
        console.log("No such document!");
      }
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
<style>
.btn_close {
  cursor: pointer;
}
</style>
