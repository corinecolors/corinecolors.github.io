import Vue from "vue";
import Index from "./Index.vue";
import store from "./store.js";
import prismic from "./prismic.js";
import router from "./router.js";
import VueSocialSharing from "vue-social-sharing";
import VueYoutube from "vue-youtube";
import VueMeta from "vue-meta";

Vue.use(VueMeta);
Vue.use(VueYoutube);
Vue.use(router);
Vue.use(VueSocialSharing);

prismic.all().then(() => {
  new Vue({
    store,
    prismic,
    router,
    render: (h) => h(Index),
  }).$mount("#index");
});

Vue.config.productionTip = false;
