<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Delete Banner</h5>
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
      <div class="mb-3">Bạn có chắc muốn xóa banner này ?</div></template
    >
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-add" @click="handleDeleteUser">
        DELETE
      </button></template
    >
  </modalSmall>
</template>

<script>
import ButtonDelete from "@/views/components/common/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../components/common/ModalSmall.vue";
import baseReq from "../../../../../api/baseReq";
import { useToast } from "vue-toastification";

export default {
  name: "DeleteUser",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      showModal: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: ["banner", "getAllBanner"],
  methods: {
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteUser() {
      baseReq
        .delete(`banners/${this.banner.id}`)
        .then((response) => {
          this.getAllBanner();
          this.toast.success(`${response.data.message}`);
          this.showModal = false;
        })
        .catch((error) => {
          this.toast.error(`${error.response.data.message}`);
        });
    },
  },
};
</script>

<style scoped></style>
