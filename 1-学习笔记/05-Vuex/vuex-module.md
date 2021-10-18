<font face="微软雅黑" size="2">

## Vuex module

### module下的state、mutations、actions、getters的使用
三个不同的token分别存放在全局内容、Token1和Token2两个子模块下
#### 1. store文件

```js
// store/index.js文件

import Vue from 'vue'
import Vuex from 'vuex'
import Token1 from './module/token1.js'
import Token2 from './module/token2.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 非生产环境启动严格模式
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: 'token',
  },
  getters: {
    token: state => state.token,
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
    },
  },
  actions: {
    updateToken({commit}, newvalue) {
      commit('setToken', newvalue);
    }
  },
  modules: {
    Token1,
    Token2
  }
})

export default store;
```

```js
// store/module/token1.js文件
const state = {
  token: 'token1',
};

const getters = {
  token: state => state.token,
  freeToken: state => value => state.token > value	// freeToken方法返回用于值与token比较大小的函数
};

const mutations = {
  setToken(state, value) {
    state.token = value;
  }
};

const actions = {
  updateToken({commit}, newValue) {
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
```

```js
// store/module/token2.js
const state = {
  token: 'token2',
};

const getters = {
  token: state => state.token,
};

const mutations = {
  setToken(state, value) {
    state.token = value;
  }
};

const actions = {
  updateToken({commit}, newValue) {
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
```

#### 2.使用方式
```html
<template>
  <div> 
    <div>
      <p>直接获取state：</p>
      <p>token:{{ $store.state.token }}</p>
      <p>token1:{{ $store.state.Token1.token }}</p>
      <p>token2:{{ $store.state.Token2.token }}</p>
    </div>
    <div>
      <p>辅助函数获取state：</p>
      <p>token:{{ token }}</p>
      <p>token1:{{ token1 }}</p>
      <p>token2:{{ token2 }}</p>
    </div>
    <p>-------------------------------</p>
    <div>
      <p>直接获取getters：</p>
      <p>token:{{ $store.getters.token }}</p>
      <p>token1:{{ $store.getters['Token1/token'] }}</p>
      <p>token2:{{ $store.getters['Token2/token'] }}</p>
      <!-- 结果比token小返回true -->
      <p>value值比token1小：{{ $store.getters['Token1/freeToken'](value) }}</p>  
    </div>
    <div>
      <p>辅助函数获取getters：</p>
      <p>token:{{ gToken }}</p>
      <p>token1:{{ gToken1 }}</p>
      <p>token2:{{ gToken2 }}</p>
    </div>
    <button @click="setTokenValue1">直接调用mutations方法：</button>
    <button @click="setTokenValue2">使用mapMutations辅助函数</button>
    <button @click="updateTokenValue1">直接调用actions方法</button>
    <button @click="updateTokenValue2">使用actions辅助函数</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      value: 122
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
      token1: state => state.Token1.token,
      token2: state => state.Token2.token
    }),
    ...mapGetters({
      gToken: 'token',
      gToken1: 'Token1/token',
      gToken2: 'Token2/token'
    })
  },
  methods: {
    ...mapMutations(['setToken','Token1/setToken','Token2/setToken']),
    ...mapActions(['updateToken','Token1/updateToken','Token2/updateToken']),
    
    setTokenValue1() {
      // 1.直接调用mutations方法：
      this.$store.commit('setToken','直接调用mutations方法后的token');
      this.$store.commit('Token1/setToken','直接调用mutations方法后的token1');
      this.$store.commit('Token2/setToken','直接调用mutations方法后的token2');
    },
    setTokenValue2() {
      // 2.使用mapMutations辅助函数
      this.setToken('使用mapMutations辅助函数后的token');
      this['Token1/setToken']('使用mapMutations辅助函数后的token1');
      this['Token2/setToken']('使用mapMutations辅助函数后的token2');
    },

    updateTokenValue1() {
      // 1.直接调用actions方法
      this.$store.dispatch('updateToken','直接调用actions方法后的newToken');
      this.$store.dispatch('Token1/updateToken','直接调用actions方法后的newToken1');
      this.$store.dispatch('Token2/updateToken','直接调用actions方法后的newToken2');
    },
    updateTokenValue2() {
      // 2.使用actions辅助函数
      this.updateToken('使用actions辅助函数newToken');
      this['Token1/updateToken']('使用actions辅助函数newToken1');
      this['Token2/updateToken']('使用actions辅助函数newToken2');
    }
  }
}

</script> 

<style scoped>
button {
  display: inline-block;
  margin-right:20px;
}
</style>
```