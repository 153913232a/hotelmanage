import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentNav: '1',
    floorId: '',
    userName: '',
    detail: {},
    type: '',
    hy: {
      gtid: 1
    },
    userType: 0
  },
  mutations: {
    setCurrentNav(state, value) {
      state.currentNav = value
    },
    setFloorId(state, value) {
      state.floorId = value
    },
    setUserName(state, value) {
      state.userName = value
    },
    setDetail(state, value) {
      state.detail = value
    },
    setType(state, value) {
      state.type = value
    },
    setHy(state, value) {
      state.hy = value
    },
    setUserType(state, value) {
      state.userType = value
    }
  },
  actions: {
  }
})

export default store
