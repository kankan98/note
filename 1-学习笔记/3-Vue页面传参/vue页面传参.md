<font face="微软雅黑" size="2">

## Vue页面传参
- [Vue页面传参](#vue页面传参)
  - [一、标签跳转及传参](#一标签跳转及传参)
  - [二、编程式路由传参](#二编程式路由传参)
  - [三、路由组件传参](#三路由组件传参)
  - [总结](#总结)
### 一、标签跳转及传参
方式1：使用 **path: 路径，query: 参数** 方式传参<br>

```js

//News.vue
<template>
  <div class="news">
      <router-link :to="{path:'/details',query:{id:1}}">详情1</router-link>
</template>
```

```js
//Details.vue
<template>
  <div class="details">
    详情页面{{data}}    //详情页面1
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return{
      data:'',    //data:1
    }
  },
  mounted(){
    this.data = this.$route.query.id;   
  },
}
</script>
```
方式2：使用 **name: 路由名称，params: 参数** 方式传参<br>

```js
//news.vue
<template>
  <div class="news">
      <router-link :to="{ name: 'Details',params:{ id : 2 }}">详情2</router-link>
  </div>
</template>
```

```js
//Details.vue
<template>
  <div class="details">
    详情页面{{data}}      //详情页面2
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return{
      data:'',      //data:2
    }
  },
  mounted(){
    this.data = this.$route.params.id;
  },
}
</script>
```

路由文件：
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Details from '../views/Details'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/news',
    name:'News',
    component: News,
  },
  {
    path:'/details',
    name:'Details',
    component: Details,
  }
]
const router = new VueRouter({
  routes
})
export default router
```

**参考：**
```js

// 字符串
<router-link to="apple"> to apple</router-link>
// 对象
<router-link :to="{ path:'apple'}"> to apple</router-link>
// 命名路由
<router-link :to="{ name: 'applename'}"> to apple</router-link>
//直接路由带查询参数query，地址栏变成 /apple?color=red
<router-link :to="{ path: 'apple', query: {color: 'red' }}"> to apple</router-link>
// 命名路由带查询参数query，地址栏变成/apple?color=red
<router-link :to="{ name: 'applename', query: {color: 'red' }}"> to apple</router-link>
//直接路由带路由参数params，params 不生效，如果提供了 path，params 会被忽略
<router-link :to="{ path: 'apple', params: {color: 'red' }}"> to apple</router-link>
// 命名路由带路由参数params，地址栏是/apple/red

```

### 二、编程式路由传参
方式1：同上方式1
```js
//news.vue
<template>
  <div class="news">
      <button click="goDetails"></button>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return{}
  },
  watch: {},
  computed: {},
  methods: {
    goDetails() {
      this.$router.push({
        path:'/details',
        query:{
          id: 1,
        }
      })
    }
  },
  created() {},
  mounted() {},
}
</script>
```
```js
Detail.vue文件同一：方式1
```

方式2：同上方式2
```js
//news.vue
<template>
  <div class="news">
      <button click="goDetails"></button>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return{}
  },
  watch: {},
  computed: {},
  methods: {
    goDetails() {
      this.$router.push({
        name:'Details',
        params:{
          id: 2,
        }
      })
    }
  },
  created() {},
  mounted() {},
}
</script>
```
```js
Detail.vue文件同一：方式2
```


参考：
```js
// 字符串
router.push('apple')
// 对象
router.push({path:'apple'})
// 命名路由
router.push({name: 'applename'})
//直接路由带查询参数query，地址栏变成 /apple?color=red
router.push({path: 'apple', query: {color: 'red' }})
// 命名路由带查询参数query，地址栏变成/apple?color=red
router.push({name: 'applename', query: {color: 'red' }})
//直接路由带路由参数params，params 不生效，如果提供了 path，params 会被忽略
router.push({path:'applename', params:{ color: 'red' }})
// 命名路由带路由参数params，地址栏是/apple/red
router.push({name:'applename', params:{ color: 'red' }})
```
### 三、路由组件传参
路由文件：
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Details from '../views/Details'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/news',
    name:'News',
    component: News,
  },
  {
    path:'/details/:id',    //修改1：path后面跟占位符
    name:'Details',
    component: Details,
    props:true,     //修改2：props设置为true route.params 将会被设置成组件属性
  }
]
const router = new VueRouter({
  routes
})
export default router
```

```js
//news.vue
<template>
  <div id="news">
      <button @click="goDetails">去详情</button>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return{}
  },
  watch: {},
  computed: {},
  methods: {
    goDetails() {
      this.$router.push({
        name:'Details',
        params:{
          id: 1,
        }
      })
    }
  },
  created() {},
  mounted() {},
}
</script>
```

```js
//Details.vue
<template>
  <div class="details">
    详情页面{{id}}      //详情页面1
  </div>
</template>

<script>
export default {
  components:{},
  props:['id'],
  data(){
    return{
      data:'',
    }
  },  
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){
    console.log(this.$route.params.id,this.id);   //1 1
  },
}
</script>
```
### 总结
**1、关于带参数的路由总结如下：**
- 无论是直接路由“ path " 还是命名路由“ name ”，带查询参数“ **query** ”，地址栏会变成“ **/url?查询参数名：查询参数值** ”;<br>
- 直接路由“path” 带路由参数“params，params” **不生效** ;<br>
- 命名路由“name” 带路由参数**params** 地址栏保持是“**/url/路由参数值**”;

**2、获取参数方法：**

- 在js中：用**this.$route.query.id**取值。<br>
- 在组件中：用{{ $route.query.id}}取值。

**3、设置路由map里的path值：**
-  带路由参数params时，路由map里的path应该写成:  **path:'/details/:id'**。
- 带查询参数query时，路由map里的path应该写成: **path: '/details'**。


> 参考：一根小雪糕<br>
> 链接：https://www.cnblogs.com/freedom-feng/p/11528836.html<br>

> 参考：哥哦狗子<br>
> 参考：https://www.cnblogs.com/superlizhao/p/8527317.html
