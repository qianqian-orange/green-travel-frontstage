<template>
  <div class="merchandise-container">
    <div class="header">
      <router-link to="/">
        <span class="arrow"></span>
      </router-link>
      <merchandise-search @search="search" />
    </div>
    <div class="content-container">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :finished-text="list.length === 0 ? '' : '我是有底线的'"
        @load="load"
      >
        <div class="list-container">
          <merchandise-list :list="list" />
          <div class="empty" v-show="list.length === 0 && !loading">暂无相关数据</div>
        </div>
      </van-list>
    </div>
    <transition name="detail">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import MerchandiseList from '@/components/MerchandiseList/index.vue';
import { CLEAR } from '@/store/modules/merchandise/mutation-types';
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
  },
  computed: {
    ...mapState('merchandise', {
      list: state => state.list,
      finished: state => state.finished,
    }),
  },
  methods: {
    handle() {
      this.loading = false;
    },
    load() {
      this.getData(this.handle);
    },
    search() {
      this[CLEAR]();
      this.loading = true;
      this.getTotal();
      this.getData(this.handle);
    },
    ...mapActions('merchandise', ['getData', 'getTotal']),
    ...mapMutations('merchandise', [CLEAR]),
  },
  mounted() {
    this.loading = true;
    this.getTotal();
    this.getData(this.handle);
  },
  destroyed() {
    this[CLEAR]();
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-container {
    padding-top: 74px;
    .header {
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #e43130;
      padding-left: 24px;
      z-index: 1;
      .arrow {
        position: absolute;
        top: 20px;
        left: 16px;
        width: 10px;
        height: 10px;
        border-top: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(-45deg);
        transform-origin: center center;
        @include expand;
      }
    }
    .content-container {
      padding: 0 px2rem(10);
      .list-container {
        padding: px2rem(10);
        background-color: #fff;
        border-radius: px2rem(4);
      }
      .empty {
        text-align: center;
        line-height: px2rem(30);
        font-size: px2rem(14);
        color: #999;
      }
    }
    .detail-enter, .detail-leave-to {
      transform: translateX(100%);
    }
    .detail-enter-active, .detail-leave-active {
        transition: transform .2s ease;
    }
    .detail-enter-to, .detail-leave {
      transform: translateX(0);
    }
  }
</style>