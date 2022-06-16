<template>
  <ButtonAdd @click="handleToggleModal" />
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Brand</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleClose"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Image <span style="color: #ff0000">*</span></label
        >
        <div class="mb-3">
          <div
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Image Preview
          </div>
          <img :src="previewImage" class="add-brand_img" />
        </div>
        <input
          type="file"
          class="form-control"
          accept="image/*"
          @change="uploadImage"
          id="file-input"
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input type="text" class="form-control add-brand_name" required />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Redirect <span style="color: #ff0000">*</span></label
        >
        <input type="text" class="form-control add-brand_redirect" required />
      </div>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-add" @click="onSubmit">
        ADD
      </button></template
    >
  </modal>
</template>

<script>
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import noImage from "../../../../../assets/img/no-image.png";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";

export default {
  name: "AddPartner",
  components: { ButtonAdd, modal: Modal },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      previewImage: noImage,
    };
  },
  props: ["getAllBrand"],
  methods: {
    onSubmit() {
      const brandName = document.querySelector(".add-brand_name");
      const brandRedirect = document.querySelector(".add-brand_redirect");
      const brandImg = document.querySelector("#file-input");
      var data = new FormData();
      data.append("name", brandName.value);
      data.append("redirect", brandRedirect.value);
      data.append("image", brandImg.files[0]);

      if (
        this.previewImage != "" &&
        brandName.value.trim() &&
        brandRedirect.value.trim()
      ) {
        if (this.previewImage != noImage) {
          if (brandName.value.length <= 255 && brandName.value.trim()) {
            if (
              brandRedirect.value.length <= 255 &&
              brandRedirect.value.trim()
            ) {
              //create brand
              baseReq
                .post("brands", data)
                .then(() => {
                  this.getAllBrand();
                  this.previewImage = noImage;
                  brandName.value = "";
                  brandRedirect.value = "";
                  this.showModal = false;
                  this.toast.success("Success");
                })
                .catch((error) => {
                  console.log(error);
                  this.toast.error(`${error.response.data.message}`);
                });
            } else {
              this.toast.error(
                "The redirect field is invalid format, can't be empty or exceeds 255 characters"
              );
            }
          } else {
            this.toast.error(
              "The title field can't be empty or exceed 255 characters"
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
.add-brand_img {
  width: 20rem;
  height: 20rem;
  /* border-radius: 100%; */
  display: flex;
  margin: auto;
  object-fit: contain;
}
@media only screen and (max-width: 600px) {
  .add-brand_img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
