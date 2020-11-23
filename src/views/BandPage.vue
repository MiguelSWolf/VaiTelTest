<template>
  <div class="band">
    <header>
      <div class="container">
        <h2 class="name">{{ name }}</h2>
        <figure class="figure">
          <img :src="image" />
        </figure>
      </div>
    </header>
    <div class="content">
      <div class="container">
        <nav class="social">
          <h2>External Links</h2>
          <icon-social
            v-for="link in externalLinks"
            :key="link.type"
            :social="link"
          />
          <br />
          <br />
        </nav>
        <section class="videos">
          <block-video
            v-for="video in videos"
            :key="video.videoId"
            :video="video"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import DataGuns from "@/assets/test-data/youtube-guns.json";
import blockVideo from "@/components/blockVideo";
import iconSocial from "@/components/iconSocial";
export default {
  components: {
    blockVideo,
    iconSocial
  },
  data() {
    return {
      name: "Guns n' roses",
      // background: "https://s1.ticketm.net/dam/a/f01/ad68066e-5401-42bb-ba79-737ca8d65f01_1352251_TABLET_LANDSCAPE_16_9.jpg",
      image:
        "https://s1.ticketm.net/dam/a/f01/ad68066e-5401-42bb-ba79-737ca8d65f01_1352251_RETINA_PORTRAIT_3_2.jpg",
      externalLinks: [
        {
          type: "youtube",
          href: "https://www.youtube.com/user/GunsNRosesVEVO"
        },
        {
          type: "twitter",
          href: "https://twitter.com/gunsnroses"
        },
        {
          type: "itunes",
          href: "https://itunes.apple.com/artist/id106621"
        },
        {
          type: "lastfm",
          href: "http://www.last.fm/music/Guns+N'+Roses"
        },
        {
          type: "wiki",
          href: "https://en.wikipedia.org/wiki/Guns_N'_Roses"
        },
        {
          type: "facebook",
          href: "https://www.facebook.com/gunsnroses"
        },
        {
          type: "instagram",
          href: "https://www.instagram.com/gunsnroses"
        },
        {
          type: "homepage",
          href: "http://www.gunsnroses.com/"
        }
      ],
      videos: []
    };
  },
  mounted() {
    DataGuns.items.forEach(video => {
      const objVideo = {
        videoId: video.id.videoId,
        publishedAt: video.snippet.publishedAt,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails,
        channelTitle: video.snippet.channelTitle,
        channelId: video.snippet.channelId
      };
      this.videos.push(objVideo);
    });
  }
};
</script>
