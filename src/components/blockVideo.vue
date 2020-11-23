<template>
  <article class="video">
    <figure class="video-thumbnail">
      <img :src="video.thumbnail.medium.url" :alt="altDescription" />
      <div class="play-button">
        <icon-play />
      </div>
    </figure>
    <div class="context">
      <h2 class="video-title">{{ video.title }}</h2>
      <h3 class="video-channel">{{ video.channelTitle }}</h3>
      <div class="video-published">{{ publishedDate }}</div>
      <!-- <div class="description">{{ video.description }}</div> -->
    </div>
    <!-- {{ video.videoId }} -->
    <!-- {{ video.channelId }} -->
  </article>
</template>
<script>
import iconPlay from "./icons/play.vue";
export default {
  props: ["video"],
  components: { iconPlay },
  computed: {
    altDescription: function() {
      return `Image from youtube video - ${this.video.title}`;
    },
    publishedDate: function() {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const dateStr = new Date(this.video.publishedAt).toLocaleDateString(
        "en-US",
        options
      );
      return `Published on ${dateStr}`;
    }
  }
};
</script>
