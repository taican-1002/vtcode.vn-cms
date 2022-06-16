<template>
  <!-- FOOTER -->
  <div class="card mb-4 position-relative">
    <div class="card-header pb-0 table-header">
      <h1>Config</h1>
      <!-- <AddFooter /> -->
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <tableCommon>
          <template v-slot:tableThead>
            <th v-for="item in footerTable" :key="item" :class="item.class">
              {{ item.name }}
            </th>
          </template>
          <template v-slot:tableTbody>
            <tr v-for="(item, index) in configArr" :key="item.id">
              <td class="table-id config-id" :value="item.id">
                {{ ++index }}
              </td>
              <td class="white-space">{{ item.title }}</td>
              <td class="white-space">{{ item.description }}</td>
              <td>
                <ul
                  v-for="(itemDes, index) in item.config_items"
                  :key="index"
                  class="config-ul"
                >
                  <div>
                    <li class="white-space" :value="itemDes.id">
                      Display: {{ itemDes.display }}
                    </li>
                    <li class="white-space" style="padding-left: 0px">
                      Value: {{ itemDes.value }}
                    </li>
                    <li class="config-redirect white-space">
                      Redirect: {{ itemDes.redirect }}
                    </li>
                  </div>
                  <EditConfig
                    :idConfigs="item.id"
                    :configItem="itemDes"
                    :getAllConfig="this.getAllConfig"
                  />
                </ul>
              </td>
            </tr>
          </template>
        </tableCommon>
      </div>
    </div>
  </div>
</template>

<script>
// import AddFooter from "./AddFooter.vue";
import EditConfig from "./EditConfig.vue";
// import DeleteFooter from "./DeleteFooter.vue";
import baseReq from "../../../../../api/baseReq";
import Table from "../../../../components/common/Table.vue";

export default {
  name: "footer-main",
  components: {
    // AddFooter,
    EditConfig,
    // DeleteFooter,
    tableCommon: Table,
  },

  data() {
    return {
      footerTable: [
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
          name: "configItem",
        },
      ],
      configArr: [],
    };
  },
  methods: {
    getAllConfig() {
      baseReq
        .get("configs")
        .then((response) => {
          this.configArr = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getAllConfig();
  },
};
</script>
<style scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
}
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-action {
  text-align: center;
}
.config-redirect {
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.config-ul {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
</style>
