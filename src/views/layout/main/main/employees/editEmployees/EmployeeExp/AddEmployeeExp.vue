<template>
  <ButtonAdd @click="handleToggleModal" />

  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Add EmployeeExp</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleClose"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Start At <span style="color: #ff0000">*</span></label
        >
        <flat-pickr
          v-model="start_at"
          :config="config"
          placeholder="Select active date"
          class="form-control"
        ></flat-pickr>
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >End At <span style="color: #ff0000">*</span></label
        >
        <flat-pickr
          v-model="end_at"
          :config="config"
          placeholder="Select deactive date"
          class="form-control"
        ></flat-pickr>
      </div>

      <!--Name-->
      <h4>Name</h4>
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
          <div class="mb-3">
            <label class="form-label"
              >Name <span style="color: #ff0000">*</span></label
            >
            <input type="text" class="form-control employeeExp-name" required />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-name_en"
          role="tabpanel"
          aria-labelledby="pills-name_en-tab"
        >
          <div class="mb-3">
            <label class="form-label">Name En </label>
            <input
              type="text"
              class="form-control employeeExp-name_en"
              required
            />
          </div>
        </div>
      </div>

      <!--Description-->
      <h4>Description</h4>
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
          <div class="mb-3">
            <label class="form-label"
              >Description <span style="color: #ff0000">*</span></label
            >
            <input type="text" class="form-control employeeExp-des" required />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-description_exp_en"
          role="tabpanel"
          aria-labelledby="pills-description_exp_en-tab"
        >
          <div class="mb-3">
            <label class="form-label">Description En </label>
            <input
              type="text"
              class="form-control employeeExp-des_en"
              required
            />
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-close" @click="handleClose">
        Close
      </button>
      <button type="button" class="btn btn-add" @click="onSubmit">
        ADD
      </button></template
    >
  </modal>
</template>

<script>
import ButtonAdd from "@/views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../../../components/common/Modal.vue";
import baseReq from "../../../../../../../api/baseReq";
import flatPickr from "vue-flatpickr-component";
//check active_date < deactive_date
const validActiveTime = (start, end) => {
  return new Date(start) >= new Date(end);
};

//check end_at < now date
const isDate = (isDate) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (isDate.match(regex) === null) {
    return false;
  }

  const date = new Date(isDate);

  const timestamp = date.getTime();

  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(isDate);
};
const now = new Date();

export default {
  name: "AddEmployeeExp",
  components: { ButtonAdd, modal: Modal, flatPickr },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      employeeId: [],
      start_at: null,
      end_at: null,
      config: {
        altFormat: "d/m/Y",
        altInput: true,
      },
    };
  },
  props: ["addEmployeeExp", "employeeExpId", "getEmployeeById"],
  methods: {
    handleClose() {
      this.start_at = null;
      this.end_at = null;
      this.showModal = false;
    },
    onSubmit() {
      const employeeExpName = document.querySelector(".employeeExp-name");
      const employeeExpNameEn = document.querySelector(".employeeExp-name_en");
      const employeeExpDes = document.querySelector(".employeeExp-des");
      const employeeExpDesEn = document.querySelector(".employeeExp-des_en");
      var data = {
        employee_id: this.employeeExpId,
        start_at: this.start_at,
        end_at: this.end_at,
        name: employeeExpName.value,
        name_en: employeeExpNameEn.value,
        description: employeeExpDes.value,
        description_en: employeeExpDesEn.value,
      };

      if (
        this.start_at.trim() &&
        this.end_at.trim() &&
        employeeExpName.value.trim() &&
        employeeExpName.value.trim()
      ) {
        if (
          !isDate(this.start_at) ||
          !isDate(this.end_at) ||
          validActiveTime(this.start_at, this.end_at) ||
          now < new Date(this.end_at)
        ) {
          this.toast.error(
            "The end_at field must be greater than start_at and less than the current date"
          );
        } else {
          //create employeeExp exp
          if (
            employeeExpName.value.length <= 200 ||
            (employeeExpNameEn.value.trim() &&
              employeeExpNameEn.value.length <= 200)
          ) {
            if (
              employeeExpDes.value.length <= 500 ||
              (employeeExpDesEn.value.trim() &&
                employeeExpDesEn.value.length <= 200)
            ) {
              baseReq
                .post("employee-experiences", data)
                .then(() => {
                  this.toast.success("Success");
                  this.getEmployeeById();
                  this.showModal = false;
                  this.start_at = null;
                  this.end_at = null;
                  employeeExpName.value = "";
                  employeeExpNameEn.value = "";
                  employeeExpDes.value = "";
                  employeeExpDesEn.value = "";
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
        }
      } else {
        this.toast.error("All required fields can't empty");
      }
    },
    handleToggleModal() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped></style>
