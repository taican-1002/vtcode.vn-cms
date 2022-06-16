<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Delete EmployeeProject</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body
      ><div class="mb-3">Bạn có chắc muốn xóa EmployeeProject này ?</div>
    </template>
    <template v-slot:footer
      ><button type="button" class="btn btn-close" @click="showModal = false">
        Close
      </button>
      <button type="button" class="btn btn-add" @click="onSubmit">
        DELETE
      </button>
    </template>
  </modalSmall>
</template>

<script>
import ButtonDelete from "@/views/components/common/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../../../components/common/ModalSmall.vue";
import { useToast } from "vue-toastification";
import baseReq from "../../../../../../../api/baseReq";
export default {
  name: "DeleteEmployee",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      showModal: false,
      employeeProId: this.employeeProjectId,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: ["getEmployeeById", "employeeProjectId"],
  methods: {
    handleDelete() {
      this.showModal = true;
    },
    onSubmit() {
      baseReq
        .delete(`employee-projects/${this.employeeProId}`)
        .then((response) => {
          this.getEmployeeById();
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
