import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    story: null,
    isDark: false,
  },
  mutations: {
    saveState (state, stateJson) {
      state.story = stateJson;
    },
    setTheme (state, value) {
      state.isDark = value;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
