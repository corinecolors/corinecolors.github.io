import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default Vue.prototype.$store = new Vuex.Store({
  state: {
    emailsRead: [],
    data: {},
    allEmailsRead: false,
    screens: {
      Toolbar: false,
    },
    tool: {
      src: "https://miro.medium.com/max/560/0*oa0XcvM99Y5clDsj.png",
      i: 0,
      digType: "",
    },
    activePiece: {},
    isDigging: false,
    digMoreMessage: false,
    pressPlayMessage: false,
    mouse: {},
    donePuzzle: false,
    // active:
  },
  mutations: {
    emailsRead(state, obj) {
      this.state.emailsRead[obj.idx] = obj.boole;
      Vue.set(state, obj.idx, obj.boole);
    },
    localizationData(state, data) {
      state.data = data;
      Vue.set(state, data);
    },
    allEmailsRead(state, data) {
      state.allEmailsRead = data;
      Vue.set(state, data);
    },
    screens(state, obj) {
      state.screens[`${obj.what}`] = obj.bool;
      Vue.set(state, obj.bool);
    },
    tool(state, tool) {
      state.tool = tool;
      Vue.set(state, tool);
    },
    activePiece(state, activePiece) {
      state.activePiece = activePiece;
      Vue.set(state, activePiece);
    },
    isDigging(state, isDigging) {
      state.isDigging = isDigging;
      Vue.set(state, isDigging);
    },
    digMoreMessage(state, digMoreMessage) {
      state.digMoreMessage = digMoreMessage;
      Vue.set(state, digMoreMessage);
    },
    pressPlayMessage(state, pressPlayMessage) {
      state.pressPlayMessage = pressPlayMessage;
      Vue.set(state, pressPlayMessage);
    },
    mouse(state, mouse) {
      state.mouse = mouse;
      Vue.set(state, mouse);
    },
    donePuzzle(state, donePuzzle) {
      state.donePuzzle = donePuzzle;
      Vue.set(state, donePuzzle);
    },
  },
  actions: {
    setEmailsRead(context, obj) {
      context.commit("emailsRead", obj);
    },
    setLocalizationData(context, data) {
      context.commit("localizationData", data);
    },
    setAllEmailsRead(context, data) {
      context.commit("allEmailsRead", data);
    },
  },
});
