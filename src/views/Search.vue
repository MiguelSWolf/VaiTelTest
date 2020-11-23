<template>
  <div class="wrapper">
    <div class="search">
      <div class="container">
        <h1 class="logo">Band Search</h1>
        <form @submit.prevent="onSubmit">
          <input
            type="text"
            class="input is-large"
            placeholder="Search for your favority band..."
          />
          <input type="submit" value="search" class="button is-large" />
        </form>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    onSubmit: function() {
      console.log("buscou");
      this.$router.push({ name: "band-page" });
    }
  }
};
</script>
