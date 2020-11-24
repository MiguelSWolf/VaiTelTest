<template>
  <section>
    <item-result :item="result" v-for="result in list" :key="result.id" />
  </section>
</template>
<script>
import ItemResult from "../components/itemResult.vue";
export default {
  components: {
    ItemResult
  },
  computed: {
    list: function() {
      return this.$store.state.resultsTicketMaster;
    }
  }
};
</script>
