<template>
  <div class="public-welfare-detail-container">
    <scroll-header :to="to" title="公益详情" :visible="visible" />
    <public-welfare-card
      v-if="target"
      :target="target"
      @donate="donate" />
    <van-divider :style="{ color: '#222' }">捐赠排名</van-divider>
    <div class="list-container">
      <list-scroll-view
        :dataSource="ranks"
        :loading="loading"
        :finished="finished"
        :interval="400"
        @scroll="scroll">
        <ul class="list">
          <li class="item" v-for="(item, index) in ranks" :key="item.id">
            <span class="rank" :class="icon(index)">{{ index + 1 }}</span>
            <div class="content">
              <span class="name">{{ item.name }}</span>
              <integral :integral="item.integral" />
            </div>
          </li>
        </ul>
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
import Integral from '@/components/Integral/index.vue';
import PublicWelfareCard from './card.vue';

export default {
  name: 'PublicWelfareDetail',
  data() {
    return {
      visible: false,
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
    Integral,
  },
  computed: {
    ...mapState('publicWelfare', {
      list: state => state.list,
    }),
  },
  methods: {
    donate(donate) {
      this.target.donate += donate;
      this.currentPage = 1;
      this.ranks = [];
      this.finished = false;
      this.loading = true;
      this.getRank().finally(() => { this.loading = false; });
    },
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
    icon(index) {
      if (index === 0) return 'gold-cup';
      if (index === 1) return 'sliver-cup';
      if (index === 2) return 'copper-cup';
      return '';
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
.public-welfare-detail-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #fafafc;
  .list-container {
    flex: 1;
    overflow: hidden;
  }
  .list {
    background-color: #fff;
    padding: 0 px2rem(10);
    .item {
      display: flex;
      align-items: center;
      height: px2rem(44);
      border-bottom: 1px solid #f1f1f1;
      &:last-child {
        border-bottom: none;
      }
      .rank {
        width: px2rem(25);
        height: px2rem(24);
        line-height: px2rem(24);
        font-size: px2rem(18);
        font-weight: 700;
        text-align: center;
        color: #F07438;
        &.gold-cup {
          color: transparent;
          @include bg('./imgs/gold-cup.png');
        }
        &.sliver-cup {
          color: transparent;
          @include bg('./imgs/sliver-cup.png');
        }
        &.copper-cup {
          color: transparent;
          @include bg('./imgs/copper-cup.png');
        }
      }
      .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 px2rem(10);
        .name {
          font-size: px2rem(14);
          color: #222;
        }
      }
    }
  }
}
</style>