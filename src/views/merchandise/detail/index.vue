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
    <div class="scroll-container" ref="scroll-container">
      <div class="scroll-wrapper" v-if="merchandise">
        <div class="image-container">
          <van-image
            :src="merchandise.path"
            class="image"
          />
          <router-link to="/merchandise">
            <div class="arrow-container">
              <van-icon name="arrow-left" />
            </div>
          </router-link>
        </div>
        <div class="content-container">
          <p class="name">{{ merchandise.name }}</p>
          <p class="description">{{ merchandise.description }}</p>
          <div class="integral-container">
            <div class="integral">
              <i class="icon icon-tubiao311 iconfont"></i>
              <span class="pre-integral">{{ merchandise.integral | preIntegral }}</span>
              <span class="last-integral">{{ merchandise.integral | lastIntegral }}</span>
            </div>
            <van-button type="primary" size="small">兑换</van-button>
          </div>
        </div>
        <div v-if="others.length > 0">
        <van-divider :style="{ color: '#222' }">看了又看</van-divider>
          <div class="list-container">
            <merchandise-list :list="others" />
          </div>
        </div>
        <p class="end">我是有底线的</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import BScroll from '@better-scroll/core';
import MerchandiseList from '@/components/MerchandiseList/index.vue';

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
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    $route(value) {
      const { id } = value.params;
      this.merchandise = this.list.find(item => item.id === +id);
      this.scroll.scrollTo(0, 0);
    },
  },
  computed: {
    ...mapState('merchandise', {
      list: state => state.list,
    }),
    others() {
      const { id } = this.$route.params;
      return this.list.filter(item => item.id !== +id).splice(0, 5);
    },
  },
  components: {
    MerchandiseList,
  },
  filters: {
    preIntegral(integral) {
      return parseInt(integral, 10);
    },
    lastIntegral(integral) {
      const [, decimal] = `${integral}`.split('.');
      return decimal ? `.${decimal}` : '';
    },
  },
  methods: {
    scrollHandler({ y }) {
      if (y <= -80) this.header = true;
      else this.header = false;
    },
    initScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs['scroll-container'], {
          bounce: false,
          probeType: 3,
          click: true,
        });
        this.scroll.on('scroll', this.scrollHandler);
      });
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.merchandise = this.list.find(item => item.id === +id);
    if (this.merchandise) {
      this.initScroll();
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
        this.initScroll();
        return;
      }
      this.$notify({ type: 'danger', message: '数据请求失败' });
    });
  },
  destroyed() {
    this.scroll.destroy();
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
    .scroll-container {
      width: 100%;
      height: 100%;
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
    .image-container {
      position: relative;
      width: 100%;
      padding-top: 100%;
      .image {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      }
    }
    .content-container {
      padding: px2rem(12);
      background-color: #fff;
      .name {
        color: #222;
        font-size: px2rem(16);
        font-weight: 700;
        margin-bottom: px2rem(4);
      }
      .description {
        color: #999;
        font-size: px2rem(12);
        line-height: 1.5;
        margin-bottom: px2rem(4);
      }
      .integral-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .integral {
        display: flex;
        align-items: flex-end;
        color: #f42;
        .icon {
          font-size: px2rem(14);
          margin-right: px2rem(2);
          line-height: 1.5;
        }
        .pre-integral {
          font-size: px2rem(36);
          font-weight: 700;
          line-height: 1;
        }
        .last-integral {
          font-size: px2rem(14);
          font-weight: 700;
          line-height: 1.5;
        }
      }
    }
    .list-container {
      margin: 0 px2rem(10);
      padding: px2rem(10);
      background-color: #fff;
    }
    .end {
      color: #969799;
      font-size: px2rem(14);
      line-height: px2rem(50);
      text-align: center;
    }
  }
</style>