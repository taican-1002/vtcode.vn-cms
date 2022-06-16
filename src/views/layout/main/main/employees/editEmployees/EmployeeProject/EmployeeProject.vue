<template>
  <div class="card mb-4 text-left">
    <div class="card-header pb-0 table-header">
      <h1>EmployeeProject</h1>
      <AddEmployeeProject
        :addEmployeeProject="this.editEmployees.projects"
        :employeeProjectId="this.editEmployees.id"
        :getEmployeeById="this.getEmployeeById"
      />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0 mb-3">
        <tableCommon>
          <template v-slot:tableThead>
            <th v-for="item in thTable" :key="item" :class="item.class">
              {{ item.name }}
            </th>
          </template>
          <template v-slot:tableTbody>
            <tr
              v-for="(item, index) in this.editEmployees.projects"
              :key="item.id"
            >
              <td class="table-id" :value="item.id">
                {{ ++index }}
              </td>
              <td class="white-space">{{ item.name }}</td>
              <td class="white-space">{{ item.description }}</td>
              <td class="white-space">{{ this.editEmployees.id }}</td>
              <td class="table-action">
                <EditEmployeeProject
                  :employeeEdit="item"
                  :getEmployeeById="this.getEmployeeById"
                  :employeeProjectId="this.editEmployees.id"
                />
                <DeleteEmployeeProject
                  :getEmployeeById="this.getEmployeeById"
                  :employeeProjectId="item.id"
                />
              </td>
            </tr>
          </template>
        </tableCommon>
      </div>
    </div>
  </div>
</template>

<script>
import AddEmployeeProject from "./AddEmployeeProject.vue";
import DeleteEmployeeProject from "./DeleteEmployeeProject.vue";
import EditEmployeeProject from "./EditEmployeeProject.vue";
import Table from "../../../../../../components/common/Table.vue";

export default {
  name: "EmployeeProject",

  components: {
    AddEmployeeProject,
    DeleteEmployeeProject,
    EditEmployeeProject,
    tableCommon: Table,
  },
  props: ["editEmployees", "getEmployeeById"],
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
          name: "description",
        },

        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "employeeId",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
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
</style>
