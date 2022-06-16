<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit Category</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="this.showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Page <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select edit-category"
          id="validationDefault04"
          required
          v-model="editCategory.page_id"
        >
          <option selected disabled value="">Select Page</option>
          <option v-for="item in pageId" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
      <!--Title-->
      <h4>Title</h4>
      <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-title-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-title"
            type="button"
            role="tab"
            aria-controls="pills-title"
            aria-selected="true"
          >
            Title
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-title_en-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-title_en"
            type="button"
            role="tab"
            aria-controls="pills-title_en"
            aria-selected="false"
          >
            Title En
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-title"
          role="tabpanel"
          aria-labelledby="pills-title-tab"
        >
          <div class="mb-3">
            <label class="form-label"
              >Title <span style="color: #ff0000">*</span></label
            >
            <input
              type="text"
              class="form-control category-title"
              required
              v-model="editCategory.title"
            />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-title_en"
          role="tabpanel"
          aria-labelledby="pills-title_en-tab"
        >
          <div class="mb-3">
            <label class="form-label">Title En </label>
            <input
              type="text"
              class="form-control category-title_en"
              v-model="editCategory.title_en"
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
          <div class="mb-3">
            <label class="form-label"
              >Description <span style="color: #ff0000">*</span></label
            >
            <input
              type="text"
              class="form-control category-des"
              v-model="editCategory.description"
            />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-description_en"
          role="tabpanel"
          aria-labelledby="pills-description_en-tab"
        >
          <div class="mb-3">
            <label class="form-label">Description En </label>
            <input
              type="text"
              class="form-control category-des_en"
              v-model="editCategory.description_en"
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
import ButtonEdit from "@//views/components/common/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";

export default {
  name: "EditCategory",
  components: {
    ButtonEdit,
    modal: Modal,
  },
  data() {
    return {
      categoryId: this.category,
      editCategory: {},
      showModal: false,
      pageId: [],
    };
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  props: ["category", "getAllCategory"],
  methods: {
    handleEdit() {
      //get all pages
      baseReq
        .get("pages")
        .then((response) => {
          this.pageId = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      //get all category by id
      baseReq
        .get(`categories/${this.categoryId.id}`)
        .then((response) => {
          this.editCategory = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.showModal = true;
    },
    onSubmit() {
      const categoryTitle = document.querySelector(".category-title");
      const categoryDes = document.querySelector(".category-des");
      const categoryTitleEn = document.querySelector(".category-title_en");
      const categoryDesEn = document.querySelector(".category-des_en");
      const categorySelect = document.querySelector(".edit-category");

      var data = {
        page_id: categorySelect.value,
        title: categoryTitle.value,
        description: categoryDes.value,
        title_en: categoryTitleEn.value,
        description_en: categoryDesEn.value,
      };

      if (
        categorySelect.value.trim() &&
        categoryTitle.value.trim() &&
        categoryDes.value.trim()
      ) {
        if (
          (categoryTitle.value.length <= 100 &&
            categoryTitle.value.trim() &&
            categoryTitleEn.value.length <= 100) ||
          (categoryTitleEn.value.length <= 100 && categoryTitleEn.value.trim())
        ) {
          if (
            (categoryDes.value.length <= 500 &&
              categoryDes.value.trim() &&
              categoryDesEn.value.length <= 500) ||
            (categoryDesEn.value.length <= 500 && categoryDesEn.value.trim())
          ) {
            //edit category
            baseReq
              .put(`categories/${this.categoryId.id}`, data)
              .then((response) => {
                this.toast.success(`${response.data.message}`);
                this.getAllCategory();
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
            "The title field can't be empty or exceed 100 characters"
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
.mr-2 {
  margin-right: 1rem;
}
</style>
