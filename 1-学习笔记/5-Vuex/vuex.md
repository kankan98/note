<font face="微软雅黑" size="2">

## Vuex
- [Vuex](#vuex)
  - [1. Vuex概述](#1-vuex概述)
    - [1.1 组件之间共享数据的方式](#11-组件之间共享数据的方式)
    - [1.2 Vuex是什么](#12-vuex是什么)
    - [1.3 Vuex的作用](#13-vuex的作用)
  - [2. Vuex的基本使用](#2-vuex的基本使用)
  - [3. Vuex 的核心概念](#3-vuex-的核心概念)
    - [3.1 核心概念概述](#31-核心概念概述)
    - [3.2 State](#32-state)
      - [3.2.1 组件访问 State 中数据的第一种方式：](#321-组件访问-state-中数据的第一种方式)
      - [3.2.2 组件访问 State 中数据的第二种方式：](#322-组件访问-state-中数据的第二种方式)
    - [3.3 Mutation](#33-mutation)
      - [3.3.1 触发 mutations 的第一种方式:](#331-触发-mutations-的第一种方式)
      - [3.3.2 触发 mutations 的第二种方式：](#332-触发-mutations-的第二种方式)
    - [3.4 Action](#34-action)
      - [3.4.1 触发 actions 的第一种方式:](#341-触发-actions-的第一种方式)
      - [3.4.2 触发 actions 的第二种方式：](#342-触发-actions-的第二种方式)
    - [3.5 Getter](#35-getter)
      - [3.5.1 使用 getters 的第一种方式：](#351-使用-getters-的第一种方式)
      - [3.5.2 使用 getters 的第二种方式：](#352-使用-getters-的第二种方式)
  - [4. 使用汇总](#4-使用汇总)
    - [4.1 main文件](#41-main文件)
    - [4.2 方式一](#42-方式一)
      - [4.2.1 store文件](#421-store文件)
      - [4.2.2 组件1](#422-组件1)
    - [4.3 方式2](#43-方式2)
      - [4.3.1 store文件](#431-store文件)
      - [4.3.2 组件2](#432-组件2)
### 1. Vuex概述
#### 1.1 组件之间共享数据的方式
1. 父向子传值：`v-bind` 属性绑定
2. 子向父传值：`v-on` 事件绑定
3. 兄弟组件之间共享数据：`EvenBus`
   - `$on` 接收数据的那个组件
   - `$emit` 发送数据的那个组件

#### 1.2 Vuex是什么
**Vuex** 是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享。

#### 1.3 Vuex的作用
1. 能够在 `vuex` 中集中管理共享的数据，易于开发和后期维护
2. 能够高效地实现组件之间的数据共享，提高开发效率
3. 存储在 `vuex` 中地数据都是响应式的，能够实时保持数据和页面的同步

### 2. Vuex的基本使用
1. 安装 vuex 依赖包
   `npm install vuex --save`
2. 导入 vuex 包
   ```js
   //store.js
   import Vue from 'vue'
   import Vuex from 'vuex'

   Vue.use(Vuex)
   ```
3. 创建 store 对象
   ```js
   //store.js
   const store = new Vuex.Store({
     //Store 中存放的就是全局共享的数据
     state: { 
       count: 0
     },
     mutations: {

     },
     actions: {

     },
   })
   ```    
4. 将 store 对象挂载到 vue 实例中
   ```js
   //main.js
   new Vue({
     el: 'app',
     render: h => h(app),
     router,
     //将创建的共享数据对象，挂载到 Vue 实例中
     //所有的组件，就可以直接从 store 中获取全局的数据了
     store,
   }).$mount('#app')
   ```

### 3. Vuex 的核心概念
#### 3.1 核心概念概述
- State
- Mutation
- Action
- Getter

#### 3.2 State
**State** 提供唯一的公共数据源，所有共享的数据都要统一放到 Store 的 State 中进行存储。
```js
//创建store数据源，提供唯一公共数据
const store = new Vue.Store({
  state: {count: 0 }
})
```

##### 3.2.1 组件访问 State 中数据的第一种方式：
`this.$store.state.全局数据名称`

##### 3.2.2 组件访问 State 中数据的第二种方式：
```js
//1. 从 vuex 中按需导入 mapState 函数
import { mapState } from 'vuex'
```
通过刚才导入的 `mapStore` 函数，将当前组件需要的全局数据，映射为当前组件的 `computed` 计算属性：
```js
//2. 将全局数据，映射为当前组件的计算属性
computed: {
  ...mapState(['count'])
}
```

#### 3.3 Mutation
**Mutation** 用于变更 Store 中的数据，触发 mutations 的第一种方式

1. **只能**通过 `mutation` 变更 `Store` 数据，不可以直接操作 Store 中的数据。
2. 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化。
- 定义Mutation
```js
//定义 Mutation
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      //变更状态
      state.count++;
    }
  }
})
```
##### 3.3.1 触发 mutations 的第一种方式:
```js 
//触发mutation
methods: {
  handle1() {
    // 触发 mutations 的第一种方式
    this.$store.commit('add');
  }
}
```

**可以在触发 mutations 时传递参数(step):**
```js
//定义 Mutation
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    addN(state, step) {
      //变更状态
      state.count += step;
    }
  }
})
```
```js
//触发 mutation
methods: {
  handle2() {
    // 再调用 commit 函数，触发 mutations 时携带参数
    this.$store.commit('addN', 3)
  }
}
```
##### 3.3.2 触发 mutations 的第二种方式：
```js
//1.从 vuex 中按需导入mapMutations 函数
import {mapMutations} from 'vuex'
```
通过刚才导入的 mapMutations 函数，将需要的 mutations 函数，映射为当前组件的 methods 方法：
```js
//2.将指定的 mutations 函数，映射为当前组件的 methods 函数
methods: {
  ...mapMutations: (['add','addN'])
}
```
> tips: 不要在 **mutations** 函数中执行异步操作

#### 3.4 Action
**Action 用于处理异步任务**。
如果通过异步操作变更数据，必须通过Action，而不能使用 Mutation ，但是在 Action 中还是要通过触发 Mutation 的方式间接变更数据。 
```js
//定义 Action
const store = new Vuex.Store({
  //...省略其他代码
  mutations: {
    add(state) {
      state.count++
    }
  },
  action: {
    addAsync(context) {
      setTimeout(() => {
        //在 actions 中，不能直接修改 state 中的数据
        //必须通过 context.commit() 触发某个 mutation 才行
        context.commit('add')
      }, 1000)
    }
  }
})
```
##### 3.4.1 触发 actions 的第一种方式:
```js
//触发 Action
methods: {
  handle() {
    //触发 acions 的第一种方式，dispatch函数专门用来触发action
    this.$store.dispatch('addAsync')
  }
}
```

**触发 actions 异步任务时携带参数：**
```js
//定义 Action
const store = new Vuex.Store({
  //...省略其他代码
  mutations: {
    addN(state, step) {
      state.count += step;
    }
  },
  action: {
    addNAsync(context, step) {
      setTimeout(() => {
        //在 actions 中，不能直接修改 state 中的数据
        //必须通过 context.commit() 触发某个 mutation 才行
        context.commit('addN', step)
      }, 1000)
    }
  }
})
```
```js
//触发 Action
methods: {
  handle() {
    //触发 acions 的第一种方式
    this.$store.dispatch('addNAsync', 5)
  }
}
```

##### 3.4.2 触发 actions 的第二种方式：
```js
//1. 从 vuex 中按需导入 mapActions 函数
import { mapActions} from 'vuex'
```
通过刚才导入的 mapActions 函数，将需要的 actions 函数映射为当前组件的 methods 方法：
```js
//2. 将指定的 actions 函数映射为当前组件的 methods 函数
methods: {
  ...mapActions(['addAsync','addNAsync'])
}
```

#### 3.5 Getter
**Getter** 用于对 Store 中的数据进行加工处理形成新的数据
1. **Getter** 可以对 **Store** 中已有的数据加工处理后形成新的数据，类似Vue的计算属性。
2. **Store** 中数据发生变化， Getter的数据也会跟着变化。
```js
//定义 Getter
const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    showNum(state) {
      return '当前最新的数量是【'+ state.count +'】'
    }
  }
})
```
##### 3.5.1 使用 getters 的第一种方式：
```js
this.$store.getters.名称
```
##### 3.5.2 使用 getters 的第二种方式：
```js
import { mapGetters } from 'vuex'

computed: {
  ...mapGetters(['showNum'])
}
```
### 4. 使用汇总
#### 4.1 main文件
```js
//main.js
...
import store from './store'

new Vue({
  el: 'app',
  render: h => h(app),
  router,
  //将创建的共享数据对象，挂载到 Vue 实例中
  //所有的组件，就可以直接从 store 中获取全局的数据了
  store,
}).$mount('#app')
```
#### 4.2 方式一
##### 4.2.1 store文件
```js
//store.js文件（1）
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
//Store 中存放的就是全局共享的数据
  state: { 
    count: 0
  },
  //只能通过 mutation 变更 Store 数据，不可以直接操作 Store 中的数据。
  mutations: {
    add(state) {
      //变更状态
      state.count++;
    },
    addN(state, step) {
       //变更状态
      state.count += step;
    },
  },
  action: {
    addAsync(context) {
      setTimeout(() => {
        //在 actions 中，不能直接修改 state 中的数据
        //必须通过 context.commit() 触发某个 mutation 才行
        context.commit('add')
      }, 1000)
    },
    addNAsync(context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
  },
  getters: {
    showNum(state) {
      return '当前最新的数量是:'+ state.count
    },
  },
})

export default store
```
##### 4.2.2 组件1
```js
//组件1（使用方法1）
<template>
<div>
  <h1>这是组件1使用vuex传递数据的方法</h1>
  <div>现在的count为{{ store.state.count }}<div>
  <div>{{$store.getters.showNum}}</div>  
  <button @click="btnAdd">加1</button>
  <button @click="btnAddN">加N</button>
  <button @click="btnAddAsync">异步加1</button>
  <button @click="btnAddNAsync">异步加N</button> 
</div>
</template>

<script>

data(){
  return{}
},
computed: {},
methods: {
  btnAdd() {
    //调用 commit 函数，触发 mutations 时携带参数
    // 触发 mutations 的第一种方式
    this.$store.commit('add');
  }
  btnAddN() {
    this.$store.commit('addN',3);
  },
  btnAddAsync() {
    //触发 acions 的第一种方式，dispatch函数专门用来触发action
    this.$store.dispatch('addAsync');
  }
  btnAddNAsync() {
    this.$store.dispatch('addNAsync', 5)
  }
}
</script>  

```
#### 4.3 方式2

##### 4.3.1 store文件
```js
//store.js文件（2）
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
//Store 中存放的就是全局共享的数据
  state: { 
    count: 0
  },
  //只能通过 mutation 变更 Store 数据，不可以直接操作 Store 中的数据。
  mutations: {
    sub(state) {
       //变更状态
      state.count--;
    },
    subN(state, step) {
       //变更状态
      state.count -= step;
    },
  },
  action: {
    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subNAsync(context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    },
  },
  getters: {
    showNum(state) {
      return '当前最新的数量是:'+ state.count
    },
  },
})

export default store
```
##### 4.3.2 组件2
```js
//组件2（使用方法2）
<template>
<div>
  <h1>这是组件2使用vuex传递数据的方法</h1>
  <div>现在的count为{{ count }}<div>
  <div>{{showNum}}</div>
  <button @click="sub()">减1</button>
  <button @click="subN(3)">减N</button>
  <button @click="subAsync()">异步减1</button>
  <button @click="subNAsync(5)">异步减N</button> 
</div>
</template>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

<script>
data(){
  return{}
},
computed: {
  ...mapState(['count'])
  ...mapGetters(['showNum'])
  
},
methods:{
  // 触发 mutations 的第二种方式
  ...mapMutations: (['sub','subN']),
  ...mapActions(['subAsync','subNAsync']),
</script>  
```