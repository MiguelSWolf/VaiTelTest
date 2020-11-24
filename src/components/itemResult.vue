<template>
  <article class="item" @click="goTo(item.id)">
    <figure>
      <img :src="thumbnail" :alt="`Picture from ${item.name}`" />
    </figure>
    <div class="content">
      <h3>{{ item.name }}</h3>
      <h4>{{ genre }}</h4>
    </div>
  </article>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    goTo: function(id) {
      this.$store.dispatch("selectedBand", { id });
    }
  },
  computed: {
    thumbnail: function() {
      let thumbnail = this.item.images[0];
      this.item.images.forEach(image => {
        if (image.width < thumbnail.width) {
          thumbnail = image;
        }
      });
      return thumbnail.url;
    },
    genre: function() {
      if (this.item.classifications[0].genre.name == "Undefined") return "";
      return this.item.classifications[0].genre.name;
    }
  }
};
</script>
