<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12"><Employees /></div>
    </div>
  </div>
</template>

<script>
import Employees from "../../layout/main/main/employees/Employees.vue";
export default {
  name: "header-cms",
  components: { Employees },
};
</script>
