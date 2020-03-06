<template>
  <div class="public-welfare-detail fullscreen-fixed-container">
    <scroll-header :to="to" title="公益详情" />
    <public-welfare-card
      v-if="target"
      :target="target" />
    <div v-if="target && target.status === 2" class="reason-container">
      <p class="title">原因</p>
      <p class="content">{{ target.reason }}</p>
    </div>
    <van-divider :style="{ color: '#222' }">捐赠排名</van-divider>
    <div class="rank-list-container">
      <list-scroll-view
        :dataSource="ranks"
        :loading="loading"
        :finished="finished"
        :interval="400"
        @scroll="scroll">
        <rank :list="ranks"/>
      </list-scroll-view>
    </div>
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import ScrollHeader from '@/components/ScrollHeader/index.vue';
import ListScrollView from '@/components/ListScrollView/index.vue';
import Rank from '@/components/Rank/index.vue';
import PublicWelfareCard from './card.vue';

export default {
  name: 'PublicWelfareDetail',
  data() {
    return {
      target: null,
      to: '/me/publicWelfareManagement',
      loading: false,
      ranks: [],
      currentPage: 1,
      pageSize: 10,
      finished: false,
    };
  },
  components: {
    ScrollHeader,
    PublicWelfareCard,
    ListScrollView,
    Rank,
  },
  computed: {
    ...mapState('user', {
      list: state => state.publicWelfare.list,
    }),
  },
  methods: {
    getRank() {
      this.loading = true;
      return axios.get('/api/publicWelfare/rank', {
        params: {
          id: this.target.id,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        },
      }).then((result) => {
        const { code, data } = result.data;
        if (code === 0) {
          this.ranks = this.ranks.concat(data);
          this.currentPage += 1;
          if (data.length === 0) this.finished = true;
          return;
        }
        this.$notify({ type: 'danger', message: '请求数据失败！' });
      }).finally(() => {
        this.loading = false;
      });
    },
    scroll() {
      this.loading = true;
      this.getRank().finally(() => {
        this.loading = false;
      });
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.target = this.list.find(item => item.id === +id);
    if (this.target) {
      this.getRank();
      return;
    }
    this.loading = true;
    axios.get('/api/user/publicWelfareDetail', {
      params: {
        id: +id,
      },
    }).then((result) => {
      const { code, data } = result.data;
      if (code === 0) {
        this.target = data;
        this.getRank();
        return;
      }
      this.$router.replace(this.to);
      this.$notify({ type: 'danger', message: '数据请求失败' });
    }).finally(() => {
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.public-welfare-detail {
  display: flex;
  flex-direction: column;
  .rank-list-container {
    flex: 1;
    overflow: hidden;
  }
  .reason-container {
    background-color: #fff;
    margin-top: px2rem(10);
    padding: px2rem(10);
    .title {
      font-size: px2rem(14);
      color: #969799;
      margin-bottom: px2rem(4);
    }
    .content {
      font-size: px2rem(12);
      color: #222;
      line-height: 1.5;
    }
  }
}
</style>