<template>
  <div class="card mb-4 px-2">
    <div class="card-header pb-3 blog-post__heading">
      <h1>Blogs</h1>
      <AddBlog :getAllBlog="this.getAllBlog" />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <tableCommon>
        <template v-slot:tableThead>
          <th v-for="item in blogTable" :key="item" :class="item.class">
            {{ item.name }}
          </th>
        </template>
        <template v-slot:tableTbody>
          <tr v-for="(item, index) in blogArr" :key="item.id">
            <td :value="item.id">
              <div class="d-flex px-2 py-1 blog-post__id">
                {{ (this.page - 1) * 10 + index + 1 }}
              </div>
            </td>
            <td class="blog-post__title">
              <p class="text-lg font-weight-bold mb-0 white-space">
                {{ item.title }}
              </p>
            </td>

            <td class="align-middle">
              <img :src="item.image" alt="" class="blog-post__img" />
            </td>
            <td class="align-middle white-space">
              {{ item.description }}
            </td>
            <td class="align-middle white-space blog-category">
              {{ item.category.page.title }}
            </td>
            <td
              class="align-middle white-space blog-category"
              :value="item.category.id"
            >
              {{ item.category.title }}
            </td>
            <td>
              <div
                class="form-check form-switch blog-post__isPin"
                v-if="
                  item.category.page.id ===
                  '7735e4c1-1969-498e-8478-9da74c3e54fa'
                "
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  :checked="item.bin"
                  @change="(e) => handleToggleIsPin(e, item.bin, item.id)"
                />
              </div>
            </td>
            <td class="align-middle text-sm white-space">
              <ButtonLink @click="handleLinkToClient(item)"> </ButtonLink>
            </td>
            <td class="align-middle text-center">
              <EditBlog :blog="item" :getAllBlog="this.getAllBlog" />
              <DeleteBlog :blog="item" :getAllBlog="this.getAllBlog" />
            </td>
          </tr>
        </template>
      </tableCommon>
    </div>
    <div class="mb-3 mt-3 flex">
      <v-pagination
        v-model="page"
        :pages="Math.ceil(this.blogLength / 10)"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
      />
    </div>
  </div>
</template>

<script>
import AddBlog from "./AddBlog.vue";
import EditBlog from "./EditBlog.vue";
import DeleteBlog from "./DeleteBlog.vue";
import baseReq from "../../../../../api/baseReq";
import Table from "../../../../components/common/Table.vue";
import { useToast } from "vue-toastification";
import VPagination from "@hennge/vue3-pagination";
import ButtonLink from "@//views/components/common/ButtonAction/ButtonLink.vue";
export default {
  name: "blog-dashboard",
  data() {
    return {
      blogTable: [
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
          name: "id",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "title",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "image",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "description",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "page",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "category",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs text-center font-weight-bolder opacity-7 ps-2",
          name: "isPin",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "link",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      blogArr: [],
      blogLength: "",
      category: [],
      page: 1,
    };
  },
  setup() {
    const toast = useToast();

    return {
      toast,
    };
  },
  mounted() {
    this.getAllBlog();
  },
  methods: {
    handleLinkToClient(item) {
      const url = process.env.VUE_APP_CLIENT_URL;
      window.open(url + item.category.page.slug_en + "/" + item.slug);
      // process.env.VUE_APP_CLIENT_URL
    },
    updateHandler(e) {
      this.page = e;
      this.getAllBlog();
      window.scrollTo(0, 0);
    },
    getAllBlog() {
      baseReq
        .get("blogs/admin?page=" + this.page + "&pageSize=10&sort=0")
        .then((response) => {
          this.blogArr = response.data.data.data;
          this.blogLength = response.data.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleToggleIsPin(e, item, id) {
      item = e.target.checked;
      //edit pin
      baseReq
        .put(`blogs/changeBin/${id}`)
        .then((response) => {
          this.getAllBlog();
          this.toast.success(`${response.data.message}`);
          this.showModal = false;
        })
        .catch((error) => {
          this.toast.error(`${error.response.data.message}`);
        });
      return item;
    },
  },
  components: {
    AddBlog,
    EditBlog,
    DeleteBlog,
    tableCommon: Table,
    VPagination,
    ButtonLink,
  },
};
</script>
<style scoped>
.blog-post__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.blog-post__id {
  padding: 0.75rem 1rem !important;
}
.blog-post__img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}
.blog-post__isPin {
  display: flex;
  justify-content: center;
}
</style>
