<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Delete Blog</h5>
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
      <div class="mb-3">Bạn có chắc muốn xóa Blog này ?</div></template
    >
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-add" @click="handleDeleteBlog">
        DELETE
      </button></template
    >
  </modalSmall>
</template>

<script>
import ButtonDelete from "@//views/components/common/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../components/common/ModalSmall.vue";
import baseReq from "../../../../../api/baseReq";
import { useToast } from "vue-toastification";

export default {
  name: "DeleteBlog",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      deleteBlog: this.blog,
      showModal: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: ["blog", "getAllBlog"],
  methods: {
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteBlog() {
      //delete blog
      baseReq
        .delete(`blogs/${this.deleteBlog.id}`)
        .then((response) => {
          this.getAllBlog();
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
</style>
