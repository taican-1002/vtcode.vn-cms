<template>
  <button type="button" class="btn edit-btn">
    <i class="fas fa-pencil-alt me-2" aria-hidden="true"></i>
    Edit
  </button>
</template>

<script>
export default {
  name: "button-edit",
};
</script>

<style scoped>
.edit-btn {
  margin-right: 1rem;
  margin-bottom: 0 !important;
  background-image: linear-gradient(310deg, #112385 0%, #4456d0 100%);
  color: #fff;
}
</style>
