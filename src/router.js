import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Page404 from "./components/404.vue";
import VideoPage from "./components/VideoPage.vue";
import CreditsPage from "./components/CreditsPage.vue";
import AboutPlatformPage from "./components/AboutPlatformPage.vue";
import AboutCreatorsPage from "./components/AboutCreatorsPage.vue";
// Because Vue is not global we tie Vue
// and VueRouter together manually
Vue.use(VueRouter);
// Initialize router
const router = new VueRouter({
  base: "",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "App",
      component: App,
    },
    {
      path: "/video",
      name: "VideoPage",
      component: VideoPage,
    },
    {
      path: "/credits",
      name: "CreditsPage",
      component: CreditsPage,
    },
    {
      path: "/about-this-platform",
      name: "AboutPlatformPage",
      component: AboutPlatformPage,
    },
    {
      path: "/about-the-creators",
      name: "AboutCreatorsPage",
      component: AboutCreatorsPage,
    },
    {
      path: "/video/:slug",
      name: "VideoPage",
      component: VideoPage,
    },
    {
      path: "*",
      name: "404",
      component: Page404,
    },
  ],
});

export default router;
