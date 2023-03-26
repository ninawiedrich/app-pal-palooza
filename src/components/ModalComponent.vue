<template>
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
          <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body"><slot></slot></div>
        <div class="modal-footer"><slot name="footer"></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    title: String,
  },
  data() {
    return {};
  },
};
</script>

<style>
.modal-style .modal-content {
  background-color: white;
  border-radius: 10px;
}

.modal-style .modal-header {
  background-color: #5bc0de;
  color: yellow;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-style .modal-body {
  padding: 20px;
}

.modal-style .form-control {
  border-radius: 5px;
  border: 2px solid #31b0d5;
  background-color: yellow;
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

.modal-style .btn-primary {
  background-color: #5bc0de;
  color: yellow;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
}

.modal-style .btn-primary:hover {
  cursor: pointer;
  background-color: #31b0d5;
}

.modal-style .btn_close {
  background-color: #a75f4a;
  border: 2px solid #ff9900;
}

.modal-style .btn_close:hover {
  background-color: #ace0ef;
}
</style>
