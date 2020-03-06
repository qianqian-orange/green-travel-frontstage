<template>
  <div class="public-welfare-container">
    <div class="header">
      <common-header to="/" title="公益列表" />
      <router-link class="release" to="/publicWelfare/release">
        <van-icon name="plus" />
      </router-link>
    </div>
    <list-scroll-view
      :dataSource="list"
      :loading="loading"
      :finished="finished"
      :interval="400"
      @scroll="scroll">
      <div class="list">
        <router-link class="link" v-for="item in list" :key="item.id" :to="{ path: `/publicWelfare/detail/${item.id}` }">
          <public-welfare-list-item
            :path="item.path"
            :title="item.title"
            :donate="item.donate"
            :integral="item.integral">
            <counter
              v-if="overdue(item.end_time)"
              :begin="Date.now()"
              :end="new Date(item.end_time).getTime()" />
            <van-tag v-else plain type="success">已截止</van-tag>
          </public-welfare-list-item>
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
import { GET_DATA } from '@/store/modules/publicWelfare/mutation-types';
import PublicWelfareListItem from '@/components/PublicWelfareListItem/index.vue';
import Counter from '@/components/Counter/index.vue';

export default {
  name: 'PublicWelfare',
  data() {
    return {
      loading: false,
    };
  },
  components: {
    CommonHeader,
    ListScrollView,
    PublicWelfareListItem,
    Counter,
  },
  computed: {
    ...mapState('publicWelfare', {
      list: state => state.list,
      pageSize: state => state.pageSize,
      currentPage: state => state.currentPage,
      finished: state => state.finished,
      condition: state => state.condition,
    }),
  },
  methods: {
    overdue(endTime) {
      return new Date(endTime).getTime() > Date.now();
    },
    getData() {
      return axios.get('/api/publicWelfare/list', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          ...this.condition,
        },
      })
        .then((result) => {
          const { code, data } = result.data;
          if (code === 0) {
            this[GET_DATA](data);
            return;
          }
          this.$notify({ type: 'danger', message: '请求数据失败！' });
        });
    },
    scroll() {
      this.loading = true;
      this.getData().finally(() => {
        this.loading = false;
      });
    },
    ...mapMutations('publicWelfare', [GET_DATA]),
  },
  mounted() {
    if (this.list.length > 0 || this.finished) return;
    this.loading = true;
    this.getData().finally(() => { this.loading = false; });
  },
};
</script>

<style lang="scss" scoped>
.public-welfare-container {
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
    .release {
      position: absolute;
      top: 0;
      right: px2rem(10);
      i {
        line-height: px2rem(44);
        font-size: px2rem(20);
        font-weight: 700;
        color: #fff;
      }
    }
  }
  .list {
    padding: px2rem(10);
    .link {
      display: block;
      margin-bottom: px2rem(10);
    }
  }
}
</style>