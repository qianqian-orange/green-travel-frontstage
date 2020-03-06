<template>
  <div class="task-container">
    <div class="header">
      <common-header to="/" title="任务列表" />
    </div>
    <list-scroll-view
      :dataSource="list"
      :loading="loading"
      :finished="finished"
      :interval="400"
      @scroll="scroll">
      <div>
        <router-link v-for="item in list" :key="item.id" :to="`/task/detail/${item.id}`">
          <task-list-item
            :id="item.id"
            :title="item.title"
            :description="item.description"
            :aim="item.aim"
            :type="item.type"
            :integral="item.integral">
            <div class="acquire" :class="item.disabled ? 'disabled' : ''" @click.prevent="acquire(item)">接任务</div>
          </task-list-item>
        </router-link>
      </div>
    </list-scroll-view>
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <transition name="detail">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import loadmoreMixin from '@/mixins/loadmore';
import CommonHeader from '@/components/CommonHeader/index.vue';
import ListScrollView from '@/components/ListScrollView/index.vue';
import TaskListItem from '@/components/TaskListItem/index.vue';
import { GET_DATA, UPDATE_TASK } from '@/store/modules/task/mutation-types';
import { ADD_TASK } from '@/store/modules/user/mutation-types';

export default {
  name: 'Task',
  mixins: [loadmoreMixin],
  components: {
    CommonHeader,
    ListScrollView,
    TaskListItem,
  },
  computed: {
    ...mapState('user', {
      tasks: state => state.tasks,
    }),
    ...mapState('task', {
      list: state => state.list,
      pageSize: state => state.pageSize,
      currentPage: state => state.currentPage,
      finished: state => state.finished,
      condition: state => state.condition,
    }),
  },
  methods: {
    getData() {
      return axios.get('/api/task/list', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          ...this.condition,
        },
      })
        .then((result) => {
          const { code, data } = result.data;
          if (code === 0) {
            this[GET_DATA](data.map(item => ({
              disabled: !!this.tasks.find(task => task.id === item.id),
              ...item,
            })));
            return;
          }
          this.$notify({ type: 'danger', message: '请求数据失败！' });
        });
    },
    acquire({ id, disabled, type }) {
      if (this.loading || disabled) return;
      const tasks = this.tasks.filter(item => item.type === type);
      if (!tasks.every(item => item.status === 1)) {
        this.$toast('请先完成正在进行的同种类型任务！');
        return;
      }
      this.loading = true;
      axios.post('/api/task/acquire', { id })
        .then((result) => {
          const { code, data } = result.data;
          if (code === 0) {
            this[UPDATE_TASK](id);
            this[ADD_TASK](data);
            return;
          }
          this.$notify({ type: 'danger', message: '操作失败！' });
        }).finally(() => {
          this.loading = false;
        });
    },
    ...mapMutations('task', [GET_DATA, UPDATE_TASK]),
    ...mapMutations('user', [ADD_TASK]),
  },
};
</script>


<style lang="scss" scoped>
.task-container {
  box-sizing: border-box;
  padding-top: px2rem(44);
  height: 100%;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
    background-color: #07c160;
  }
  .acquire {
    position: absolute;
    bottom: 0;
    right: 0;
    box-sizing: border-box;
    width: px2rem(60);
    height: px2rem(26);
    padding: px2rem(6);
    border-radius: px2rem(20);
    background-image: linear-gradient(to right, #6cd557, #34c2aa);
    color: #fff;
    text-align: center;
    font-size: px2rem(12);
    font-weight: 700;
    &.disabled {
      opacity: .5;
    }
  }
}
</style>