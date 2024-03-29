<template>
  <div class="merchandise-container">
    <div class="header">
      <router-link to="/">
        <span class="arrow"></span>
      </router-link>
      <merchandise-search @search="search" />
    </div>
    <list-scroll-view
      :dataSource="list"
      :loading="loading"
      :finished="finished"
      :interval="400"
      @scroll="scroll"
    >
      <merchandise-list :list="list" />
    </list-scroll-view>
    <transition name="detail">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import ListScrollView from '@/components/ListScrollView/index.vue';
import MerchandiseList from '@/components/MerchandiseList/index.vue';
import { CLEAR, GET_DATA } from '@/store/modules/merchandise/mutation-types';
import MerchandiseSearch from './search.vue';

export default {
  name: 'Merchandise',
  data() {
    return {
      loading: false,
    };
  },
  components: {
    MerchandiseList,
    MerchandiseSearch,
    ListScrollView,
  },
  computed: {
    ...mapState('merchandise', {
      list: state => state.list,
      finished: state => state.finished,
      pageSize: state => state.pageSize,
      currentPage: state => state.currentPage,
      condition: state => state.condition,
    }),
  },
  methods: {
    getData() {
      return axios.get('/api/merchandise/list', {
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
    search() {
      this[CLEAR]();
      this.loading = true;
      this.getData().finally(() => { this.loading = false; });
    },
    scroll() {
      this.loading = true;
      this.getData().finally(() => {
        this.loading = false;
      });
    },
    ...mapMutations('merchandise', [GET_DATA, CLEAR]),
  },
  mounted() {
    if (this.list.length > 0 || this.finished) return;
    this.loading = true;
    this.getData().finally(() => { this.loading = false; });
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: px2rem(64) px2rem(10) 0 px2rem(10);
    .header {
      display: flex;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      height: px2rem(54);
      background-color: #ff0036;
      padding-left: px2rem(24);
      .arrow {
        position: absolute;
        top: px2rem(20);
        left: px2rem(16);
        width: px2rem(10);
        height: px2rem(10);
        border-top: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(-45deg);
        transform-origin: center center;
        @include expand;
      }
    }
  }
</style>