<template>
  <section class="modal" :class="classModal">
    <nav class="modal-commands">
      <div @click="shrinkModal">Shrink</div>
      <div @click="goToYoutube">External</div>
      <div @click="closeModal">Close</div>
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
export default {
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
