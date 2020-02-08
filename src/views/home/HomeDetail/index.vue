<template>
  <div class="home-detail">
    <div class="wrapper">
      <div class="left">
        <div class="wrapper">
          <span class="icon iconfont icon-carbon-integral"></span>
          <div class="content">
            <p class="title">碳积分</p>
            <p class="quantity">{{ carbonIntegral }}</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item bicycle">
          <span class="icon iconfont icon-bycicle"></span>
          <span class="title">自行车</span>
        </div>
        <div class="item bus">
          <span class="icon iconfont icon-bus"></span>
          <span class="title">公共汽车</span>
        </div>
        <div class="item subway">
          <span class="icon iconfont icon-subway"></span>
          <span class="title">地铁</span>
        </div>
        <div class="item high-speed-train">
          <span class="icon iconfont icon-hign-speed-train"></span>
          <span class="title">高铁</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeDetail',
  data() {
    return {
      carbonIntegral: '10,250',
    };
  },
};
</script>

<style lang="scss">
.home-detail {
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
    width: 55%;
    background-image: url('~@/assets/images/travel.png');
    background-position: center bottom;
  }

  &::after {
    width: 45%;
    background-image: url('~@/assets/images/dingzhi.png');
    background-position: center px2rem(175);
  }

  >.wrapper {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    >.left {
      position: relative;
      flex: 1;
      height: 100%;
      border-right: 1px solid #fff;

      >.wrapper {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        padding: px2rem(10);
        box-sizing: border-box;
        overflow: hidden;
      }

      .icon {
        font-size: px2rem(28);
        margin-right: px2rem(8);
      }

      .content {
        flex: 1;
        padding-top: px2rem(2);
        overflow: hidden;
        >.title {
          font-size: px2rem(14);
          font-weight: 700;
          margin-bottom: px2rem(2);
        }
        >.quantity {
          @include textOverflow;
        }
      }
    }
    >.right {
      display: flex;
      flex-wrap: wrap;
      flex: 2;
      height: 100%;
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

.sun{
  position: absolute;
  top: 10px;
  left: 10px;
  // background:radial-gradient(ellipse at center, #ffd000 1%,#f9b700 39%,#f9b700 39%,#e06317 100%);
  background:radial-gradient(ellipse at center, #a9d557 1%,#7dc738 39%,#7dc738 39%,#1a943e 100%);
  height: px2rem(80);
  width: px2rem(80);
  border-radius: 50%;
  background-position: px2rem(-56) px2rem(-206);
  background-size: 175%;
  // box-shadow: 0 0 10px 2px rgba(255, 107, 0, 0.4), 0 0 22px 11px rgba(255, 203, 0, 0.13);
  box-shadow: 0 0 px2rem(20) px2rem(4) rgba(0, 128, 0, 0.4), 0 0 px2rem(44) px2rem(22) rgba(0, 128, 0, 0.13);
}

// .earth{
//   margin-top: 20px;
//   margin-left: 20px;
//   background:radial-gradient(ellipse at center, #53e3ed 1%,#53bced 39%,#53bced 39%,#4b63ed 100%);
//   height:$sun;
//   width:$sun;
//   border-radius: 50%;
//   background-position: -28px -103px;
//   background-size: 175%;
//   box-shadow: 0 0 10px 2px rgba(83, 162, 237, 0.4), 0 0 22px 11px rgba(23, 94, 185, 0.13);
// }
</style>
