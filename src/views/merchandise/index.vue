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
      <div class="content-container" ref="content-container">
        <merchandise-list :list="list" />
      </div>
    </list-scroll-view>
    <transition name="detail">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import ListScrollView from '@/components/ListScrollView/index.vue';
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
    ListScrollView,
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
    scroll() {
      this.loading = true;
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
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 54px px2rem(10) 0 px2rem(10);
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
      padding-top: px2rem(10);
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