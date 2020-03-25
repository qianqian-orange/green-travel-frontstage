<template>
  <div class="home-container">
    <div class="header" ref="header">
      <router-link class="link" to="/merchandise">
        <div class="search">
          <van-icon class="icon" name="search" />
          <p class="text">搜索商品</p>
        </div>
      </router-link>
      <router-link to="/me">
        <span class="me">
          <i class="icon iconfont icon-wode"></i>
        </span>
      </router-link>
    </div>
    <scroll-view
      :click="true"
      :dataSource="list">
      <div>
        <home-slide />
        <div class="content-container">
          <router-link to="/analysis">
            <home-detail />
          </router-link>
          <home-nav />
          <div class="home-market">
            <header>
              <h2 class="title">积分商城</h2>
              <router-link to="/merchandise">
                <span class="arrow"></span>
              </router-link>
            </header>
            <merchandise-list :list="list" />
          </div>
        </div>
      </div>
    </scroll-view>
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ScrollView from '@/components/ScrollView/index.vue';
import MerchandiseList from '@/components/MerchandiseList/index.vue';
import HomeSlide from './HomeSlide/index.vue';
import HomeNav from './HomeNav/index.vue';
import HomeDetail from './HomeDetail/index.vue';

export default {
  data() {
    return {
      loading: false,
      list: [],
    };
  },
  components: {
    HomeSlide,
    HomeNav,
    HomeDetail,
    MerchandiseList,
    ScrollView,
  },
  mounted() {
    this.loading = true;
    axios.get('/api/merchandise/list', {
      params: {
        pageSize: 5,
        currentPage: 1,
        name: '',
      },
    }).then((result) => {
      const { code, data } = result.data;
      if (code !== 0) {
        this.$notify({ type: 'danger', message: '数据请求失败！' });
        return;
      }
      this.list = data;
    }).finally(() => {
      this.loading = false;
    });
  },
};

</script>

<style lang="scss" scoped>
  .home-container {
    box-sizing: border-box;
    height: 100%;
    padding-top: px2rem(54);
  }
  .header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(54);
    padding: 0 px2rem(10);
    background-color: rgba(255, 0, 54, 1);
    z-index: 1;
    .link {
      flex: 1;
    }
    .search {
      display: flex;
      align-items: center;
      height: px2rem(34);
      padding: 0 px2rem(10);
      background-color: #fff;
      border-radius: px2rem(4);
      color: #999;
      .icon {
        font-size: px2rem(20);
        margin-right: px2rem(4);
      }
      .text {
        font-size: px2rem(14);
      }
    }
    .me {
      position: relative;
      display: block;
      width: px2rem(24);
      height: px2rem(24);
      color: #fff;
      font-weight: 700;
      margin-left: px2rem(10);
      @include expand();
      .icon {
        font-size: px2rem(24);
      }
    }
  }
  .content-container {
    position: relative;
    margin: 0 px2rem(12);
    padding-top: px2rem(28);
    padding-bottom: px2rem(10);
  }
  .home-market {
    position: relative;
    border-radius: px2rem(8);
    margin-top: px2rem(10);
    >header {
      position: relative;
      margin-bottom: px2rem(10);
      .title {
        color: #333;
        font-size: px2rem(16);
        padding-bottom: px2rem(8);
        border-bottom: 1px solid #eee;
      }
      .arrow {
        position: absolute;
        top: px2rem(2);
        right: px2rem(4);
        width: px2rem(10);
        height: px2rem(10);
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        transform: rotate(45deg);
        transform-origin: center center;
        @include expand;
      }
    }
  }
</style>
