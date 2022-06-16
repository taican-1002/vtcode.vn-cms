<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Contacts</h1>
      <!-- <AddContact :getAllContact="this.getAllContact" /> -->
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <tableCommon>
          <template v-slot:tableThead>
            <th v-for="item in thTableContact" :key="item" :class="item.class">
              {{ item.name }}
            </th>
          </template>
          <template v-slot:tableTbody>
            <tr v-for="(item, index) in contactArr" :key="item.id">
              <td class="table-id" :value="item.id">
                {{ (this.page - 1) * 10 + index + 1 }}
              </td>
              <td class="white-space">{{ item.fullname }}</td>
              <td class="white-space">{{ item.phone }}</td>
              <td class="white-space">{{ item.email }}</td>
              <td class="white-space">{{ item.note }}</td>
              <td class="white-space">{{ item.created_at.slice(0, 10) }}</td>
              <!-- <td class="table-action">
                <EditContact :contact="item" />
                <DeleteContact :contact="item" />
              </td> -->
            </tr>
          </template>
        </tableCommon>
      </div>
      <div class="mb-3 mt-3 flex">
        <v-pagination
          v-model="page"
          :pages="Math.ceil(this.contactLength / 10)"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="updateHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import AddContact from "./AddContact.vue";
// import EditContact from "./EditContact.vue";
// import DeleteContact from "./DeleteContact.vue";
import Table from "../../../../components/common/Table.vue";
import baseReq from "../../../../../api/baseReq";
import VPagination from "@hennge/vue3-pagination";
export default {
  name: "contact-dashboard",

  components: {
    // AddContact,
    // EditContact,
    // DeleteContact,
    tableCommon: Table,
    VPagination,
  },
  data() {
    return {
      page: 1,
      thTableContact: [
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
          name: "id",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "fullname",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "phone",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "email",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "note",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "createdAt",
        },
      ],
      contactArr: [],
      contactLength: "",
    };
  },
  mounted() {
    this.getAllContact();
  },
  methods: {
    //get all contact
    getAllContact() {
      baseReq
        .get("contacts?page=" + this.page + "&pageSize=10&sort=0")
        .then((response) => {
          this.contactArr = response.data.data.data;
          this.contactLength = response.data.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateHandler(e) {
      this.page = e;
      this.getAllContact();
      window.scrollTo(0, 0);
    },
  },
};
</script>
<style scoped>
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
</style>
