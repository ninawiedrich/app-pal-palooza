<template>
  <div class="activity-list activity-wrapper">
    <div
      v-for="activity in activities"
      :key="activity.id"
      class="activity-item"
    >
      <div class="cyan-rectangle-activity-list">
        <p>{{ activity.location }}</p>
      </div>
      <template v-if="activity.user">
        <div class="cyan-rectangle-activity-list">
          <p>{{ activity.user.username }}</p>
        </div>
        <div class="cyan-rectangle-activity-list">
          <p>{{ activity.user.userAge }}</p>
        </div>
        <div class="cyan-rectangle-activity-list">
          <p>{{ activity.user.userGender }}</p>
        </div>
      </template>
      <div class="cyan-rectangle-activity-list">
        <p>{{ activity.date }}</p>
      </div>
      <!-- check how -->
      <div class="cyan-rectangle-activity-list">
        <p>{{ activity.time }}</p>
      </div>
      <!-- check how -->
      <div class="cyan-rectangle-activity-list">
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
body {
  background-color: #5bc0de;
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
