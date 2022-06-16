<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit Banner</h5>
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
          <img :src="previewImage" class="edit-banner_img" />
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
      <h4 class="text-left">Title</h4>
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
          <div class="mb-3 text-left">
            <label class="form-label"
              >Title <span style="color: #ff0000">*</span></label
            >
            <input
              type="text"
              class="form-control banner-title"
              v-model="getBannerById.title"
              required
            />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-title_en"
          role="tabpanel"
          aria-labelledby="pills-title_en-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label">Title En</label>
            <input
              type="text"
              class="form-control banner-title_en"
              required
              v-model="getBannerById.title_en"
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
            <label class="form-label"
              >Description <span style="color: #ff0000">*</span></label
            >
            <input
              type="text"
              class="form-control banner-des"
              v-model="getBannerById.description"
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
              class="form-control banner-des_en"
              required
              v-model="getBannerById.description_en"
            />
          </div>
        </div>
      </div>
      <!--Button Text-->
      <h4 class="text-left">Button Text</h4>
      <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-btn_text-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-btn_text"
            type="button"
            role="tab"
            aria-controls="pills-btn_text"
            aria-selected="true"
          >
            Button Text
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-btn_text_en-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-btn_text_en"
            type="button"
            role="tab"
            aria-controls="pills-btn_text_en"
            aria-selected="false"
          >
            Button Text En
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-btn_text"
          role="tabpanel"
          aria-labelledby="pills-btn_text-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label">Button text</label>
            <input
              type="text"
              class="form-control banner-btntext"
              v-model="getBannerById.button_text"
              required
            />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-btn_text_en"
          role="tabpanel"
          aria-labelledby="pills-btn_text_en-tab"
        >
          <div class="mb-3 text-left">
            <label class="form-label">Button text En</label>
            <input
              type="text"
              class="form-control banner-btntext_en"
              v-model="getBannerById.button_text_en"
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-3 text-left">
        <label class="form-label">Button link</label>
        <input
          type="text"
          class="form-control banner-btnlink"
          v-model="getBannerById.button_link"
          required
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Active date <span style="color: #ff0000">*</span></label
        >
        <flat-pickr
          v-model="activeDate"
          :config="config"
          class="form-control"
        ></flat-pickr>
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Deactive date <span style="color: #ff0000">*</span></label
        >
        <flat-pickr
          v-model="deactiveDate"
          :config="config"
          class="form-control"
        ></flat-pickr>
      </div>
      <div class="mb-3 text-left">
        <label for="validationDefault04" class="form-label"
          >Location <span style="color: #ff0000">*</span></label
        >
        <input
          type="number"
          class="form-control banner-location"
          required
          min="0"
          max="9"
          v-model="getBannerById.location"
        />
      </div>
      <div class="mb-3 text-left">
        <label for="validationDefault04" class="form-label"
          >SortOrder <span style="color: #ff0000">*</span></label
        >
        <input
          type="number"
          class="form-control banner-sortorder"
          required
          min="1"
          max="999"
          v-model="getBannerById.sort_order"
        />
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
import flatPickr from "vue-flatpickr-component";
//check active_date < deactive_date
const validActiveTime = (start, end) => {
  return new Date(start) >= new Date(end);
};

export default {
  name: "edit-staff",
  components: { ButtonEdit, modal: Modal, flatPickr },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: ["banner", "getAllBanner"],
  data() {
    return {
      showModal: false,
      previewImage: this.banner.image,
      editBanner: this.banner,
      getBannerById: {},
      activeDate: null,
      deactiveDate: null,
      config: {
        altFormat: "d/m/Y",
        altInput: true,
      },
    };
  },
  methods: {
    handleEdit() {
      this.showModal = true;
      //get banner by id
      baseReq
        .get(`banners/${this.editBanner.id}`)
        .then((response) => {
          this.getBannerById = response.data.data;
          //format datetime dd/mm/yyyy
          //activedate
          this.activeDate = response.data.data.active_date;
          // .replace(/-/g,'/');
          //deactivedate
          this.deactiveDate = response.data.data.deactive_date;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      const imgBanner = document.querySelector("#file-input");
      var data = new FormData();
      data.append("image", imgBanner.files[0]);
      data.append("title", this.getBannerById.title);
      data.append("title_en", this.getBannerById.title_en);
      data.append("description", this.getBannerById.description);
      data.append("description_en", this.getBannerById.description_en);
      data.append("button_text", this.getBannerById.button_text);
      data.append("button_text_en", this.getBannerById.button_text_en);
      data.append("button_link", this.getBannerById.button_link);
      data.append("active_date", this.activeDate);
      data.append("deactive_date", this.deactiveDate);
      data.append("location", Number(this.getBannerById.location));
      data.append("sort_order", Number(this.getBannerById.sort_order));
      if (
        this.previewImage != "" &&
        this.getBannerById.title.trim() &&
        this.getBannerById.description.trim() &&
        this.getBannerById.active_date != "" &&
        this.getBannerById.deactive_date != "" &&
        this.getBannerById.location != "" &&
        this.getBannerById.sort_order != ""
      ) {
        if (this.previewImage != "") {
          if (
            (this.getBannerById.title.length <= 100 &&
              this.getBannerById.title.trim() &&
              this.getBannerById.title_en.length <= 100) ||
            (this.getBannerById.title_en.length <= 100 &&
              this.getBannerById.title_en.trim())
          ) {
            if (
              (this.getBannerById.description.length <= 500 &&
                this.getBannerById.description.trim() &&
                this.getBannerById.description_en.length <= 500) ||
              (this.getBannerById.description_en.length <= 500 &&
                this.getBannerById.description_en.trim())
            ) {
              if (
                this.getBannerById.button_text.length <= 50 ||
                (this.getBannerById.button_text_en.length <= 50 &&
                  this.getBannerById.button_text_en.trim())
              ) {
                if (
                  this.getBannerById.button_link.length <= 255 ||
                  this.getBannerById.button_link.trim()
                ) {
                  if (validActiveTime(this.activeDate, this.deactiveDate)) {
                    this.toast.error(
                      "Deactive date field must be greater than Active date"
                    );
                  } else {
                    //edit banner
                    baseReq
                      .put(`banners/${this.editBanner.id}`, data)
                      .then((response) => {
                        this.getAllBanner();
                        this.toast.success(`${response.data.message}`);
                        this.showModal = false;
                      })
                      .catch((error) => {
                        this.toast.error(`${error.response.data.message}`);
                      });
                  }
                } else {
                  this.toast.error(
                    "The button_link field can't enter spaces and exceed 255 characters"
                  );
                }
              } else {
                this.toast.error(
                  "The button_text field can't enter spaces and exceed 50 characters"
                );
              }
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

.edit-banner_img {
  width: 30rem;
  height: 20rem;
  object-fit: contain;
  display: flex;
  margin: auto;
}
.edit-banner__sort {
  float: left;
}
@media only screen and (max-width: 600px) {
  .edit-banner_img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
