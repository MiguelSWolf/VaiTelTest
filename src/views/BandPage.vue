<template>
  <div class="band">
    <header>
      <div class="container">
        <h2 class="name">{{ band.name }}</h2>
        <figure class="figure">
          <img :src="band.image" />
        </figure>
      </div>
    </header>
    <div class="content">
      <nav class="social">
        <div class="container">
          <h2>External Links</h2>
          <icon-social
            v-for="link in band.externalLinks"
            :key="link.type"
            :social="link"
          />
        </div>
      </nav>
      <div class="container">
        <section class="videos">
          <h2>Videos</h2>
          <block-video
            v-for="video in band.videos"
            :key="video.videoId"
            :video="video"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import blockVideo from "@/components/blockVideo";
import iconSocial from "@/components/iconSocial";
export default {
  props: ["idBand"],
  components: {
    blockVideo,
    iconSocial
  },
  computed: {
    band: function() {
      return this.$store.state.band;
    }
  },
  mounted() {
    if (this.band.name == "") {
      this.$store.dispatch("getBandById", { idBand: this.idBand });
    }
  }
};
</script>
