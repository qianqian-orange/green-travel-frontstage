<template>
  <div class="merchandise-detail-container">
    <transition name="van-fade">
      <div class="header" v-show="header">
        <router-link to="/merchandise">
          <div class="arrow-container">
            <van-icon name="arrow-left" />
          </div>
        </router-link>
        <h2 class="title">商品详情</h2>
      </div>
    </transition>
    <scroll-view
      :click="true"
      :probeType="3"
      @scroll="scroll"
      ref="scroll">
      <div class="scroll-contaienr">
        <merchandise-detail-card v-if="merchandise" :merchandise="merchandise" @conversion="conversion" />
        <div v-if="others.length > 0">
        <van-divider :style="{ color: '#222' }">看了又看</van-divider>
        <div class="list-container">
          <merchandise-list :list="others" />
        </div>
        </div>
      </div>
    </scroll-view>
    <router-link to="/merchandise">
      <div class="arrow-container">
        <van-icon name="arrow-left" />
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import ScrollView from '@/components/ScrollView/index.vue';
import MerchandiseList from '@/components/MerchandiseList/index.vue';
import MerchandiseDetailCard from './card.vue';

export default {
  name: 'MerchandiseDetail',
  data() {
    return {
      header: false,
      merchandise: null,
    };
  },
  watch: {
    list() {
      this.$refs.scroll.refresh();
    },
    $route(value) {
      const { id } = value.params;
      this.merchandise = this.list.find(item => item.id === +id);
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
  computed: {
    others() {
      const { id } = this.$route.params;
      return this.list.filter(item => item.id !== +id).splice(0, 5);
    },
    ...mapState('merchandise', {
      list: state => state.list,
    }),
    ...mapState('user', {
      user: state => state,
    }),
  },
  components: {
    MerchandiseList,
    MerchandiseDetailCard,
    ScrollView,
  },
  methods: {
    scroll({ y }) {
      if (y <= -80) this.header = true;
      else this.header = false;
    },
    conversion() {
      this.merchandise.stock -= 1;
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.merchandise = this.list.find(item => item.id === +id);
    if (this.merchandise) {
      this.$refs.scroll.refresh();
      return;
    }
    axios.get('/api/merchandise/find', {
      params: {
        id: +id,
      },
    }).then((result) => {
      const { code, data } = result.data;
      if (code === 0) {
        this.merchandise = data;
        this.$refs.scroll.refresh();
        return;
      }
      this.$notify({ type: 'danger', message: '数据请求失败' });
    });
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-detail-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fafafc;
    z-index: 1;
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(44);
      background-color: #fff;
      z-index: 1;
      .title {
        text-align: center;
        line-height: px2rem(44);
        font-size: px2rem(16);
        color: #222;
      }
    }
    .arrow-container {
      position: absolute;
      top: px2rem(7);
      left: px2rem(8);
      width: px2rem(30);
      height: px2rem(30);
      text-align: center;
      line-height: px2rem(30);
      font-size: px2rem(20);
      background-color: #fff;
      border-radius: 50%;
      i {
        line-height: px2rem(30);
      }
    }
    .list-container {
      margin: 0 px2rem(10);
    }
  }
</style>