// store/module/token1.js文件
const state = {
  token: 123
};

const getters = {
  token: state => state.token,
  freeToken: state => value => state.token > value
};

const mutations = {
  setToken(state, value) {
    state.token = value;
  }
};

const actions = {
  updateToken({ commit }, newValue) {
    commit('setToken', newValue);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
