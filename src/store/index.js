import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    story: null,
  },
  mutations: {
    saveState (state, stateJson) {
      state.story = stateJson;
    }
  },
  actions: {
  },
  modules: {
  }
})
