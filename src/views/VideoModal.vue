<template>
  <section class="modal">
    <nav class="modal-commands">
      <div @click="shrinkModal">Shrink</div>
      <div @click="goToYoutube">External</div>
      <div @click="closeModal">Close</div>
    </nav>
    <div class="modal-container">
      <div class="iframe">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${idVideo}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      idVideo: "Cr-SqRWImmI"
    };
  },
  methods: {
    closeModal: function() {},
    goToYoutube: function() {},
    shrinkModal: function() {}
  }
};
</script>
