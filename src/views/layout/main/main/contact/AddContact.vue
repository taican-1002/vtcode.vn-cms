<template>
  <ButtonAdd @click="handleToggleModal" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Contact</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleChange"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >FullName <span style="color: #ff0000">*</span>
        </label>
        <input type="text" class="form-control contact-fullname" required />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Phone <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          id="contact-phone"
          class="form-control contact-phone"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Email <span style="color: #ff0000">*</span></label
        >
        <input type="text" class="form-control contact-email" required />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Note <span style="color: #ff0000">*</span></label
        >
        <input type="text" class="form-control contact-note" required />
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
      </button>
    </template>
  </modal>
</template>

<script>
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";

export default {
  name: "AddStaff",
  components: { ButtonAdd, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  props: ["getAllContact"],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    onSubmit() {
      const fullName = document.querySelector(".contact-fullname");
      const phone = document.querySelector(".contact-phone");
      const email = document.querySelector(".contact-email");
      const note = document.querySelector(".contact-note");
      var data = {
        fullname: fullName.value,
        phone: phone.value,
        email: email.value,
        note: note.value,
      };
      //create Category
      baseReq
        .post("contacts", data)
        .then((response) => {
          console.log(response);
          this.toast.success("Add infomation success!");
          this.getAllContact();
          this.showModal = false;
        })
        .catch((error) => {
          this.toast.error("Add information failed");
          console.log(error);
        });
    },
    handleToggleModal() {
      this.showModal = true;
    },
    handleChange() {
      this.showModal = false;
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
  },
};
</script>

<style scoped>
.modal-wrap {
  position: absolute;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  /* height: 80vh; */
  overflow-y: auto;
}
</style>
