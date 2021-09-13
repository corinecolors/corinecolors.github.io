import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Page404 from "./components/404.vue";
// import VideoPage from "./components/VideoPage.vue";
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
    // {
    //   path: "/video",
    //   name: "VideoPage",
    //   component: VideoPage,
    // },
    // {
    //   path: "/video/:slug",
    //   name: "VideoPage",
    //   component: VideoPage,
    // },
    {
      path: "*",
      name: "404",
      component: Page404,
    },
  ],
});

export default router;
