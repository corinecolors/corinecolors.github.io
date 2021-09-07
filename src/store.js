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
      showPuzzle: false,
    },
    tool: {
      src: null,
      digType: "",
    },
    activePiece: {},
    isDigging: false,
    digMoreMessage: false,
    pressPlayMessage: false,
    mouse: {},
    donePuzzle: false,
    AAsolved: false,
    showEmailThread: false,
    emailNotif: true,
    // active:
  },
  mutations: {
    emailsRead(state, obj) {
      this.state.emailsRead[obj.idx] = obj.boole;
      Vue.set(state, obj.idx, obj.boole);
    },
    showEmailThread(state, showEmailThread) {
      state.showEmailThread = showEmailThread;
      Vue.set(state, showEmailThread);
    },
    localizationData(state, data) {
      state.data = data;
      Vue.set(state, data);
    },
    allEmailsRead(state, data) {
      state.allEmailsRead = data;
      Vue.set(state, data);
    },
    AAsolved(state, AAsolved) {
      state.AAsolved = AAsolved;
      Vue.set(state, AAsolved);
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
    emailNotif(state, emailNotif) {
      state.emailNotif = emailNotif;
      Vue.set(state, emailNotif);
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
