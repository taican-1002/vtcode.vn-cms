<template>
  <ButtonAdd @click="handleToggleModal" />

  <!-- Modal -->
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Banner</h5>
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
          >Image <span style="color: #ff0000">*</span></label
        >
        <div class="mb-3 text-left">
          <div
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Image Preview
          </div>
          <img :src="this.previewImage" class="add-banner_img" />
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
          <div class="mb-3 text-left">
            <label class="form-label"
              >Title <span style="color: #ff0000">*</span></label
            >
            <input type="text" class="form-control banner-title" required />
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
            <input type="text" class="form-control banner-title_en" required />
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
          <div class="mb-3 text-left">
            <label class="form-label"
              >Description <span style="color: #ff0000">*</span></label
            >
            <input type="text" class="form-control banner-des" required />
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
            <input type="text" class="form-control banner-des_en" required />
          </div>
        </div>
      </div>
      <!--Button Text-->
      <h4>Button Text</h4>
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
            <label class="form-label">Button text </label>
            <input type="text" class="form-control banner-btntext" required />
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
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-3 text-left">
        <label class="form-label">Button link</label>
        <input type="text" class="form-control banner-btnlink" required />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Active date <span style="color: #ff0000">*</span></label
        >
        <!-- <input type="date" class="form-control banner-activedate" required /> -->
        <!-- @on-change="doSomethingOnChange" -->
        <flat-pickr
          v-model="active_date"
          :config="config"
          placeholder="Select active date"
          class="form-control active-date"
        ></flat-pickr>
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Deactive date <span style="color: #ff0000">*</span></label
        >
        <flat-pickr
          v-model="deactive_date"
          :config="config"
          placeholder="Select deactive date"
          class="form-control"
        ></flat-pickr>
      </div>
      <div class="mb-3">
        <label for="validationDefault04" class="form-label edit-banner__sort"
          >Location <span style="color: #ff0000">*</span></label
        >
        <input
          type="number"
          class="form-control banner-location"
          required
          min="0"
          max="9"
        />
      </div>
      <div class="mb-3">
        <label for="validationDefault04" class="form-label edit-banner__sort"
          >SortOrder <span style="color: #ff0000">*</span></label
        >
        <input
          type="number"
          class="form-control banner-sortorder"
          required
          min="1"
          max="999"
        />
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
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import noImage from "../../../../../assets/img/no-image.png";
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";
import flatPickr from "vue-flatpickr-component";

//check active_date < deactive_date
const validActiveTime = (start, end) => {
  return new Date(start) >= new Date(end);
};

//check end_at < now date
// const isDate = (isDate) => {
//   const regex = /^\d{4}-\d{2}-\d{2}$/;

//   if (isDate.match(regex) === null) {
//     return false;
//   }

//   const date = new Date(isDate);

//   const timestamp = date.getTime();

//   if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
//     return false;
//   }

//   return date.toISOString().startsWith(isDate);
// };
// const now = new Date();

export default {
  name: "AddBanner",

  components: {
    ButtonAdd,
    modal: Modal,
    flatPickr,
  },

  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      previewImage: noImage,
      active_date: null,
      deactive_date: null,
      config: {
        altFormat: "d/m/Y",
        altInput: true,
      },
    };
  },
  props: ["getAllBanner"],
  methods: {
    onSubmit() {
      const bannerImg = document.querySelector("#file-input");
      const bannerTitle = document.querySelector(".banner-title");
      const bannerTitleEn = document.querySelector(".banner-title_en");
      const bannerDes = document.querySelector(".banner-des");
      const bannerDesEn = document.querySelector(".banner-title_en");
      const bannerBtnText = document.querySelector(".banner-btntext");
      const bannerBtnTextEn = document.querySelector(".banner-btntext_en");
      const bannerBtnLink = document.querySelector(".banner-btnlink");
      const bannerLocation = document.querySelector(".banner-location");
      const bannerSortOrder = document.querySelector(".banner-sortorder");
      var data = new FormData();
      data.append("image", bannerImg.files[0]);
      data.append("title", bannerTitle.value);
      data.append("title_en", bannerTitleEn.value);
      data.append("description", bannerDes.value);
      data.append("description_en", bannerDesEn.value);
      data.append("button_text", bannerBtnText.value);
      data.append("button_text_en", bannerBtnTextEn.value);
      data.append("button_link", bannerBtnLink.value);
      data.append("active_date", this.active_date);
      data.append("deactive_date", this.deactive_date);
      data.append("location", Number(bannerLocation.value));
      data.append("sort_order", Number(bannerSortOrder.value));
      console.log(bannerImg);
      if (
        this.previewImage != "" &&
        bannerTitle.value.trim() &&
        bannerDes.value.trim() &&
        this.active_date != "" &&
        this.deactive_date != "" &&
        bannerLocation.value != "" &&
        bannerSortOrder.value != ""
      ) {
        if (this.previewImage != noImage) {
          if (
            (bannerTitle.value.length <= 100 &&
              bannerTitle.value.trim() &&
              bannerTitleEn.value.length <= 100) ||
            (bannerTitleEn.value.length <= 100 && bannerTitleEn.value.trim())
          ) {
            if (
              (bannerDes.value.length <= 500 &&
                bannerDes.value.trim() &&
                bannerDesEn.value.length <= 500) ||
              (bannerDesEn.value.length <= 500 && bannerDesEn.value.trim())
            ) {
              if (
                bannerBtnText.value.length <= 50 &&
                bannerBtnTextEn.value.length <= 50
              ) {
                if (bannerBtnLink.value.length <= 255) {
                  if (validActiveTime(this.active_date, this.deactive_date)) {
                    this.toast.error(
                      "Deactive date field must be greater than Active date"
                    );
                  } else {
                    //create brand
                    baseReq
                      .post("banners", data)
                      .then(() => {
                        this.getAllBanner();
                        this.showModal = false;
                        this.toast.success("Success");
                        this.previewImage = noImage;
                        bannerTitle.value = "";
                        bannerTitleEn.value = "";
                        bannerDes.value = "";
                        bannerDesEn.value = "";
                        bannerBtnText.value = "";
                        bannerBtnTextEn.value = "";
                        bannerBtnLink.value = "";
                        this.active_date = null;
                        this.deactive_date = null;
                        bannerLocation.value = "";
                        bannerSortOrder.value = "";
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
    handleToggleModal() {
      this.showModal = true;
    },
    handleClose() {
      this.showModal = false;
      this.previewImage = noImage;

      this.active_date = "";
      this.deactive_date = "";
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
.add-banner_img {
  width: 20rem;
  height: 20rem;
  display: flex;
  margin: auto;
  object-fit: contain;
}
input #tj-datetime-input {
  border-radius: 0.5rem;
  height: 40px !important;
}
@media only screen and (max-width: 600px) {
  .add-banner__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
