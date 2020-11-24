import Vue from "vue";
import Vuex from "vuex";
import VueResource from "vue-resource";
import router from "../router/index";

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
          state.band.videos = [];
          console.log({ videos: resource.body.items });
          resource.body.items.forEach(video => {
            this.commit("addVideo", { payload: { ...video } });
          });
        })
        .catch(error => {
          console.error("some error");
          console.error({ error });
        });
    },
    addVideo(state, { payload }) {
      const objVideo = {
        videoId: payload.id.videoId,
        publishedAt: payload.snippet.publishedAt,
        title: payload.snippet.title,
        description: payload.snippet.description,
        thumbnail: payload.snippet.thumbnails,
        channelTitle: payload.snippet.channelTitle,
        channelId: payload.snippet.channelId
      };
      state.band.videos.push(objVideo);
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
          router.push({ name: "results-page" });
        })
        .catch(error => {
          console.error("some error");
          console.error({ error });
        });
    },
    selectedBand(state, { payload }) {
      const selected = state.resultsTicketMaster.find(band => {
        return band.id == payload.id;
      });
      console.log({ selected });
      state.band.name = selected.name;
      state.band.image = selected.images[1].url;
      for (const type in selected.externalLinks) {
        const url = selected.externalLinks[type][0].url;
        const link = {
          href: url,
          type: type
        };
        console.log({ link });
        state.band.externalLinks.push(link);
      }
      this.commit("searchYoutube", { payload: { bandName: selected.name } });
      router.push({ name: "band-page" });
    }
  },
  actions: {
    searchBand(context, payload) {
      context.commit("searchBand", { payload });
    },
    selectedBand(context, payload) {
      context.commit("selectedBand", { payload });
    }
  }
});
