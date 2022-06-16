<template>
  <button type="button" class="btn del-btn">
    <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
    Delete
  </button>
</template>

<script>
export default {
  name: "button-delete",
};
</script>

<style scoped>
.del-btn {
  margin-bottom: 0 !important;
  background-image: linear-gradient(310deg, #112385 0%, #3a416f 100%);
  color: #fff;
}
</style>
