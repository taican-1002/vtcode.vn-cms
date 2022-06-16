<template>
  <ButtonAdd @click="handleToggleModal" />

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add User</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Username <span style="color: #ff0000">*</span></label
        >
        <input type="text" class="form-control user-username" required />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Password <span style="color: #ff0000">*</span></label
        >
        <input type="password" class="form-control user-password" required />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >FullName <span style="color: #ff0000">*</span></label
        >
        <input type="text" class="form-control user-fullname" required />
      </div>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="onSubmit">
        ADD
      </button></template
    >
  </modal>
</template>

<script>
import ButtonAdd from "@/views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";
export default {
  name: "AddUser",
  components: { ButtonAdd, modal: Modal },

  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    onSubmit() {
      const userName = document.querySelector(".user-username");
      const userPass = document.querySelector(".user-password");
      const userFullName = document.querySelector(".user-fullname");
      var data = {
        username: userName.value,
        password: userPass.value,
        fullname: userFullName.value,
      };

      //create blog
      baseReq
        .post("users", data)
        .then((response) => {
          this.toast.success(`${response.data.message}`);
          this.showModal = false;
        })
        .catch((error) => {
          this.toast.error(`${error.response.data.message}`);
        });
    },
    handleToggleModal() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped></style>
