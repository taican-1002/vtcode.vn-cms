<template>
  <ButtonEdit @click="handleEdit" />

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit Brand</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
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
          <img :src="previewImage" class="edit-partner__img" />
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
          class="form-control brand-name"
          v-model="editBrand.name"
          required
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Redirect <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control brand-redirect"
          v-model="editBrand.redirect"
          required
        />
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-add" @click="onSubmit">
        SAVE CHANGE
      </button></template
    >
  </modal>
</template>

<script>
import ButtonEdit from "@//views/components/common/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";
import baseReq from "../../../../../api/baseReq";
export default {
  name: "edit-brand",
  components: { ButtonEdit, modal: Modal },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      previewImage: this.brand.image,
      brandId: this.brand,
      editBrand: {},
    };
  },
  props: ["brand", "getAllBrand"],

  methods: {
    handleEdit() {
      this.showModal = true;
      //get brand by id
      baseReq
        .get(`brands/${this.brandId.id}`)
        .then((response) => {
          this.editBrand = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      const brandName = document.querySelector(".brand-name");
      const brandRedirect = document.querySelector(".brand-redirect");
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
        if (this.previewImage != "") {
          if (brandName.value.length <= 255 && brandName.value.trim()) {
            if (
              brandRedirect.value.length <= 255 &&
              brandRedirect.value.trim()
            ) {
              //edit brand
              baseReq
                .put(`brands/${this.brandId.id}`, data)
                .then((response) => {
                  this.getAllBrand();
                  this.toast.success(`${response.data.message}`);
                  this.showModal = false;
                })
                .catch((error) => {
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
    /**Handle upload logo */
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
.edit-partner__img {
  width: 20rem;
  height: 20rem;
  /* border-radius: 100%; */
  display: flex;
  margin: auto;
  object-fit: contain;
}
@media only screen and (max-width: 600px) {
  .edit-partner__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
