<template>
  <section>
    <article v-for="result in list" :key="result.id" @click="goTo(result.id)">
      {{ result.name }}
    </article>
  </section>
</template>
<script>
export default {
  computed: {
    list: function() {
      return this.$store.state.resultsTicketMaster;
    }
  },
  methods: {
    goTo: function(id) {
      this.$store.dispatch("selectedBand", { id });
    }
  }
};
</script>
