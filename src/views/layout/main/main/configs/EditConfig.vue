<template>
  <ButtonEdit @click="handleOpenEdit" />

  <!-- Modal -->
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit Config Item</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="this.showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">
        <!--Display-->
        <h4>Display</h4>
        <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-display-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-display"
              type="button"
              role="tab"
              aria-controls="pills-display"
              aria-selected="true"
            >
              Display
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-display_en-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-display_en"
              type="button"
              role="tab"
              aria-controls="pills-display_en"
              aria-selected="false"
            >
              Display En
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-display"
            role="tabpanel"
            aria-labelledby="pills-display-tab"
          >
            <div class="mb-3">
              <label class="form-label">Display </label>
              <input
                type="text"
                class="form-control config-item__display"
                required
                v-model="configId.display"
              />
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="pills-display_en"
            role="tabpanel"
            aria-labelledby="pills-display_en-tab"
          >
            <div class="mb-3">
              <label class="form-label">Display En </label>
              <input
                type="text"
                class="form-control config-item__display-en"
                required
                v-model="configId.display_en"
              />
            </div>
          </div>
        </div>

        <!--Value-->
        <h4>Value</h4>
        <ul class="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-value-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-value"
              type="button"
              role="tab"
              aria-controls="pills-value"
              aria-selected="true"
            >
              Value
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-value_en-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-value_en"
              type="button"
              role="tab"
              aria-controls="pills-value_en"
              aria-selected="false"
            >
              Value En
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-value"
            role="tabpanel"
            aria-labelledby="pills-value-tab"
          >
            <div class="mb-3">
              <label class="form-label"
                >Value <span style="color: #ff0000">*</span></label
              >
              <input
                type="text"
                class="form-control config-item__value"
                required
                v-model="configId.value"
              />
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="pills-value_en"
            role="tabpanel"
            aria-labelledby="pills-value_en-tab"
          >
            <div class="mb-3">
              <label class="form-label">Value En</label>
              <input
                type="text"
                class="form-control config-item__value-en"
                required
                v-model="configId.value_en"
              />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label"
            >Redirect <span style="color: #ff0000">*</span></label
          >
          <input
            type="text"
            class="form-control config-item__redirect"
            required
            v-model="configId.redirect"
          />
        </div>
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
  name: "EditConfig",
  components: {
    ButtonEdit,
    modal: Modal,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      configId: this.configItem,
      editConfig: {},
    };
  },
  props: ["configItem", "getAllConfig", "idConfigs"],
  methods: {
    //get all configsItem
    getAllConfigsItem() {
      baseReq
        .get("congifItem?sort=0")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**Modal */
    onSubmit() {
      var data = {
        display: this.configId.display,
        value: this.configId.value,
        display_en: this.configId.display_en,
        value_en: this.configId.value_en,
        redirect: this.configId.redirect,
      };

      if (
        this.configId.value != "" &&
        this.configId.value.trim() &&
        this.configId.redirect != "" &&
        this.configId.redirect.trim()
      ) {
        if (
          this.configId.value.length <= 500 ||
          (this.configId.value_en.trim() &&
            this.configId.value_en.length <= 500)
        ) {
          if (this.configId.redirect.length <= 500) {
            if (
              this.configId.display.length <= 500 ||
              (this.configId.display_en.trim() &&
                this.configId.display_en.length <= 500)
            ) {
              //edit config
              baseReq
                .put(`configs/${this.configId.id}`, data)
                .then((response) => {
                  this.getAllConfig();
                  this.toast.success(`${response.data.message}`);
                  this.showModal = false;
                })
                .catch((error) => {
                  this.toast.error(`${error.response.data.message}`);
                });
            } else {
              this.toast.error(
                "The display field can't be exceed 500 characters"
              );
            }
          } else {
            this.toast.error(
              "The redirect field can't be empty or exceed 500 characters"
            );
          }
        } else {
          this.toast.error(
            "The value field can't be empty or exceed 500 characters"
          );
        }
      } else {
        this.toast.error("All required fields can't empty");
      }
    },
    handleOpenEdit() {
      this.showModal = true;
      //get config by id
      baseReq
        .get(`configs/${this.idConfigs}`)
        .then((response) => {
          this.editConfig = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.text-left {
  text-align: left;
}
.float-left {
  float: left;
}
.mr-2 {
  margin-right: 1rem;
}
.form-label {
  float: left;
}
.description-icon {
  display: flex;
}
.description-content {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description-text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
