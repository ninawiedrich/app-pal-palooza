<template>
  <div class="activity-list activity-wrapper">
    <div
      @click="$emit('showUserProfile', activity.user)"
      data-bs-toggle="modal"
      data-bs-target="#userProfileModal"
      v-for="activity in activities"
      :key="activity.id"
      class="activity-item activity-liste-btn"
    >
      <div class="white-rectangle-activity-list">
        <p>{{ activity.location }}</p>
      </div>
      <template v-if="activity.user">
        <div class="white-rectangle-activity-list list-container">
          <p>{{ activity.user.username }}</p>
        </div>
        <div class="white-rectangle-activity-list">
          <p>{{ activity.user.userAge }}</p>
        </div>
        <div class="white-rectangle-activity-list">
          <p>{{ activity.user.userGender }}</p>
        </div>
      </template>
      <div class="white-rectangle-activity-list">
        <p>{{ activity.date }}</p>
      </div>
      <!-- check how -->
      <div class="white-rectangle-activity-list">
        <p>{{ activity.time }}</p>
      </div>
      <!-- check how -->
      <div class="white-rectangle-activity-list">
        <p>{{ activity.activity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityList",
  props: {
    activities: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
/* Center rectangle */
.center-rectangle {
  background: linear-gradient(var(--background-color), var(--styling-color));
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
body {
  background-color: var(--background-color);
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
  background-color: var(--button-color);
  color: var(--button-text-color);
  border: 2px solid var(--border-color);
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: bold;
}

.activity-liste-btn {
  color: var(--button-text-color);
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
}
/* Style for activity item*/
.activity-wrapper {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding-top: 40px;
}
.activity-item {
  border: 2px solid var(--background-color);
  border-radius: 10px;
  padding: 20px;
  background-color: var(--second-backround-color);
  font-size: 16px;
  color: #666;
  box-sizing: border-box;
  flex-basis: calc(20% - 20px);
  max-width: 300px;
  text-align: center;
}
.white-rectangle-activity-list {
  background-color: var(--styling-color);
  color: brown;
  border-radius: 2px;
  margin: 2px;
}
.list-container {
  color: blue;
  text-decoration-line: underline;
}
.list-container:hover {
  cursor: pointer;
  background-color: var(--button-hover-color);
  transition: background-color 0.2s ease;
}
</style>
