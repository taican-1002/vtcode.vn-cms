<template>
  <ButtonEdit @click="handleEdit" />

  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Edit Employees</h5>
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
      <div class="mb-3 text-left">
        <label class="form-label"
          >Category <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select employees-categoryId"
          id="validationDefault04"
          required
          v-model="editEmployees.category_id"
        >
          <option selected disabled value="">Select Category</option>
          <option v-for="item in categoryId" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Image <span style="color: #ff0000">*</span></label
        >
        <div class="mb-3 text-left">
          <div
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Image Preview
          </div>
          <img :src="previewImage" class="edit-employees__img" />
        </div>
        <input
          type="file"
          class="form-control"
          accept="image/*"
          @change="uploadImage"
          id="file-input"
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control employees-name"
          v-model="editEmployees.name"
          required
        />
      </div>
      <!-- <div class="mb-3 text-left">
        <label class="form-label">Name En</label>
        <input
          type="text"
          class="form-control employees-name_en"
          v-model="editEmployees.name_en"
          required
          disabled
        />
      </div> -->
      <!--Description-->
      <h4 class="text-left">Description</h4>
      <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-description-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-description"
            type="button"
            role="tab"
            aria-controls="pills-description"
            aria-selected="true"
          >
            Description
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-description_en-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-description_en"
            type="button"
            role="tab"
            aria-controls="pills-description_en"
            aria-selected="false"
          >
            Description En
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-description"
          role="tabpanel"
          aria-labelledby="pills-description-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label">Description</label>
            <input
              type="text"
              class="form-control employees-des"
              v-model="editEmployees.description"
              required
            />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-description_en"
          role="tabpanel"
          aria-labelledby="pills-description_en-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label">Description En</label>
            <input
              type="text"
              class="form-control employees-des_en"
              v-model="editEmployees.description_en"
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-3 text-left">
        <label class="form-label"
          >Level <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select employees-level"
          id="validationDefault04"
          required
          v-model="editEmployees.level"
          @change="(e) => this.tranLevelToNum(e.target.value)"
        >
          <option selected disabled value="">Select Level</option>
          <option
            v-for="item in level"
            :key="item.id"
            :value="item.title"
            :name="item.id"
          >
            {{ item.title }}
          </option>
        </select>
      </div>

      <div class="mb-3 text-left">
        <label class="form-label"
          >Position <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select employees-position"
          id="validationDefault04"
          required
          v-model="editEmployees.position"
          @change="(e) => this.tranPositionToNumber(e.target.value)"
        >
          <option selected disabled value="">Select Postion</option>
          <option
            v-for="item in position"
            :key="item.id"
            :value="item.title"
            :name="item.id"
          >
            {{ item.title }}
          </option>
        </select>
      </div>
      <EmployeeExp
        :editEmployees="this.editEmployees"
        :getEmployeeById="this.getEmployeeById"
      />
      <EmployeeProject
        :editEmployees="this.editEmployees"
        :getEmployeeById="this.getEmployeeById"
      />
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
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";
import EmployeeExp from "./editEmployees/EmployeeExp/EmployeeExp.vue";
import EmployeeProject from "./editEmployees/EmployeeProject/EmployeeProject.vue";

export default {
  name: "edit-employees",
  components: { ButtonEdit, modal: Modal, EmployeeExp, EmployeeProject },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      showModal: false,
      previewImage: "",
      editEmployees: [],
      categoryId: [],
      level: [
        {
          id: "0",
          title: "Intern",
        },
        {
          id: "1",
          title: "Junior",
        },
        {
          id: "2",
          title: "Senior",
        },
        {
          id: "3",
          title: "Leader",
        },
        {
          id: "4",
          title: "Boss",
        },
      ],
      position: [
        {
          id: 0,
          title: "Lập Trình Viên (Front-End)",
        },
        {
          id: 1,
          title: "Lập Trình Viên (Back-End)",
        },
        {
          id: 2,
          title: "Lập Trình Viên (Full-Stack)",
        },
        {
          id: 3,
          title: "Chuyên Viên Phân Tích",
        },
        {
          id: 4,
          title: "Chuyên Viên Kiểm Thử",
        },
        {
          id: 5,
          title: "Quản Trị Nhân Sự",
        },
        {
          id: 6,
          title: "Kỹ Sư Dữ Liệu",
        },
        {
          id: 7,
          title: "Thiết Kế Đồ Họa",
        },
        {
          id: 8,
          title: "Phó Giám Đốc",
        },
        {
          id: 9,
          title: "Giám Đốc",
        },
      ],
      tranLvToNum: this.employeeLevel,
      tranPositionToNum: this.employeePosition,
    };
  },
  props: ["employee", "employeeLevel", "employeePosition", "getAllEmployees"],
  mounted() {
    this.getAllCategoryById();
    this.tranLevelToNum(this.tranLvToNum);
    this.tranPositionToNumber(this.tranPositionToNum);
  },
  methods: {
    tranLevelToNum(item) {
      switch (item) {
        case "Intern":
          return (this.tranLvToNum = 0);
        case "Junior":
          return (this.tranLvToNum = 1);
        case "Senior":
          return (this.tranLvToNum = 2);
        case "Leader":
          return (this.tranLvToNum = 3);
        case "Boss":
          return (this.tranLvToNum = 4);
        default:
          return this.employeeLevel;
      }
    },
    tranPositionToNumber(item) {
      switch (item) {
        case "Lập Trình Viên (Front-End)":
          return (this.tranPositionToNum = 0);
        case "Lập Trình Viên (Back-End)":
          return (this.tranPositionToNum = 1);
        case "Lập Trình Viên (Full-Stack)":
          return (this.tranPositionToNum = 2);
        case "Chuyên Viên Phân Tích":
          return (this.tranPositionToNum = 3);
        case "Chuyên Viên Kiểm Thử":
          return (this.tranPositionToNum = 4);
        case "Quản Trị Nhân Sự":
          return (this.tranPositionToNum = 5);
        case "Kỹ Sư Dữ Liệu":
          return (this.tranPositionToNum = 6);
        case "Thiết Kế Đồ Họa":
          return (this.tranPositionToNum = 7);
        case "Phó Giám Đốc":
          return (this.tranPositionToNum = 8);
        case "Giám Đốc":
          return (this.tranPositionToNum = 9);
        default:
          return this.employeePosition;
      }
    },

    handleEdit() {
      this.showModal = true;
      this.getEmployeeById();
    },
    //get all categories id
    getAllCategoryById() {
      baseReq
        .get(
          "categories/page/9235f39f-a5b0-4530-8678-9ac0c057b991?pageSize=100&sort=0"
        )
        .then((response) => {
          this.categoryId = response.data.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //get employee by id
    getEmployeeById() {
      baseReq
        .get(`employees/admin/${this.employee}`)
        .then((response) => {
          this.editEmployees = response.data.data;

          this.previewImage = this.editEmployees.image;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onSubmit() {
      const employeesImg = document.querySelector("#file-input");

      var data = new FormData();
      data.append("image", employeesImg.files[0]);
      data.append("name", this.editEmployees.name);
      data.append("category_id", this.editEmployees.category_id);
      data.append("description", this.editEmployees.description);
      data.append("description_en", this.editEmployees.description_en);
      data.append("level", this.tranLvToNum);
      data.append("position", this.tranPositionToNum);
      if (
        this.previewImage != "" &&
        this.editEmployees.name.trim() &&
        this.editEmployees.level != "" &&
        this.editEmployees.position != "" &&
        this.editEmployees.category_id != ""
      ) {
        if (this.previewImage != "") {
          if (this.editEmployees.name.length <= 255) {
            if (
              this.editEmployees.description.length <= 500 ||
              this.editEmployees.description_en.length <= 500
            ) {
              //edit employee
              baseReq
                .put(`employees/${this.employee}`, data)
                .then((response) => {
                  this.getAllEmployees();
                  this.toast.success(`${response.data.message}`);
                  this.showModal = false;
                })
                .catch((error) => {
                  this.toast.error(`${error.response.data.message}`);
                });
            } else {
              this.toast.error(
                "The description field can't enter spaces and exceed 500 characters"
              );
            }
          } else {
            this.toast.error(
              "The name field can't be empty or exceed 255 characters"
            );
          }
        } else {
          this.toast.error("The image field can't be empty");
        }
      } else {
        this.toast.error("All required fields can't empty");
      }
    },
    /**Handle upload avatar */
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
.text-left {
  text-align: left !important;
}
.mr-2 {
  margin-right: 1rem;
}
.edit-employees__img {
  width: 20rem;
  height: 20rem;
  border-radius: 100%;
  display: flex;
  margin: auto;
  object-fit: cover;
}
@media only screen and (max-width: 600px) {
  .edit-employees__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
