import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    story: null,
    isDark: false,
    result: {
      R: 5,
      I: 2,
      A: 1,
      S: 3,
      E: 4,
      C: 2
    }
  },
  mutations: {
    saveState (state, stateJson) {
      state.story = stateJson;
    },
    setTheme (state, value) {
      state.isDark = value;
    },
    saveResult (state, value) {
      state.result = value;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
