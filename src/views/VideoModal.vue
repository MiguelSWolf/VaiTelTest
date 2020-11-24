<template>
  <section class="modal" :class="classModal">
    <nav class="modal-commands">
      <div @click.prevent="shrinkModal">
        <icon-shrink />
      </div>
      <div @click.prevent="goToYoutube">
        <icon-external />
      </div>
      <div @click.prevent="closeModal">
        <icon-close />
      </div>
    </nav>
    <div class="modal-container">
      <div class="iframe">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${modal.idVideo}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import iconShrink from "../components/icons/compress";
import iconExternal from "../components/icons/external";
import iconClose from "../components/icons/close";
export default {
  components: {
    iconShrink,
    iconExternal,
    iconClose
  },
  computed: {
    youtubeUrl: function() {
      return `https://www.youtube.com/watch?v=${this.idVideo}`;
    },
    classModal: function() {
      return {
        "shrink-mode": this.modal.shrinkMode
      };
    },
    ...mapState({
      modal: state => state.modal
    })
  },
  methods: {
    closeModal: function() {
      this.$store.dispatch("closeModal");
    },
    goToYoutube: function() {
      window.location.href = this.youtubeUrl;
    },
    shrinkModal: function() {
      this.$store.dispatch("toogleShrinkMode");
    }
  }
};
</script>
