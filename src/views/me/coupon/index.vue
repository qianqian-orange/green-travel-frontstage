<template>
  <div class="my-coupon-container fullscreen-fixed-container">
    <div class="header">
      <common-header to="/me" title="我的优惠卷" />
      <span class="refresh" @click="refresh"><i class="iconfont icon-shuaxin2"></i></span>
    </div>
    <coupon-list @use="use" />
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import CommonHeader from '@/components/CommonHeader/index.vue';
import CouponList from '@/components/CouponList/index.vue';
import { GET_COUPON_DATA, CLEAR_COUPON } from '@/store/modules/user/mutation-types';

export default {
  name: 'MyCoupon',
  data() {
    return {
      loading: false,
    };
  },
  components: {
    CommonHeader,
    CouponList,
  },
  computed: {
    ...mapState('user', {
      pageSize: state => state.coupon.pageSize,
      currentPage: state => state.coupon.currentPage,
    }),
  },
  methods: {
    getData() {
      axios.get('/api/user/couponList', {
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
    refresh() {
      this[CLEAR_COUPON]();
      this.loading = true;
      this.getData();
    },
    use() {
      this.$router.push('/merchandise');
    },
    ...mapMutations('user', [GET_COUPON_DATA, CLEAR_COUPON]),
  },
};
</script>

<style lang="scss" scoped>
.my-coupon-container {
  box-sizing: border-box;
  padding-top: px2rem(44);
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
    background-color: #F07438;
    .refresh {
      position: absolute;
      top: px2rem(10);
      right: px2rem(10);
      width: px2rem(24);
      height: px2rem(24);
      color: #fff;
      @include expand();
      i {
        font-size: px2rem(24);
      }
    }
  }
  .coupon-list {
    padding: px2rem(10);
    .item {
      margin-bottom: px2rem(10);
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>