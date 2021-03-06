import Vue from "vue";
import Vuex from "vuex";
import VueResource from "vue-resource";
import router from "../router/index";

Vue.use(VueResource);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modal: {
      show: false,
      shrinkMode: false,
      idVideo: ""
    },
    loading: false,
    searchField: "",
    resultsTotal: 0,
    currentPage: 0,
    lastPage: 0,
    resultsTicketMaster: [],
    band: {
      id: "",
      name: "",
      image: "",
      externalLinks: [],
      videos: []
    }
  },
  mutations: {
    searchBand(state, { payload }) {
      state.searchField = payload.search;
      this.commit("searchTicketMaster");
    },
    searchYoutube(state, { payload }) {
      state.band.videos = [];
      const baseYoutubeAPI = "https://youtube.googleapis.com/youtube/v3/";
      const url = `${baseYoutubeAPI}search`;
      const params = {
        part: "snippet",
        order: "viewCount",
        q: payload.bandName,
        type: "video",
        videoDefinition: "high",
        key: process.env.VUE_APP_GOOGLE_API,
        maxResults: 12
      };
      Vue.http
        .get(url, { params })
        .then(resource => {
          state.band.videos = [];
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
      state.resultsTicketMaster = [];
      const baseTicketMasterAPI = "https://app.ticketmaster.com/discovery/v2/";
      const url = `${baseTicketMasterAPI}attractions.json`;
      const params = {
        apikey: process.env.VUE_APP_TICKETMASTER_API,
        keyword: state.searchField,
        size: 20,
        page: 0
      };
      Vue.http
        .get(url, { params })
        .then(resource => {
          if (resource.body._embedded) {
            state.resultsTicketMaster = resource.body._embedded.attractions;
          }
          state.resultsTotal = resource.body.page.totalElements;
          state.currentPage = resource.body.page.number;
          state.lastPage = resource.body.page.totalPages;
          if (
            router.history.current.name != "results-page" ||
            router.history.current.params.search != state.searchField
          ) {
            router.push({
              name: "results-page",
              params: { search: state.searchField }
            });
          }
        })
        .catch(error => {
          console.error("some error");
          console.error({ error });
        });
    },
    getNextPageTicketMaster(state) {
      const baseTicketMasterAPI = "https://app.ticketmaster.com/discovery/v2/";
      const url = `${baseTicketMasterAPI}attractions.json`;
      const params = {
        apikey: process.env.VUE_APP_TICKETMASTER_API,
        keyword: state.searchField,
        size: 20,
        page: state.currentPage + 1
      };
      Vue.http
        .get(url, { params })
        .then(resource => {
          resource.body._embedded.attractions.forEach(attraction => {
            state.resultsTicketMaster.push(attraction);
          });
          state.currentPage = resource.body.page.number;
        })
        .catch(error => {
          console.error("some error");
          console.error({ error });
        });
    },
    getBandById(state, { payload }) {
      state.resultsTicketMaster = [];
      const baseTicketMasterAPI = "https://app.ticketmaster.com/discovery/v2/";
      const url = `${baseTicketMasterAPI}attractions/${payload.idBand}.json`;
      const params = {
        apikey: process.env.VUE_APP_TICKETMASTER_API
      };
      Vue.http
        .get(url, { params })
        .then(resource => {
          state.resultsTicketMaster = [];
          state.resultsTicketMaster.push(resource.body);
          this.commit("selectedBand", { payload: { id: payload.idBand } });
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
      state.band.id = selected.id;
      state.band.name = selected.name;
      state.band.image = selected.images[1].url;
      state.band.externalLinks = [];
      for (const type in selected.externalLinks) {
        const url = selected.externalLinks[type][0].url;
        const link = {
          href: url,
          type: type
        };
        state.band.externalLinks.push(link);
      }
      this.commit("searchYoutube", { payload: { bandName: selected.name } });
      if (router.history.current.name != "band-page") {
        router.push({ name: "band-page", params: { idBand: selected.id } });
      }
    },
    openModal(state, { payload }) {
      state.modal.show = true;
      state.modal.shrinkMode = false;
      state.modal.idVideo = payload.idVideo;
      document.body.classList.add("has-modal");
    },
    closeModal(state) {
      state.modal.show = false;
      document.body.classList.remove("has-modal");
    },
    toogleShrinkMode(state) {
      state.modal.shrinkMode = !state.modal.shrinkMode;
    }
  },
  actions: {
    searchBand(context, payload) {
      context.commit("searchBand", { payload });
    },
    selectedBand(context, payload) {
      context.commit("selectedBand", { payload });
    },
    getNextPageTicketMaster(context) {
      context.commit("getNextPageTicketMaster");
    },
    getBandById(context, payload) {
      context.commit("getBandById", { payload });
    },
    openModal(context, payload) {
      context.commit("openModal", { payload });
    },
    closeModal(context) {
      context.commit("closeModal");
    },
    toogleShrinkMode(context) {
      context.commit("toogleShrinkMode");
    }
  }
});
