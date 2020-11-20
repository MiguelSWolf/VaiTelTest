<template>
  <div class="home">
    <div class="container">
      <h1>Logo</h1>
      <form @submit.prevent="onSubmit">
        <input type="text" placeholder="Search for your favority band..." />
        <input type="submit" value="search" />
      </form>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    onSubmit: function() {
      console.log('buscou');
      this.$router.push({name: 'band-page'})
    }
  },
};
</script>
