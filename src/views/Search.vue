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
            placeholder="Search for your favority..."
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
  data() {
    return {
      searchField: "Dua Lipa",
      baseYoutubeAPI: "https://youtube.googleapis.com/youtube/v3/"
    };
  },
  methods: {
    onSubmit: function() {
      console.log("buscou por " + this.searchField);
      this.searchYoutube();
      // this.$router.push({ name: "band-page" });
    },
    searchYoutube: function() {
      console.log("busca youtube começou....");
      const url = `${this.baseYoutubeAPI}search`;
      const params = {
        part: "snippet",
        order: "viewCount",
        q: this.searchField,
        type: "video",
        videoDefinition: "high",
        key: process.env.VUE_APP_GOOGLE_API
      };
      this.$http
        .get(url, { params })
        .then(resource => {
          console.log({ resource });
        })
        .catch(error => {
          console.error("some error");
          console.error({ error });
        });
    }
  }
};
</script>
