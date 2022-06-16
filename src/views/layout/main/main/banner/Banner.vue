<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Banners</h1>
      <AddBanner :getAllBanner="this.getAllBanner" />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <tableCommon>
          <template v-slot:tableThead>
            <th v-for="item in bannerTable" :key="item" :class="item.class">
              {{ item.name }}
            </th>
          </template>
          <template v-slot:tableTbody>
            <tr v-for="(item, index) in bannerArr" :key="item.id">
              <td class="table-id" :value="item.id">
                {{ (this.page - 1) * 10 + index + 1 }}
              </td>
              <td class="white-space">{{ item.title }}</td>
              <td class="banner-des white-space">{{ item.description }}</td>
              <td class="white-space">{{ item.button_text }}</td>
              <td class="white-space">{{ item.button_link }}</td>
              <td>{{ item.sort_order }}</td>
              <td>
                <img :src="item.image" class="banner-img" />
              </td>
              <td class="table-action">
                <EditBanner :banner="item" :getAllBanner="this.getAllBanner" />
                <DeleteBanner
                  :banner="item"
                  :getAllBanner="this.getAllBanner"
                />
              </td>
            </tr>
          </template>
        </tableCommon>
      </div>
      <div class="mb-3 mt-3 flex">
        <v-pagination
          v-model="page"
          :pages="Math.ceil(this.bannerLength / 10)"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="updateHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddBanner from "./AddBanner.vue";
import EditBanner from "./EditBanner.vue";
import DeleteBanner from "./DeleteBanner.vue";
import Table from "../../../../components/common/Table.vue";
import baseReq from "../../../../../api/baseReq";
import VPagination from "@hennge/vue3-pagination";
export default {
  name: "banner-dashboard",
  data() {
    return {
      bannerTable: [
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
          name: "description",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "buttontext",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "buttonlink",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "sortOrder",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "image",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      bannerArr: [],
      bannerLength: "",
      page: 1,
    };
  },
  components: {
    AddBanner,
    EditBanner,
    DeleteBanner,
    tableCommon: Table,
    VPagination,
  },

  mounted() {
    this.getAllBanner();
  },
  methods: {
    updateHandler(e) {
      this.page = e;
      this.getAllBanner();
      window.scrollTo(0, 0);
    },
    getAllBanner() {
      baseReq
        .get("banners/admin?page=" + this.page + "&pageSize=10&sort=0")
        .then((response) => {
          this.bannerArr = response.data.data.data;
          this.bannerLength = response.data.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.btn-close {
  background: #596cff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat !important;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.table-id {
  padding: 0.75rem 1.5rem;
}
.table-action {
  text-align: center;
}
.banner-des {
  max-width: 20rem;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: break-spaces;
}
.banner-img {
  width: 10rem;
  height: 10rem;
  border-radius: 5px;
  object-fit: contain;
}
</style>
