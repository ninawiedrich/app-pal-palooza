<template>
  <div v-for="activity in activities" :key="activity.id" class="activity-item">
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
