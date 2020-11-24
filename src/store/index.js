import Vue from "vue";
import Vuex from "vuex";
import VueResource from "vue-resource";

Vue.use(VueResource);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    searchField: "",
    resultsTicketMaster: [],
    band: {
      name: "",
      image: "",
      externalLinks: [],
      videos: []
    }
  },
  mutations: {
    searchBand(state, { payload }) {
      console.log("searchBand");
      state.searchField = payload.search;
      this.commit("searchTicketMaster");
    },
    searchYoutube(state, { payload }) {
      console.log("busca youtube começou....");
      state.band.videos = [];
      const baseYoutubeAPI = "https://youtube.googleapis.com/youtube/v3/";
      const url = `${baseYoutubeAPI}search`;
      const params = {
        part: "snippet",
        order: "viewCount",
        q: payload.bandName,
        type: "video",
        videoDefinition: "high",
        key: process.env.VUE_APP_GOOGLE_API
      };
      Vue.http
        .get(url, { params })
        .then(resource => {
          console.log({ videos: resource.body.items });
        })
        .catch(error => {
          console.error("some error");
          console.error({ error });
        });
    },
    searchTicketMaster(state) {
      console.log("busca ticketMaster começou....");
      state.resultsTicketMaster = [];
      const baseTicketMasterAPI = "https://app.ticketmaster.com/discovery/v2/";
      const url = `${baseTicketMasterAPI}attractions.json`;
      const params = {
        apikey: process.env.VUE_APP_TICKETMASTER_API,
        keyword: state.searchField
      };
      Vue.http
        .get(url, { params })
        .then(resource => {
          state.resultsTicketMaster = resource.body._embedded.attractions;
          console.log({ resource });
        })
        .catch(error => {
          console.error("some error");
          console.error({ error });
        });
    }
  },
  actions: {
    searchBand(context, payload) {
      context.commit("searchBand", { payload });
    }
  }
});
