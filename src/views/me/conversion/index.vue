<template>
  <div class="my-conversion-container fullscreen-fixed-container">
    <div class="header">
      <common-header to="/me" title="我的兑换" />
    </div>
    <list-scroll-view
      :dataSource="list"
      :loading="loading"
      :finished="finished"
      :interval="400"
      @scroll="scroll">
      <div class="list">
        <conversion-list-item
          v-for="item in list"
          :key="item.id"
          :id="item.id"
          :path="item.path"
          :name="item.name"
          :description="item.description"
          :integral="item.integral">
        </conversion-list-item>
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
import { GET_CONVERSION_DATA } from '@/store/modules/user/mutation-types';
import loadmoreMixin from '@/mixins/loadmore';
import ListScrollView from '@/components/ListScrollView/index.vue';
import CommonHeader from '@/components/CommonHeader/index.vue';
import ConversionListItem from './item.vue';

export default {
  name: 'MyConversion',
  mixins: [loadmoreMixin],
  components: {
    ListScrollView,
    CommonHeader,
    ConversionListItem,
  },
  computed: {
    ...mapState('user', {
      list: state => state.conversion.list,
      pageSize: state => state.conversion.pageSize,
      currentPage: state => state.conversion.currentPage,
      finished: state => state.conversion.finished,
      condition: state => state.conversion.condition,
    }),
  },
  methods: {
    getData() {
      return axios.get('/api/user/conversionList', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          ...this.condition,
        },
      })
        .then((result) => {
          const { code, data } = result.data;
          if (code === 0) {
            this[GET_CONVERSION_DATA](data);
            return;
          }
          this.$notify({ type: 'danger', message: '请求数据失败！' });
        });
    },
    ...mapMutations('user', [GET_CONVERSION_DATA]),
  },
};
</script>

<style lang="scss" scoped>
.my-conversion-container {
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
    background-color: #fff;
  }
}
</style>