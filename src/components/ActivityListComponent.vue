<template>
  <div v-for="activity in filteredActivities" :key="activity.id">
    {{ activity.user.username }}<br />
    {{ activity.user.userAge }} <br />
    {{ activity.user.userGender }} <br />
    {{ activity.location }} <br />
    {{ activity.date }} <br />
    {{ activity.time }} <br />
    {{ activity.activity }}
  </div>
  <div
    v-for="activity in userActivities"
    :key="activity.id"
    class="activity-item"
  >
    <div class="cyan-rectangle-activity-list">
      <p>{{ activity.location }}</p>
    </div>

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
</template>

<script>
export default {
  name: "activityList",
  data() {
    return {};
  },
};
</script>
