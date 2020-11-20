<template>
  <div id="app" :class="classPage">
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    classPage: function() {
      return this.$route.name;
    }
  },
}
</script>
<style lang="scss">
  @import '@/assets/scss/index';
</style>
