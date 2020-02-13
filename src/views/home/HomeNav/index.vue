<template>
  <div class="home-nav">
    <router-link class="item" to="/signIn">
      <div class="icon daily">
        <span class="text">{{ daily }}</span>
      </div>
      <span class="title">签到</span>
    </router-link>
    <router-link class="item" to="/signIn">
      <span class="icon">
        <i class="iconfont icon-rongyu"></i>
      </span>
      <span class="title">成就</span>
    </router-link>
    <router-link class="item" to="/signIn">
      <span class="icon">
        <i class="iconfont icon-iconfontyouxihudong"></i>
      </span>
      <span class="title">游戏</span>
    </router-link>
    <router-link class="item" to="/signIn">
      <span class="icon">
        <i class="iconfont icon-renwu"></i>
      </span>
      <span class="title">任务</span>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'HomeNav',
  data() {
    return {
      daily: moment().format('DD'),
    };
  },
};
</script>

<style lang="scss" scoped>
  .home-nav {
    position: absolute;
    width: 100%;
    top: px2rem(-52);
    left: 0;
    display: flex;
    justify-content: space-between;
    height: px2rem(56);
    padding: px2rem(4) 0 px2rem(8) 0;
    border-radius: px2rem(8);
    background-color: #fff;
    box-shadow: 0 px2rem(2) px2rem(6) rgba(0,0,0,.08);

    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .icon {
        position: relative;
        width: px2rem(40);
        height: px2rem(40);
        text-align: center;
        line-height: px2rem(40);
        color: #fff;
        border-radius: 50%;
        background-image: linear-gradient(to right,#34c2aa,#6cd557);
        margin-bottom: px2rem(4);
        &.daily {
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('./icon_daily.png');
            background-position: center;
            background-size: cover;
          }
          .text {
            box-sizing: border-box;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            padding-top: px2rem(2);
            text-align: center;
            color: #34c2aa;
            font-weight: 700;
          }
        }
        i {
          font-size: px2rem(22);
        }
      }

      >.title {
        font-size: px2rem(12);
        color: #333;
      }
    }
  }
</style>
