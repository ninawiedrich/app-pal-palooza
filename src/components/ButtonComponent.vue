<template>
  <button
    type="button"
    class="add-activity-btn add-activity-btn-container"
    data-bs-toggle="modal"
    data-bs-target="#modalComponent"
  >
    {{ btnName }}
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    btnName: String,
  },
};
</script>

<style>
.btn_close {
  cursor: pointer;
}
/* Style for add activity button */
.add-activity-btn {
  background-color: var(--button-color);
  color: var(--second-backround-color);
  border: 2px solid var(--border-color);
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: bold;
}

.add-activity-btn:hover {
  cursor: pointer;
  background-color: var(--button-hover-color);
}
.add-activity-btn-container {
  /*position: absolute;*/
  top: 30px;
  right: 40px;
}
/* Style for modal button */
.modal-style .btn-primary {
  background-color: var(--background-color);
  color: var(--second-backround-color);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
}

.modal-style .btn-primary:hover {
  cursor: pointer;
  background-color: var(--background-color);
}

.modal-style .btn_close {
  background-color: var(--button-color);
  border: 2px solid var(--border-color);
}

.modal-style .btn_close:hover {
  background-color: var(--button-hover-color);
}
</style>
