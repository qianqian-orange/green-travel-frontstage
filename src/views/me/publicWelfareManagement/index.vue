<template>
  <div class="my-public-welfare-container fullscreen-fixed-container">
    <div class="header">
      <common-header to="/me" title="我的公益" />
    </div>
    <list-scroll-view
      :dataSource="list"
      :loading="loading"
      :finished="finished"
      :interval="400"
      @scroll="scroll">
      <div class="list">
        <router-link class="link" v-for="item in list" :key="item.id" :to="`/me/publicWelfareManagement/detail/${item.id}`">
          <public-welfare-list-item
            :path="item.path"
            :title="item.title"
            :donate="item.donate"
            :integral="item.integral">
            <van-tag plain :type="tag(item.status).type">{{ tag(item.status).text }}</van-tag>
          </public-welfare-list-item>
        </router-link>
      </div>
    </list-scroll-view>
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <transition name="detail">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import { GET_PUBLIC_WELFARE_DATA } from '@/store/modules/user/mutation-types';
import loadmoreMixin from '@/mixins/loadmore';
import CommonHeader from '@/components/CommonHeader/index.vue';
import ListScrollView from '@/components/ListScrollView/index.vue';
import PublicWelfareListItem from '@/components/PublicWelfareListItem/index.vue';

export default {
  name: 'MyPublicWelfare',
  mixins: [loadmoreMixin],
  components: {
    CommonHeader,
    ListScrollView,
    PublicWelfareListItem,
  },
  computed: {
    ...mapState('user', {
      list: state => state.publicWelfare.list,
      pageSize: state => state.publicWelfare.pageSize,
      currentPage: state => state.publicWelfare.currentPage,
      finished: state => state.publicWelfare.finished,
      condition: state => state.publicWelfare.condition,
    }),
  },
  methods: {
    tag(status) {
      if (status === 0) return { type: 'primary', text: '审核中' };
      if (status === 1) return { type: 'success', text: '已通过' };
      if (status === 2) return { type: 'danger', text: '未通过' };
      return {};
    },
    getData() {
      return axios.get('/api/user/publicWelfareList', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          ...this.condition,
        },
      })
        .then((result) => {
          const { code, data } = result.data;
          if (code === 0) {
            this[GET_PUBLIC_WELFARE_DATA](data);
            return;
          }
          this.$notify({ type: 'danger', message: '请求数据失败！' });
        });
    },
    ...mapMutations('user', [GET_PUBLIC_WELFARE_DATA]),
  },
};
</script>

<style lang="scss" scoped>
.my-public-welfare-container {
  box-sizing: border-box;
  padding-top: px2rem(44);
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
    background-color: #F07438;
  }
  .list {
    padding: px2rem(10);
    .link {
      display: block;
      margin-bottom: px2rem(10);
    }
  }
}
</style>