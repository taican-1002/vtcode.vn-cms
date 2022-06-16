<template>
  <ButtonAdd @click="handleAdd" />

  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Add Employees</h5>
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
      <div class="mb-3">
        <label class="form-label">Page </label>
        <input
          type="text"
          class="form-control"
          disabled
          required
          value="Đội ngũ"
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Category <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select employees-categoryId"
          id="validationDefault04"
          required
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
          <img :src="previewImage" class="add-employees__img" />
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
        <input type="text" class="form-control employees-name" required />
      </div>
      <!-- <div class="mb-3 text-left">
        <label class="form-label">Name En</label>
        <input
          type="text"
          class="form-control employees-name_en"
          required
          disabled
        />
      </div> -->
      <!--Description-->
      <h4>Description</h4>
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
            <input type="text" class="form-control employees-des" />
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
            <input type="text" class="form-control employees-des_en" />
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
          >Postion <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select employees-position"
          id="validationDefault04"
          required
          @change="(e) => this.tranPositionToNumber(e.target.value)"
        >
          <option selected disabled value="">Select position</option>
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
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-add" @click="onSubmit">ADD</button>
    </template>
  </modal>
</template>

<script>
import ButtonAdd from "@/views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";
import noAvatar from "../../../../../assets/img/no-avatar.png";

export default {
  name: "add-employees",
  components: {
    ButtonAdd,
    modal: Modal,
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      showModal: false,
      previewImage: noAvatar,

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
      tranLvToNum: "",
      tranPositionToNum: "",
      blogPageId: "",
      pageId: [],
    };
  },
  props: ["getAllEmployees"],
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
    handleAdd() {
      this.showModal = true;
      // get all page id
      baseReq
        .get("pages?pageSize=100")
        .then((response) => {
          this.pageId = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      //get all categories id
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
      this.tranLevelToNum(this.tranLvToNum);
      this.tranPositionToNumber(this.tranPositionToNum);
    },
    handleClose() {
      this.showModal = false;
      this.previewImage = noAvatar;

      this.tranLvToNum = "";
      this.tranPositionToNum = "";
    },
    onSubmit() {
      const employeesImg = document.querySelector("#file-input");

      const employeesCategoryId = document.querySelector(
        ".employees-categoryId"
      );
      const employeesName = document.querySelector(".employees-name");
      const employeesDes = document.querySelector(".employees-des");
      const employeesDesEn = document.querySelector(".employees-des_en");
      var data = new FormData();
      data.append("image", employeesImg.files[0]);
      data.append("name", employeesName.value);
      data.append("level", String(this.tranLvToNum));
      data.append("position", String(this.tranPositionToNum));
      data.append("category_id", employeesCategoryId.value);
      data.append("description", employeesDes.value);
      data.append("description_en", employeesDesEn.value);
      console.log(employeesImg.files[0]);
      if (
        this.previewImage != "" &&
        employeesName.value.trim() &&
        String(this.tranLvToNum) != "" &&
        String(this.tranPositionToNum) != "" &&
        employeesCategoryId.value != ""
      ) {
        if (this.previewImage != noAvatar) {
          if (employeesName.value.length <= 255) {
            if (
              employeesDes.value.length <= 500 &&
              employeesDesEn.value.length <= 500
            ) {
              //create employee
              baseReq
                .post("employees", data)
                .then(() => {
                  this.getAllEmployees();
                  this.toast.success("Success");
                  this.previewImage = noAvatar;
                  employeesName.value = "";
                  employeesDes.value = "";
                  employeesDesEn.value = "";
                  this.tranLvToNum = "";
                  this.tranPositionToNum = "";
                  employeesCategoryId.value = "";
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
.add-employees__img {
  width: 20rem;
  height: 20rem;
  border-radius: 100%;
  display: flex;
  margin: auto;
  object-fit: cover;
}
@media only screen and (max-width: 600px) {
  .add-employees__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
