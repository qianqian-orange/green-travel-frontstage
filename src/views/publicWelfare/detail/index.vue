<template>
  <div class="public-welfare-detail fullscreen-fixed-container">
    <scroll-header :to="to" />
    <public-welfare-card
      v-if="target"
      :target="target" />
    <van-divider :style="{ color: '#222' }">捐赠排名</van-divider>
    <div class="ank-list-container">
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
      to: '/publicWelfare',
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
    ...mapState('publicWelfare', {
      list: state => state.list,
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
    axios.get('/api/publicWelfare/find', {
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
}
</style>