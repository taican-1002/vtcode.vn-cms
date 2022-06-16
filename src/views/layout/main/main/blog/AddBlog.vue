<template>
  <ButtonAdd @click="handleOpenModal" />
  <!-- Modal -->
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Blog</h5>
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
        <label class="form-label"
          >Page <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select blog-pageId"
          id="validationDefault04"
          required
          v-model="blogPageId"
          @change="handleGetCategory"
        >
          <option selected disabled value="">Select Page</option>
          <option v-for="item in pageId" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Category <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select blog-categoryId"
          id="validationDefault04"
          required
        >
          <option selected disabled value="">Select Category</option>
          <option v-for="item in categoryId" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label"
          >Image <span style="color: #ff0000">*</span></label
        >
        <div class="mb-3">
          <div
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Image Preview
          </div>
          <img :src="previewImage" class="add-blog__img" />
        </div>
        <input
          type="file"
          class="form-control"
          accept="image/*"
          @change="uploadImage"
          id="file-input"
        />
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
            <input type="text" class="form-control blog-title" required />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-title_en"
          role="tabpanel"
          aria-labelledby="pills-title_en-tab"
        >
          <div class="mb-3">
            <label class="form-label">Title En</label>
            <input type="text" class="form-control blog-title_en" required />
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
            <input type="text" class="form-control blog-des" />
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
            <input type="text" class="form-control blog-des_en" />
          </div>
        </div>
      </div>

      <!--Content-->
      <h4>Content</h4>
      <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-content-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-content"
            type="button"
            role="tab"
            aria-controls="pills-content"
            aria-selected="true"
          >
            Content
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-content_en-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-content_en"
            type="button"
            role="tab"
            aria-controls="pills-content_en"
            aria-selected="false"
          >
            Content En
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-content"
          role="tabpanel"
          aria-labelledby="pills-content-tab"
        >
          <div class="mb-3">
            <label class="form-label"
              >Content <span style="color: #ff0000">*</span></label
            >
            <CKEditor v-model:modelValue="ckeditor"></CKEditor>
            <!-- <Tinymce v-model="this.content" /> -->
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-content_en"
          role="tabpanel"
          aria-labelledby="pills-content_en-tab"
        >
          <div class="mb-3">
            <label class="form-label">Content En</label>
            <CKEditorEn v-model:modelValue="ckeditor_en"></CKEditorEn>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-close" @click="handleClose">
        Close
      </button>
      <button type="button" class="btn btn-add" @click="onSubmit">ADD</button>
    </template>
  </modal>
</template>

<script>
import noImage from "../../../../../assets/img/no-image.png";
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import baseReq from "../../../../../api/baseReq";
import CKEditor from "../CKEditor/CKEditor.vue";
import CKEditorEn from "../CKEditorEn/CKEditorEn.vue";
// import Tinymce from "../tinymce/Tinymce.vue";
import Modal from "../../../../components/common/Modal.vue";
export default {
  name: "add-blog",
  setup() {
    const toast = useToast();

    return {
      toast,
    };
  },
  props: ["getAllBlog"],

  data() {
    return {
      ckeditor: "",
      ckeditor_en: "",
      showModal: false,
      previewImage: noImage,
      categoryId: [],
      pageId: [],
      blogPageId: "",
    };
  },
  components: {
    ButtonAdd,
    CKEditor,
    CKEditorEn,
    modal: Modal,
    // Tinymce,
  },
  methods: {
    onSubmit() {
      const blogCategoryId = document.querySelector(".blog-categoryId");
      const blogImg = document.querySelector("#file-input");
      const blogTitle = document.querySelector(".blog-title");
      const blogTitleEn = document.querySelector(".blog-title_en");
      const blogDes = document.querySelector(".blog-des");
      const blogDesEn = document.querySelector(".blog-des_en");
      var data = new FormData();
      data.append("category_id", blogCategoryId.value);
      data.append("image", blogImg.files[0]);
      data.append("title", blogTitle.value);
      data.append("title_en", blogTitleEn.value);
      data.append("description", blogDes.value);
      data.append("description_en", blogDesEn.value);
      data.append("content", this.ckeditor);
      data.append("content_en", this.ckeditor_en);
      if (
        this.previewImage != "" &&
        blogTitle.value.trim() &&
        blogDes.value.trim() &&
        blogCategoryId.value != "" &&
        this.ckeditor != ""
      ) {
        if (this.previewImage != noImage) {
          if (
            (blogTitle.value.length <= 100 &&
              blogTitle.value.trim() &&
              blogTitleEn.value.length <= 100) ||
            (blogTitleEn.value.length <= 100 && blogTitleEn.value.trim())
          ) {
            if (
              (blogDes.value.length <= 500 &&
                blogDes.value.trim() &&
                blogDesEn.value.length <= 500) ||
              (blogDesEn.value.length <= 500 && blogDesEn.value.trim())
            ) {
              //create blog
              baseReq
                .post("blogs", data)
                .then(() => {
                  this.getAllBlog();
                  this.showModal = false;
                  this.previewImage = noImage;
                  blogTitle.value = "";
                  blogTitleEn.value = "";
                  this.ckeditor = "";
                  this.ckeditor_en = "";
                  blogDes.value = "";
                  blogDesEn.value = "";

                  this.toast.success("Success");
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
          this.toast.error("The image field can't be empty");
        }
      } else {
        this.toast.error("All required fields can't empty");
      }
    },

    handleGetCategory() {
      //get all categories id
      baseReq
        .get("categories/page/" + this.blogPageId)
        .then((response) => {
          this.categoryId = response.data.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleOpenModal() {
      this.showModal = true;

      // get all page id
      baseReq
        .get("pages?pageSize=100")
        .then((response) => {
          this.pageId = response.data.data.filter(
            (item) => item.id !== "9235f39f-a5b0-4530-8678-9ac0c057b991"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleClose() {
      this.showModal = false;
      this.previewImage = noImage;
      this.ckeditor = "";
      this.ckeditor_en = "";
    },
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
.form-select,
.form-select:focus {
  border-color: unset !important;
  outline: 0;
  box-shadow: none !important;
}

.add-blog__img {
  width: 20rem;
  height: 20rem;
  display: flex;
  margin: auto;
  object-fit: contain;
}

@media only screen and (max-width: 600px) {
  .add-blog__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
s
