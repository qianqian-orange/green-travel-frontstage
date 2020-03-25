<template>
  <div class="integral" :style="{ color }">
    <i class="icon icon-tubiao311 iconfont"></i>
    <span class="pre-integral">{{ integral | preIntegral }}</span>
    <span class="last-integral">{{ integral | lastIntegral }}</span>
  </div>
</template>

<script>
export default {
  name: 'Integral',
  props: {
    integral: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: '#f42',
    },
  },
};
</script>

<style lang="scss" scoped>
.integral {
  display: flex;
  align-items: baseline;
  .icon {
    font-size: px2rem(14);
    margin-right: px2rem(2);
  }
  .pre-integral {
    font-size: px2rem(18);
    font-weight: 700;
  }
  .last-integral {
    font-size: px2rem(14);
    font-weight: 700;
  }
}
</style>