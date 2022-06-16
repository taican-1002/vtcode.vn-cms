<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Delete Category</h5>
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
      <div class="mb-3">Bạn có chắc muốn xóa Category này ?</div></template
    >
    <template v-slot:footer
      ><button type="button" class="btn btn-close" @click="showModal = false">
        Close
      </button>
      <button type="button" class="btn btn-add" @click="handleDeleteCategory">
        DELETE
      </button>
    </template>
  </modalSmall>
</template>

<script>
import ButtonDelete from "@//views/components/common/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../components/common/ModalSmall.vue";
import { useToast } from "vue-toastification";
import baseReq from "../../../../../api/baseReq";
export default {
  name: "DeleteCategory",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      showModal: false,
      deleteCategory: this.category,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: ["category", "getCategory"],
  methods: {
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteCategory() {
      //delete Category
      baseReq
        .delete(`categories/${this.deleteCategory.id}`)
        .then((response) => {
          this.getCategory();
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
