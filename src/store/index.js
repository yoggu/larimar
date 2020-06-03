import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    story: null,
    isDark: false,
    result: {
      R: Number,
      I: Number,
      A: Number,
      S: Number,
      E: Number,
      C: Number
    },
    isFinished: false,
    answers: {},
    image: null,
    audio: null
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
    },
    setFinished (state, value) {
      state.isFinished = value;
    },
    setAnswers (state, value) {
      state.answers = value;
    },
    setImage (state, value) {
      state.image = value;
    },
    setAudio (state, value) {
      state.audio = value;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
