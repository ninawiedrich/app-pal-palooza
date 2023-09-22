<template>
  <div
    class="modal fade"
    id="userProfileModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="userProfileModalLabel">
            {{ title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="user">
            <h1>{{ user.username }}'s Profile</h1>
            <img
              :src="
                user.profileImageUrl ||
                'https://i.pinimg.com/736x/e4/62/bd/e462bdbebd8859f0ade1bbea7f64643f--guy-fawkes-aussi.jpg'
              "
              alt="User profile"
              style="height: 200px"
            />
            <p><strong>First name: </strong> {{ user.firstName }}</p>
            <p><strong>Last name: </strong> {{ user.lastName }}</p>
            <p><strong>Age: </strong> {{ user.userAge }}</p>
            <p><strong>Gender: </strong> {{ user.userGender }}</p>
            <p><strong>Job: </strong>{{ user.userJob }}</p>
            <p><strong>In my free time </strong>{{ user.userFreeTime }}</p>
            <p><strong>I like </strong>{{ user.userLike }}</p>
            <p><strong>I don't like </strong>{{ user.userDontLike }}</p>
            <p><strong>Few words about me </strong>{{ user.userAboutMe }}</p>
          </div>
          <div v-else>
            <p>Loading user profile...</p>
          </div>
        </div>
        <div class="modal-footer"><slot name="footer"></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  props: {
    title: String,
    user: Object,
  },
  data() {
    return {};
  },
};
</script>

<style>
.modal-style .modal-content {
  background-color: var(--styling-color);
  border-radius: 10px;
}

.modal-style .modal-header {
  background-color: var(--second-backround-color);
  color: var(--button-text-color);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-style .modal-body {
  padding: 20px;
}

.modal-style .form-control {
  border-radius: 5px;
  border: 2px solid var(--background-color);
  background-color: var(--button-text-color);
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
}

.modal-style .form-control:focus {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal-style .form-label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}
</style>
