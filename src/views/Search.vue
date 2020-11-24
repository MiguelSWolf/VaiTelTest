<template>
  <div class="wrapper">
    <div class="search">
      <div class="container">
        <h1 class="logo">Band Search</h1>
        <form @submit.prevent="onSubmit">
          <input
            type="text"
            class="input is-large"
            v-model="searchField"
            placeholder="Search for your favorite..."
          />
          <input type="submit" value="Search" class="button is-large" />
        </form>
      </div>
    </div>
    <router-view />
    <video-modal v-if="showModal" />
  </div>
</template>

<script>
import videoModal from "./VideoModal";
export default {
  name: "Home",
  props: ["search"],
  components: {
    videoModal
  },
  data() {
    return {
      searchField: ""
    };
  },
  computed: {
    showModal: function() {
      return this.$store.state.modal.show;
    }
  },
  methods: {
    onSubmit: function() {
      this.$store.dispatch("searchBand", { search: this.searchField });
    }
  },
  mounted() {
    if (this.search) {
      this.searchField = this.search;
    }
  }
};
</script>
