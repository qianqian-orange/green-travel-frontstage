<template>
  <div class="coupon-list-container">
    <list-scroll-view
      ref="scroll"
      :dataSource="effective"
      :loading="loading"
      :finished="finished"
      :interval="400"
      @scroll="scroll">
      <ul class="coupon-list">
        <li class="coupon-list-item" v-for="item in effective" :key="item.uc_id">
          <coupon
            :integral="item.integral"
            :day="item.day"
            :description="item.description"
            :begin="new Date(item.create_time)"
            @view="view"
            @use="use(item.uc_id)" />
        </li>
      </ul>
    </list-scroll-view>
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import loadmoreMixin from '@/mixins/loadmore';
import Coupon from '@/components/Coupon/index.vue';
import ListScrollView from '@/components/ListScrollView/index.vue';
import { GET_COUPON_DATA } from '@/store/modules/user/mutation-types';

export default {
  name: 'CouponList',
  mixins: [loadmoreMixin],
  components: {
    Coupon,
    ListScrollView,
  },
  computed: {
    effective() {
      return this.list.filter(item => new Date(item.create_time).getTime() + (item.day + 1) * 24 * 60 * 60 * 1000 >= Date.now());
    },
    ...mapState('user', {
      list: state => state.coupon.list,
      pageSize: state => state.coupon.pageSize,
      currentPage: state => state.coupon.currentPage,
      finished: state => state.coupon.finished,
    }),
  },
  methods: {
    view() {
      this.$refs.scroll.refresh();
    },
    use(id) {
      this.$emit('use', id);
    },
    getData() {
      return axios.get('/api/user/couponList', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        },
      })
        .then((result) => {
          const { code, data } = result.data;
          if (code === 0) {
            this[GET_COUPON_DATA](data);
            return;
          }
          this.$notify({ type: 'danger', message: '请求数据失败！' });
        });
    },
    ...mapMutations('user', [GET_COUPON_DATA]),
  },
};
</script>

<style lang="scss" scoped>
.coupon-list-container {
  width: 100%;
  height: 100%;
  .coupon-list {
    padding: px2rem(10);
    .coupon-list-item {
      margin-bottom: px2rem(10);
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>