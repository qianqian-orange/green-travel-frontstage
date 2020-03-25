<template>
  <div class="me-container">
    <scroll-view :click="true">
      <div>
        <div class="header-container">
          <div class="header">
            <common-header to="/" />
          </div>
          <div class="avatar">
            <van-image round :src="require('@/assets/avatar.jpg')" />
          </div>
          <p class="name">{{ user.name }}</p>
          <svg viewBox="0 0 750 50" class="img_wrap_mask">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path class="img_mask_svgPath" d="M750,1.70530257e-13 L750,50 L0,50 L0,1.70530257e-13 C107.666667,33.3333333 232.666667,50 375,50 C517.333333,50 642.333333,33.3333333 750,1.70530257e-13 Z"></path>
            </g>
          </svg>
        </div>
        <van-cell-group title="基本信息">
          <van-cell title="碳积分">
            <integral :integral="user.integral" />
          </van-cell>
          <van-cell title="等级">
            <van-image
              class="image"
              :src="require(`@/assets/imgs/level/level${user.level}-active.png`)" />
          </van-cell>
          <van-cell title="骑行" :value="`${user.bicycleMileage}km`"></van-cell>
          <van-cell title="公交" :value="`${user.busCount}次`"></van-cell>
          <van-cell title="地铁" :value="`${user.subwayCount}次`"></van-cell>
          <van-cell title="高铁" :value="`${user.railCount}次`"></van-cell>
        </van-cell-group>
        <van-cell-group title="基本功能">
          <van-cell title="我的兑换" is-link to="/me/conversion"></van-cell>
          <van-cell title="我的公益" is-link to="/me/publicWelfareManagement"></van-cell>
          <van-cell title="我的任务" is-link to="/me/task"></van-cell>
          <van-cell title="我的优惠卷" is-link to="/me/coupon"></van-cell>
        </van-cell-group>
      </div>
    </scroll-view>
    <transition name="detail">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ScrollView from '@/components/ScrollView/index.vue';
import CommonHeader from '@/components/CommonHeader/index.vue';
import Integral from '@/components/Integral/index.vue';

export default {
  name: 'Me',
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
  },
  components: {
    ScrollView,
    CommonHeader,
    Integral,
  },
};
</script>

<style lang="scss" scoped>
  .me-container {
    width: 100%;
    height: 100%;
    .header-container {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: px2rem(240);
      @include bg('~@/assets/bg.jpeg');
      .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: px2rem(44);
      }
      .avatar {
        box-sizing: border-box;
        width: px2rem(80);
        height: px2rem(80);
        border: px2rem(2) solid #fff;
        box-shadow: 0 0 8px rgba(255, 255, 255, .8);
        border-radius: 50%;
        margin-bottom: px2rem(10);
      }
      .name {
        color: #fff;
        font-weight: 700;
        font-size: px2rem(16);
        margin-bottom: px2rem(4);
      }
      .level-container {
        display: flex;
        align-items: center;
      }
      .img_wrap_mask {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        .img_mask_svgPath {
          fill: #fafafc;
          width: 100%;
        }
      }
    }
    .image {
      width: px2rem(28);
      height: px2rem(20);
    }
  }
</style>

<style lang="scss">
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
  }
</style>