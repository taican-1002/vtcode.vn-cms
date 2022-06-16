<template>
  <ButtonAdd @click="handleToggleModal" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Category</h5>
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
          >Page <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select category-pageId"
          id="validationDefault04"
          required
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
            <input type="text" class="form-control category-title" required />
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
            <input type="text" class="form-control category-title_en" />
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
            <input type="text" class="form-control category-des" />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-description_en"
          role="tabpanel"
          aria-labelledby="pills-description_en-tab"
        >
          <div class="mb-3">
            <label class="form-label">Description En</label>
            <input type="text" class="form-control category-des_en" />
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-close" @click="showModal = false">
        Close
      </button>
      <button type="button" class="btn btn-add" @click="onSubmit">ADD</button>
    </template>
  </modal>
</template>

<script>
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";

export default {
  name: "AddCategory",
  components: { ButtonAdd, modal: Modal },
  data() {
    return {
      showModal: false,
      pageId: [],
    };
  },
  props: ["getCategory"],
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    onSubmit() {
      const pageId = document.querySelector(".category-pageId");
      const title = document.querySelector(".category-title");
      const titleEn = document.querySelector(".category-title_en");
      const des = document.querySelector(".category-des");
      const desEn = document.querySelector(".category-des_en");
      var data = {
        page_id: pageId.value,
        title: title.value,
        title_en: titleEn.value,
        description: des.value,
        description_en: desEn.value,
      };

      if (pageId.value.trim() && title.value.trim() && des.value.trim()) {
        if (
          (title.value.length <= 100 &&
            title.value.trim() &&
            titleEn.value.length <= 100) ||
          (titleEn.value.length <= 100 && titleEn.value.trim())
        ) {
          if (
            (des.value.length <= 500 &&
              des.value.trim() &&
              desEn.value.length <= 500) ||
            (desEn.value.length <= 500 && desEn.value.trim())
          ) {
            //create Category
            baseReq
              .post("categories", data)
              .then(() => {
                this.toast.success("Success");
                this.getCategory();
                this.showModal = false;
                pageId.value = "";
                title.value = "";
                titleEn.value = "";
                des.value = "";
                desEn.value = "";
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
    handleToggleModal() {
      this.showModal = true;
      //get all pages
      baseReq
        .get("pages")
        .then((response) => {
          this.pageId = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleChange() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped></style>
