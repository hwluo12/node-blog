import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    username: ""
  },
  mutations: {
    changeLoginStatus(state, payload) {
      state.login = payload.login;
      state.username = payload.username;
    }
  },
  actions: {},
  modules: {}
});
