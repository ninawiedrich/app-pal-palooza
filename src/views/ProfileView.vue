<template>
  <div class="container">
    <form>
      <div class="center-rectangle">
        <div class="activity-list-actions">
          <!-- Button trigger modal -->
          <ButtonComponent
            buttonText="My profile"
            class="add-activity-btn add-activity-btn-container"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
        </div>
        <div class="activity-grid activity-wrapper">
          <div class="activity-item activity-item-large">
            <img
              :src="'https://i.pinimg.com/736x/e4/62/bd/e462bdbebd8859f0ade1bbea7f64643f--guy-fawkes-aussi.jpg'"
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
        <div class="col-md-5">
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
        class="btn btn-primary btn_close"
        @click="submitData"
        data-bs-dismiss="modal"
      >
        Update
      </button>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/ModalComponent.vue";
import { db, storage, storageRef } from "@/stores/firebase.js";
import { getAuth } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  components: { ModalComponent, ButtonComponent },
  name: "ProfileView",
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
    async uploadFile(event) {
      const file = event.target.files[0];
      if (!file) return;

      const storageRef = storageRef(storage, `profileImages/${this.user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log("Error uploading file:", error);
        },
        async () => {
          this.profileImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          this.submitData();
        }
      );
    },
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
        this.userdata = docSnap.data();
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
