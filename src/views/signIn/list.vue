<template>
  <ul class="list">
    <li
      v-for="(item, index) in list"
      :key="item.day"
      class="item"
      :class="item.type"
      ref="item"
    >
      <div class="left">第{{ item.day + 1 }}天</div>
      <div class="right">
        <div class="logo"></div>
        <div class="integral">
          <i class="icon icon-tubiao311 iconfont"></i>
          <span>{{ item.integral.toFixed(2) }}</span>
        </div>
        <div class="button" @click="signIn(index)">
          {{ item.type === 'finished' ? '已领取' : '签到领取' }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SignInList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    list() {
      this.$nextTick(() => {
        const index = this.list.findIndex(item => item.type === 'wait');
        this.$emit('scrollToElement', this.$refs.item[index === -1 ? this.list.length - 1 : index - 1]);
      });
    },
  },
  methods: {
    signIn(index) {
      this.$emit('signIn', index);
    },
  },
};
</script>

<style lang="scss" scoped>
  .list {
    padding: 0 px2rem(10);
    .item {
      display: flex;
      justify-content: space-between;
      &.finished, &.active {
        .logo {
          @include bg('./imgs/gold-coin.png');
        }
        .integral {
          color: #F07438;
        }
      }
      &.finished, &.wait {
        .button {
          color: #999;
          background-color: #f1f1f1;
        }
      }
      &.finished {
        .left::after {
          content: "";
          position: absolute;
          top: calc(50% + #{px2rem(14)});
          left: 50%;
          width: 1px;
          height: px2rem(40);
          background-color: #F07438;
        }
      }
      &.active {
        .button {
          color: #fff;
          background-color: #F07438;
        }
      }
      &.wait {
        .logo {
          @include bg('./imgs/copper-coin.png');
        }
        .integral {
          color: #999;
        }
      }
      .left {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2rem(60);
        color: #222;
        font-size: px2rem(14);
      }
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        border-bottom: 1px solid #eee;
        padding: px2rem(14) 0;
        .logo {
          width: px2rem(40);
          height: px2rem(40);
          margin-right: px2rem(14);
        }
        .integral {
          flex: 1;
          line-height: px2rem(40);
          font-size: px2rem(22);
          font-weight: 700;
          .icon {
            font-weight: normal;
            font-size: px2rem(18);
            margin-right: px2rem(4);
          }
        }
        .button {
          width: px2rem(80);
          height: px2rem(32);
          line-height: px2rem(32);
          border-radius: px2rem(16);
          text-align: center;
          font-size: px2rem(14);
        }
      }
    }
  }
</style>