<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Brands</h1>
      <AddBrand :getAllBrand="this.getAllBrand" />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <tableCommon>
          <template v-slot:tableThead>
            <th v-for="item in thTable" :key="item" :class="item.class">
              {{ item.name }}
            </th>
          </template>
          <template v-slot:tableTbody>
            <tr v-for="(item, index) in brandArr" :key="item.id">
              <td class="table-id" :value="item.id">
                {{ (this.page - 1) * 10 + index + 1 }}
              </td>
              <td class="white-space">{{ item.name }}</td>
              <td class="white-space">{{ item.redirect }}</td>
              <td>
                <img :src="item.image" alt="" class="Brand__img" />
              </td>

              <td class="table-action">
                <EditBrand :brand="item" :getAllBrand="this.getAllBrand" />
                <DeleteBrand :brand="item" :getAllBrand="this.getAllBrand" />
              </td>
            </tr>
          </template>
        </tableCommon>
      </div>
      <div class="mb-3 mt-3 flex">
        <v-pagination
          v-model="page"
          :pages="Math.ceil(this.brandLength.length / 10)"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="updateHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddBrand from "./AddBrand.vue";
import EditBrand from "./EditBrand.vue";
import DeleteBrand from "./DeleteBrand.vue";
import Table from "../../../../components/common/Table.vue";
import baseReq from "../../../../../api/baseReq";

import VPagination from "@hennge/vue3-pagination";

export default {
  name: "Brand-dashboard",

  components: {
    AddBrand,
    EditBrand,
    DeleteBrand,
    tableCommon: Table,
    VPagination,
  },
  mounted() {
    this.getAllBrand();
    this.getAllLengthBrand();
  },
  methods: {
    updateHandler(e) {
      this.page = e;
      this.getAllBrand();
      window.scrollTo(0, 0);
    },
    getAllLengthBrand() {
      baseReq
        .get("brands")
        .then((response) => {
          this.brandLength = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getAllBrand() {
      baseReq
        .get("brands?page=" + this.page + "&pageSize=10&sort=0")
        .then((response) => {
          this.brandArr = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  data() {
    return {
      thTable: [
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
          name: "id",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "name",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "redirect",
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
      brandArr: [],
      brandLength: "",
      page: 1,
    };
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
.Brand__img {
  width: 10rem;
  height: 5rem;
  object-fit: contain;
  /* border-radius: 100%; */
}
</style>
