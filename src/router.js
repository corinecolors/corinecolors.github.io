import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import VideoPage from "./components/VideoPage.vue";
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
      path: "/video/*",
      name: "VideoPage",
      component: VideoPage,
    },
    {
      path: "*",
      name: "App",
      component: App,
    },
  ],
});

export default router;
