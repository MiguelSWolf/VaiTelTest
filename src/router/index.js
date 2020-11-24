import Vue from "vue";
import VueRouter from "vue-router";
import Search from "../views/Search.vue";
import BandPage from "../views/BandPage.vue";
import ResultsPage from "../views/Results.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Search,
    props: true,
    children: [
      {
        path: "band/:idBand",
        name: "band-page",
        component: BandPage
      },
      {
        path: "results/:search",
        name: "results-page",
        component: ResultsPage,
        props: true
      }
    ]
  },
  {
    path: "*",
    name: "page-not-found",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
