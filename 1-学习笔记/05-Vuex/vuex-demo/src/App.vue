<template>
  <div id="app">
    <div>
      <a-input
        placeholder="请输入任务"
        class="my_ipt"
        :value="inputValue"
        @change="handleInputValue"
      />
      <a-button type="primary" @click="addItemToList">添加事项</a-button>
      <a-list bordered :dataSource="infoList" class="dt_list">
        <a-list-item slot="renderItem" slot-scope="item">
          <!-- 复选框 -->
          <a-checkbox
            :checked="item.done"
            @change="
              (e) => {
                cbStatusChanged(e, item.id);
              }
            "
            >{{ item.info }}</a-checkbox
          >
          <!-- 删除链接                     或@change="cbStatusChanged($event,item.id)" -->
          <a slot="actions" @click="removeItemById(item.id)">删除</a>
        </a-list-item>
        <!-- footer区域 -->
        <div slot="footer" class="footer">
          <!-- 未完成的任务个数 -->
          <span>{{ unDoneLength }}条剩余</span>
          <!-- 操作按钮 -->
          <a-button-group>
            <a-button
              :type="viewKey === 'all' ? 'primary' : 'default'"
              @click="changeList('all')"
              >全部</a-button
            >
            <a-button
              :type="viewKey === 'undone' ? 'primary' : 'default'"
              @click="changeList('undone')"
              >未完成</a-button
            >
            <a-button
              :type="viewKey === 'done' ? 'primary' : 'default'"
              @click="changeList('done')"
              >已完成</a-button
            >
          </a-button-group>
          <!-- 把已经完成的任务清空 -->
          <a @click="clear">清空已完成</a>
        </div>
      </a-list>
      <button @click="getData">获取数据</button>
    </div>
    <div>--------------分割线--------------------</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'app',
  data() {
    return {
      timer: null
    };
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  created() {
    this.$store.dispatch('getList');
  },
  methods: {
    // 监听文本框内容发生变化
    handleInputValue(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$store.commit('setInputValue', e.target.value);
        console.log(123);
      }, 300);
    },
    // 向列表中新增 item 项
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！');
      }
      this.$store.commit('addItem');
    },
    // 根据id删除对应的任务事项
    removeItemById(id) {
      this.$store.commit('removeItem', id);
    },
    // 监听复选框状态变化的事件
    cbStatusChanged(e, id) {
      // 通过 e.target.checked 可以接收到最新的选中状态
      // console.log(e.target.checked, id);
      const param = {
        id: id,
        status: e.target.checked
      };
      this.$store.commit('changeStatus', param);
    },
    // 清除已完成的任务
    clear() {
      this.$store.commit('clearDone');
    },
    // 修改页面上展示的列表数据
    changeList(key) {
      // console.log(key);
      this.$store.commit('changeViewKey', key);
    },
    async getData() {
      const res = await this.axios.post('http://157.122.54.189:9083/login', {
        username: 'dengkui',
        password: 'dengkui'
      });
      console.log(res);
    }
  }
};
</script>

<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
