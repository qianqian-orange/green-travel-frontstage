<template>
  <div>
    <home-slide></home-slide>
    <div class="container">
      <home-nav></home-nav>
      <div class="home-market">
        <header>
          <h2 class="title">积分商城</h2>
          <router-link to="/merchandise">
            <span class="arrow"></span>
          </router-link>
        </header>
        <div v-if="list.length === 0" class="loading">
          <van-loading  type="spinner" color="#1989fa" />
        </div>
        <merchandise-list v-else :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MerchandiseList from '@/components/MerchandiseList/index.vue';
import HomeSlide from './HomeSlide/index.vue';
import HomeNav from './HomeNav/index.vue';

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
    MerchandiseList,
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
  .container {
    position: relative;
    margin: 0 px2rem(12);
    padding-top: px2rem(28);
    padding-bottom: px2rem(10);
  }
  .home-market {
    background-color: #fff;
    border-radius: px2rem(8);
    margin-top: px2rem(10);
    padding: px2rem(10);
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
        right: 0;
        width: px2rem(10);
        height: px2rem(10);
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        transform: rotate(45deg);
        transform-origin: center center;
        @include expand;
      }
    }
    .loading {
      text-align: center;
    }
  }
</style>
