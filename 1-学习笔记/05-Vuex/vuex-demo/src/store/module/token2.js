// store/module/token2.js
const state = {
  token: 'token2'
};

const getters = {
  token: state => state.token
};

const mutations = {
  setToken(state, value) {
    state.token = value;
  }
};

const actions = {
  updateToken({ commit }, newValue) {
    commit('setToken', newValue)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
