<template>
  <article class="video">
        <figure>
            <img :src="video.thumbnail.medium.url" :alt="altDescription" />
        </figure>
        <div class="context">
            <h2 class="video-title">{{ video.title }}</h2>
            <h3 class="video-channel">{{ video.channelTitle }}</h3>
            <div class="published">{{ video.publishedAt }}</div>
            <!-- <div class="description">{{ video.description }}</div> -->
        </div>
        <!-- {{ video.videoId }} -->
        <!-- {{ video.channelId }} -->
    </article>
</template>
<script>
export default {
    props: ['video'],
    computed: {
        altDescription: function() {
            return `Image from youtube video - ${this.video.title}`
        }
    },
}
</script>