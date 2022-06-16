<template>
  <ButtonEdit @click="handleEdit" />

  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Edit EmployeeProject</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <!--Name-->
      <h4 class="text-left">Name</h4>
      <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-name-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-name"
            type="button"
            role="tab"
            aria-controls="pills-name"
            aria-selected="true"
          >
            Name
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-name_en-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-name_en"
            type="button"
            role="tab"
            aria-controls="pills-name_en"
            aria-selected="false"
          >
            Name En
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-name"
          role="tabpanel"
          aria-labelledby="pills-name-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label"
              >Name <span style="color: #ff0000">*</span></label
            >
            <input
              type="text"
              class="form-control employeeProject-name"
              required
              v-model="editEmployeeProject.name"
            />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-name_en"
          role="tabpanel"
          aria-labelledby="pills-name_en-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label">Name En </label>
            <input
              type="text"
              class="form-control employeeProject-name_en"
              required
              v-model="editEmployeeProject.name_en"
            />
          </div>
        </div>
      </div>

      <!--Description-->
      <h4 class="text-left">Description</h4>
      <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-description_exp-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-description_exp"
            type="button"
            role="tab"
            aria-controls="pills-description_exp"
            aria-selected="true"
          >
            Description
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-description_exp_en-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-description_exp_en"
            type="button"
            role="tab"
            aria-controls="pills-description_exp_en"
            aria-selected="false"
          >
            Description En
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-description_exp"
          role="tabpanel"
          aria-labelledby="pills-description_exp-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label"
              >Description <span style="color: #ff0000">*</span></label
            >
            <input
              type="text"
              class="form-control employeeProject-des"
              required
              v-model="editEmployeeProject.description"
            />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-description_exp_en"
          role="tabpanel"
          aria-labelledby="pills-description_exp_en-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label">Description En </label>
            <input
              type="text"
              class="form-control employeeProject-des_en"
              required
              v-model="editEmployeeProject.description_en"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-add" @click="onSubmit">
        SAVE CHANGE
      </button>
    </template>
  </modal>
</template>

<script>
import ButtonEdit from "@/views/components/common/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../../../components/common/Modal.vue";
import baseReq from "../../../../../../../api/baseReq";

export default {
  name: "edit-employeeProject",
  components: { ButtonEdit, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      showModal: false,
      editEmployeeProject: this.employeeEdit,
    };
  },
  props: ["employeeEdit", "getEmployeeById", "employeeProjectId"],
  methods: {
    handleEdit() {
      this.showModal = true;
    },

    onSubmit() {
      const employeeProjectName = document.querySelector(
        ".employeeProject-name"
      );
      const employeeProjectNameEn = document.querySelector(
        ".employeeProject-name_en"
      );
      const employeeProjectDes = document.querySelector(".employeeProject-des");
      const employeeProjectDesEn = document.querySelector(
        ".employeeProject-des_en"
      );
      var data = {
        employee_id: this.employeeProjectId,
        name: employeeProjectName.value,
        name_en: employeeProjectNameEn.value,
        description: employeeProjectDes.value,
        description_en: employeeProjectDesEn.value,
      };

      if (employeeProjectName.value.trim() && employeeProjectDes.value.trim()) {
        if (
          employeeProjectName.value.length <= 200 ||
          (employeeProjectNameEn.value.trim() &&
            employeeProjectNameEn.value.length <= 200)
        ) {
          if (
            employeeProjectDes.value.length <= 500 ||
            (employeeProjectDesEn.value.trim() &&
              employeeProjectDesEn.value.length <= 200)
          ) {
            //edit employeePro
            baseReq
              .put(`employee-projects/${this.employeeEdit.id}`, data)
              .then((response) => {
                this.getEmployeeById();
                this.toast.success(`${response.data.message}`);
                this.showModal = false;
              })
              .catch((error) => {
                this.toast.error(`${error.response.data.message}`);
              });
          } else {
            this.toast.error(
              "The description field can't be empty or exceed 500 characters"
            );
          }
        } else {
          this.toast.error(
            "The name field can't be empty or exceed 200 characters"
          );
        }
      } else {
        this.toast.error("All required fields can't empty");
      }
    },
  },
};
</script>

<style scoped>
.text-left {
  text-align: left !important;
}
.mr-2 {
  margin-right: 1rem;
}
</style>
