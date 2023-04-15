<template>
  <div class="container">
    <form>
      <div class="center-rectangle">
        <div class="activity-list-actions">
          <!-- Button trigger modal -->
          <ButtonComponent :btnName="'My Profile'" />
        </div>
        <div class="activity-grid activity-wrapper">
          <div class="activity-item activity-item-large">
            <img
              :src="
                userdata.profileImageUrl ||
                'https://i.pinimg.com/736x/e4/62/bd/e462bdbebd8859f0ade1bbea7f64643f--guy-fawkes-aussi.jpg'
              "
              alt="User profile"
              style="height: 300px"
            />
          </div>

          <div class="activity-item activity-item-large">
            <div>
              <span class="fixed-text">User name: </span>
              {{ userdata.username }}
            </div>
            <br />
            <div>
              <span class="fixed-text">First name: </span
              >{{ userdata.firstName }}
            </div>
            <br />
            <div>
              <span class="fixed-text">Last name: </span>{{ userdata.lastName }}
            </div>
            <br />
            <div>
              <span class="fixed-text">Age: </span> {{ userdata.userAge }}
            </div>
            <br />
            <div>
              <span class="fixed-text">Gender: </span> {{ userdata.userGender }}
            </div>
            <br />
            <div>
              <span class="fixed-text">Job: </span> {{ userdata.userJob }}
            </div>
            <br />
          </div>
          <div class="activity-item">
            <label class="form-label">In my free time </label>
            {{ userdata.userFreeTime }}
          </div>
          <div class="activity-item">
            <label class="form-label">I like </label>
            {{ userdata.userLike }}
          </div>
          <div class="activity-item">
            <label class="form-label">I don't like </label>
            {{ userdata.userDontLike }}
          </div>
          <div class="activity-item">
            <label class="form-label">Few words about me </label>
            {{ userdata.userAboutMe }}
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- Modal -->
  <ModalComponent :title="'My Profile'" class="modal-style">
    <div>
      <label class="form-label">Profile Image</label>
      <input type="file" @change="uploadFile" />
    </div>
    <div class="col-sm-6 col-md-6">
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
    <div>
      <div class="mb-4">
        <div class="col-sm-6 col-md-6">
          <div class="mb-4">
            <label class="form-label">Gender</label>
            <select class="form-control custom-select" v-model="userGender">
              <option value="">Please select your option</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="diverse">Diverse</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-6">
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
      <ButtonComponent @click="submitData" :btnName="'Submit'" />
    </div>
  </ModalComponent>
</template>

<script>
// Import necessary components and Firebase libraries
import ModalComponent from "@/components/ModalComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { db, storage } from "@/stores/firebase.js";
import { getAuth } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { ref as vueRef } from "vue";
import { useRouter } from "vue-router";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default {
  components: { ModalComponent, ButtonComponent },
  name: "ProfileView",
  data() {
    const router = useRouter();
    return {
      userdata: [],
      user: "",
      profileImageUrl: "",
      username: vueRef(""),
      firstName: vueRef(""),
      lastName: vueRef(""),
      userAge: vueRef(""),
      userGender: "",
      userJob: vueRef(""),
      userFreeTime: vueRef(""),
      userLike: vueRef(""),
      userDontLike: vueRef(""),
      userAboutMe: vueRef(""),
      router,
    };
  },
  watch: {
    userdata: {
      handler() {
        this.username = this.userdata.username;
        this.firstName = this.userdata.firstName;
        this.lastName = this.userdata.lastName;
        this.userAge = this.userdata.userAge;
        this.userGender = this.userdata.userGender;
        this.userJob = this.userdata.userJob;
        this.userFreeTime = this.userdata.userFreeTime;
        this.userLike = this.userdata.userLike;
        this.userDontLike = this.userdata.userDontLike;
        this.userAboutMe = this.userdata.userAboutMe;
        this.profileImageUrl = this.userdata.profileImageUrl;
      },
      deep: true,
    },
  },
  methods: {
    async uploadFile(event) {
      try {
        const file = event.target.files[0];
        if (!file) return;

        const storageReference = storageRef(storage, `images/${this.user.uid}`);
        const uploadTask = uploadBytesResumable(storageReference, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log("Error uploading file:", error);
          },
          async () => {
            this.profileImageUrl = await getDownloadURL(
              uploadTask.snapshot.ref
            );
            this.submitData();
          }
        );
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    },

    async submitData() {
      // Get the current user and create a reference to their Firestore doc
      this.user = getAuth().currentUser;
      const docRef = doc(db, "users", this.user.uid);

      // Update the user's doc with the new data including the profile image URL
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

      // Navigate to the updated profile page
      this.router.go();
    },

    async getData() {
      // Get the current user and create a reference to their Firestore doc
      this.user = getAuth().currentUser;
      const docRef = doc(db, "users", this.user.uid);

      // Get the user data from the doc and store it in component data
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.userdata = docSnap.data();
      } else {
        console.log("No such document!");
      }
    },
  },
  mounted() {
    // Get the current user's data on component mount
    this.getData();
  },
};
</script>
<style scoped>
/* Style for add activity button container */
.activity-list-actions {
  display: flex;
  justify-content: end;
}
.fixed-text {
  color: black;
}
.activity-wrapper {
  display: grid;
  gap: 40px;
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 2fr;
  padding-top: 40px;
}
.activity-item {
  grid-column: 2;
  border: 2px solid var(--background-color);
  border-radius: 10px;
  padding: 20px;
  background-color: var(--background-color);
  font-size: 16px;
  color: var(--text-color);
  box-sizing: border-box;
  flex-basis: calc(20% - 20px);
  max-width: 100%;
  text-align: left;
}
.activity-item-large {
  grid-row-end: span 2;
  grid-column: 1;
}
</style>
