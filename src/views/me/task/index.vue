<template>
  <div class="my-task-container fullscreen-fixed-container">
    <div class="header">
      <common-header to="/me" title="我的任务" />
      <span class="refresh" @click="taskCheckCore"><i class="iconfont icon-shuaxin2"></i></span>
    </div>
    <list-scroll-view
      :dataSource="tasks"
      :finished="true">
      <div>
        <router-link v-for="item in tasks" :key="item.id" :to="`/me/task/detail/${item.id}`">
          <task-list-item
            :id="item.id"
            :title="item.title"
            :description="item.description"
            :aim="item.aim"
            :type="item.type"
            :integral="item.integral">
            <div class="acquire" @click.prevent="acquire(item)">
              {{ item.status === 0 ? '进行中' : item.acquire === 0 ? '可领取' : '已领取' }}
            </div>
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
import CommonHeader from '@/components/CommonHeader/index.vue';
import ListScrollView from '@/components/ListScrollView/index.vue';
import TaskListItem from '@/components/TaskListItem/index.vue';
import { GET_TASK_DATA, ACQUIRE } from '@/store/modules/user/mutation-types';

export default {
  name: 'MyTask',
  data() {
    return {
      loading: false,
    };
  },
  components: {
    CommonHeader,
    ListScrollView,
    TaskListItem,
  },
  computed: {
    ...mapState('user', {
      tasks: state => state.tasks,
    }),
  },
  methods: {
    acquire({ status, acquire, id }) {
      if (status === 0) return;
      if (acquire === 1) return;
      this.loading = true;
      axios.post('/api/user/taskAcquire', {
        id,
      }).then((result) => {
        const { code, data } = result.data;
        if (code === 0) {
          this[ACQUIRE]({ id, ...data });
          return;
        }
        this.$notify({ type: 'danger', message: '领取奖励失败！' });
      }).finally(() => {
        this.loading = false;
      });
    },
    taskCheck(type) {
      if (!this.tasks.find(item => item.type === type && item.status === 0)) return Promise.resolve();
      return axios.post('/api/user/taskCheck', { type })
        .then((result) => {
          const { code } = result.data;
          if (code !== 0) this.$notify({ type: 'danger', message: '更新任务进度失败！' });
        });
    },
    taskCheckCore() {
      const types = [0, 1, 2, 3];
      Promise.all(types.map(item => this.taskCheck(item)))
        .then(() => {
          axios.get('/api/user/taskList')
            .then((result) => {
              const { code, data } = result.data;
              if (code === 0) {
                this[GET_TASK_DATA](data);
                return;
              }
              this.$notify({ type: 'danger', message: '请求数据失败！' });
            });
        });
    },
    ...mapMutations('user', [GET_TASK_DATA, ACQUIRE]),
  },
  mounted() {
    this.taskCheckCore();
  },
};
</script>


<style lang="scss" scoped>
.my-task-container {
  box-sizing: border-box;
  padding-top: px2rem(44);
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
    background-color: #F07438;
    .refresh {
      position: absolute;
      top: px2rem(10);
      right: px2rem(10);
      width: px2rem(24);
      height: px2rem(24);
      color: #fff;
      @include expand();
      i {
        font-size: px2rem(24);
      }
    }
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
    background-image: linear-gradient(to right, #F1803D, #EE5948);
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