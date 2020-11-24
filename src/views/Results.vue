<template>
  <section class="results">
    <header>
      <div class="container">
        <h2>We found {{ resultsTotal }} matches for "{{ searchField }}"</h2>
      </div>
    </header>
    <div class="container">
      <item-result :item="result" v-for="result in list" :key="result.id" />

      <button type="button" class="button" @click.prevent="moreResults">
        More Results...
      </button>
    </div>
  </section>
</template>
<script>
import ItemResult from "../components/itemResult.vue";
import { mapState } from "vuex";

export default {
  components: {
    ItemResult
  },
  computed: mapState({
    list: state => state.resultsTicketMaster,
    searchField: state => state.searchField,
    resultsTotal: state => state.resultsTotal
  }),
  methods: {
    moreResults: function() {
      console.log("more results");
      this.$store.dispatch("getNextPageTicketMaster");
    }
  }
};
</script>
