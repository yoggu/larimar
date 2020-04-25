import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    story: null
  },
  mutations: {
    saveState (state, stateJson) {
      state.story = stateJson;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
