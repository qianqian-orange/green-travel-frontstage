<template>
  <div class="common-header">
    <router-link :to="to">
      <span class="arrow"></span>
    </router-link>
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '/',
    },
  },
};
</script>

<style lang="scss" scoped>
.common-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: px2rem(16);
  .title {
    color: #fff;
    font-size: px2rem(18);
    margin-left: px2rem(10);
  }
  .arrow {
    position: relative;
    display: block;
    width: px2rem(10);
    height: px2rem(10);
    transform: rotate(-45deg);
    transform-origin: center center;
    border-top: px2rem(2) solid #fff;
    border-left: px2rem(2) solid #fff;
    @include expand;
  }
}
</style>