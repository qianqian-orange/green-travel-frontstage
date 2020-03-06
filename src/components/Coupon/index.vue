<template>
  <div class="coupon-container">
    <div class="primary">
      <div class="left">
        <p class="integral-container">
          <i class="icon icon-tubiao311 iconfont"></i>
          <span class="integral">{{ integral }}</span>
        </p>
        <p class="text">优惠卷</p>
      </div>
      <div class="middle">
        <p class="title">{{ integral }}元抵用卷</p>
        <p class="overdue">有效期至: {{ overdue }}</p>
        <p class="rule" @click="toggle">使用规则 <van-icon class="icon" :name="`arrow-${ collapsed ? 'up' : 'down' }`" /></p>
      </div>
      <div class="right">
        <div class="use" @click="use">立即使用</div>
      </div>
    </div>
    <div class="secondary" v-show="collapsed">
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Coupon',
  props: {
    integral: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: '',
    },
    begin: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    overdue() {
      return moment(new Date(this.begin.getTime() + this.day * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD');
    },
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
      this.$emit('view');
    },
    use() {
      this.$emit('use');
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon-container {
  border-radius: px2rem(10);
  .primary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    padding: px2rem(10);
    height: px2rem(80);
  }
  .secondary {
    background-image: linear-gradient(to bottom, #FBFBFB, #FFFFFF);
    padding: px2rem(10);
    color: #9E9E9E;
    font-size: px2rem(12);
    line-height: 1.2;
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-basis: 20%;
    .text {
      margin-top: px2rem(4);
      color: #DF6E34;
      font-size: px2rem(12);
    }
    .integral-container {
      color: #EF6136;
      .icon {
        font-size: px2rem(12);
      }
      .integral {
        font-weight: 700;
        font-size: px2rem(26);
      }
    }
  }
  .middle {
    flex-basis: 50%;
    .title {
      color: #222;
      font-weight: 700;
      font-size: px2rem(14);
      margin-bottom: px2rem(8);
    }
    .overdue {
      color: #62615F;
      font-size: px2rem(12);
      font-weight: 700;
      margin-bottom: px2rem(8);
    }
    .rule {
      display: flex;
      align-items: center;
      color: #999;
      height: px2rem(14);
      font-size: px2rem(12);
      .icon {
        margin-left: px2rem(4);
      }
    }
  }
  .right {
    flex-basis: 30%;
    .use {
      box-sizing: border-box;
      width: 90%;
      padding: px2rem(6);
      border-radius: px2rem(20);
      background-image: linear-gradient(to right, #F1803D, #EE5948);
      color: #fff;
      text-align: center;
      font-size: px2rem(14);
    }
  }
}
</style>