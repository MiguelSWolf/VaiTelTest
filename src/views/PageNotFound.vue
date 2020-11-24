<template>
  <div>
    Page not found
  </div>
</template>
<script>
export default {
  mounted() {
    this.$router.push({ name: "home" });
  }
};
</script>
