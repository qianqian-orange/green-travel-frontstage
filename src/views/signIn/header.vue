<template>
  <div class="signIn-header">
    <div class="avatar">
      <van-image round :src="require('./imgs/avatar.jpg')" />
    </div>
    <div class="content">
      <div class="left">
        <p class="title">碳积分</p>
        <p class="value">{{ user.integral }}</p>
      </div>
      <div class="right">
        <p class="title">连续签到（天）</p>
        <p class="value">{{ day === 0 ? 0 : `${day}`.padStart(2, '0') }}</p>
      </div>
    </div>
    <router-link to="/">
      <span class="arrow"></span>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SignInHeader',
  props: {
    day: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .signIn-header {
    position: relative;
    display: flex;
    height: px2rem(50);
    padding: px2rem(30) px2rem(40) px2rem(20) px2rem(20);
    color: #fff;
    @include bg('./imgs/bg.jpeg');
    .avatar {
      box-sizing: border-box;
      width: px2rem(50);
      height: px2rem(50);
      border: px2rem(2) solid #fff;
      box-shadow: 0 0 8px rgba(255, 255, 255, .8);
      border-radius: 50%;
      margin-right: px2rem(20);
    }
    .content {
      display: flex;
      flex: 1;
      height: px2rem(50);
      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-basis: 40%;
        border-right: 1px solid rgba(255, 255, 255, .4);
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding-left: px2rem(30);
      }
      .title {
        font-size: px2rem(16);
        margin-bottom: px2rem(4);
      }
      .value {
        font-size: px2rem(26);
        font-weight: 700;
      }
    }
    .arrow {
      position: absolute;
      top: px2rem(12);
      left: px2rem(16);
      width: px2rem(10);
      height: px2rem(10);
      border-top: px2rem(2) solid #fff;
      border-left: px2rem(2) solid #fff;
      transform: rotate(-45deg);
      transform-origin: center center;
      @include expand;
    }
  }
</style>