<template>
  <div class="home-detail-container">
    <div class="home-detail">
      <div class="left">
        <p class="text">碳积分</p>
        <p class="integral"><i class="icon icon-tubiao311 iconfont"></i>{{ integral | thousnadBitSystem }}</p>
      </div>
      <div class="right">
        <div class="item bicycle">
          <span class="icon iconfont icon-tiyu-zihangche"></span>
          <span class="title">自行车</span>
        </div>
        <div class="item bus">
          <span class="icon iconfont icon-gongjiaoche1"></span>
          <span class="title">公共汽车</span>
        </div>
        <div class="item subway">
          <span class="icon iconfont icon-ditie"></span>
          <span class="title">地铁</span>
        </div>
        <div class="item high-speed-train">
          <span class="icon iconfont icon-jt_gaotie"></span>
          <span class="title">高铁</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomeDetail',
  computed: {
    ...mapState('user', {
      integral: state => state.integral,
    }),
  },
  filters: {
    thousnadBitSystem(value) {
      const [integer, decimal] = String.prototype.split.call(value, '.');
      return `${`${integer}`.replace(/\d(?=(\d{3})+$)/g, '$&,')}${decimal ? `.${decimal}` : ''}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.home-detail-container {
  position: relative;
  width: 100%;
  height: px2rem(120);
  color: #fff;
  border-radius: px2rem(8);
  background-image: linear-gradient(to right,#34c2aa,#6cd557);
  &::before, &::after {
    content: '';
    display: inline-block;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
  }
  &::before {
    width: 54%;
    background-image: url('./seaside-left.png');
    background-position: center bottom;
  }
  &::after {
    width: 46%;
    background-image: url('./seaside-right.png');
    background-position: center px2rem(75);
  }
  >.home-detail {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .left {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      padding: px2rem(10);
      border-right: 1px solid #fff;
      font-size: px2rem(16);
      font-weight: 700;
      overflow: hidden;
      .text {
        margin-bottom: px2rem(8);
      }
      .integral {
        width: 100%;
        text-align: center;
        @include mutipleLine(1);
        .icon {
          font-size: px2rem(14);
          font-weight: 500;
          margin-right: px2rem(2);
        }
      }
    }
    >.right {
      flex: 2;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      >.item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 50%;
        font-size: px2rem(14);
        box-sizing: border-box;
        >.icon {
          font-size: px2rem(20);
          margin-bottom: px2rem(4);
        }
        >.title {
          font-weight: 700;
        }
        &.bicycle {
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
        }
        &.bus {
          border-bottom: 1px solid #fff;
        }
        &.subway {
          border-right: 1px solid #fff;
        }
      }
    }
  }
}
</style>
