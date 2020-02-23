<template>
  <div class="scroll-header-container">
    <router-link :to="to">
      <div class="arrow-container">
        <van-icon name="arrow-left" />
      </div>
    </router-link>
    <transition name="van-fade">
      <div class="scroll-header" v-show="visible">
        <router-link :to="to">
          <div class="arrow-container">
            <van-icon name="arrow-left" />
          </div>
        </router-link>
        <h2 class="title">{{ title }}</h2>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ScrollHeader',
  props: {
    to: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: px2rem(44);
  z-index: 99;
  .scroll-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    .title {
      text-align: center;
      line-height: px2rem(44);
      font-size: px2rem(16);
      color: #222;
    }
  }
  .arrow-container {
    position: absolute;
    top: px2rem(7);
    left: px2rem(8);
    width: px2rem(30);
    height: px2rem(30);
    text-align: center;
    line-height: px2rem(30);
    font-size: px2rem(20);
    background-color: #fff;
    border-radius: 50%;
    z-index: 99;
    i {
      line-height: px2rem(30);
    }
  }
}
</style>