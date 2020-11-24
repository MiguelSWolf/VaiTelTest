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
      <div class="container">
        <nav class="social">
          <h2>External Links</h2>
          <icon-social
            v-for="link in band.externalLinks"
            :key="link.type"
            :social="link"
          />
          <br />
          <br />
        </nav>
        <section class="videos">
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
  components: {
    blockVideo,
    iconSocial
  },
  computed: {
    band: function() {
      return this.$store.state.band;
    }
  }
};
</script>
