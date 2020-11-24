<template>
  <div :class="classIcon" v-if="canShow">
    <a :href="social.href" :title="social.type">
      <figure>
        <icon-facebook v-if="social.type == 'facebook'" />
        <icon-instagram v-else-if="social.type == 'instagram'" />
        <icon-itunes v-else-if="social.type == 'itunes'" />
        <icon-lastfm v-else-if="social.type == 'lastfm'" />
        <icon-twitter v-else-if="social.type == 'twitter'" />
        <icon-wikipedia v-else-if="social.type == 'wiki'" />
        <icon-youtube v-else-if="social.type == 'youtube'" />
        <icon-globe v-else-if="social.type == 'homepage'" />
      </figure>
      <p>{{ social.type }}</p>
    </a>
  </div>
</template>
<script>
import iconFacebook from "./icons/facebook.vue";
import iconInstagram from "./icons/instagram.vue";
import iconItunes from "./icons/itunes.vue";
import iconLastfm from "./icons/lastfm.vue";
import iconTwitter from "./icons/twitter.vue";
import iconWikipedia from "./icons/wikipedia.vue";
import iconYoutube from "./icons/youtube.vue";
import iconGlobe from "./icons/globe.vue";
export default {
  props: ["social"],
  components: {
    iconFacebook,
    iconInstagram,
    iconItunes,
    iconLastfm,
    iconTwitter,
    iconWikipedia,
    iconYoutube,
    iconGlobe
  },
  computed: {
    classIcon: function() {
      return `icon-social type-${this.social.type}`;
    },
    canShow: function() {
      const er = /(facebook|instagram|itunes|lastfm|twitter|wiki|youtube|homepage)/;
      if (er.test(this.social.type)) {
        return true;
      }
      return false;
    }
  }
};
</script>
