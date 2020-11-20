import Vue from "vue";
import VueRouter from "vue-router";
import Search from "../views/Search.vue";
import BandPage from "../views/BandPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Search,
    children: [
      {
        path: "band",
        name: "band-page",
        component: BandPage
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
