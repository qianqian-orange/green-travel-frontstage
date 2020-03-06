<template>
  <div class="header-container">
    <div class="image-container">
      <van-image
        class="image"
        :src="require(`@/assets/imgs/level/level${level}-active.png`)" />
    </div>
    <p class="primary">Lv.{{ level }}</p>
    <div class="progress-container">
      <div class="bg-progress"></div>
      <div class="active-progress" :style="{ width }"></div>
    </div>
    <div class="secondary">
      <p v-if="level < 15">还需<span class="need">{{ total - current }}</span>成长值，就能升级为<span class="level">Lv.{{ level + 1 }}</span></p>
      <p>{{ percent }}%的人在此等级</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LevelHeader',
  props: {
    level: {
      type: Number,
      default: 1,
    },
    current: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 400,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    width() {
      return `${Math.ceil(this.current / this.total * 100)}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  height: px2rem(256);
  width: 100%;
  background-color: #2B1420;
  overflow: hidden;
  &::before, &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: px2rem(60);
    background-color: #F4F4F4;
    bottom: px2rem(-26);
    z-index: 99;
  }
  &::before {
    left: -50%;
    transform: rotate(10deg);
  }
  &::after {
    right: -50%;
    transform: rotate(-10deg);
  }
  .image-container {
    display: flex;
    justify-content: center;
    padding: px2rem(10) 0;
    .image {
      width: px2rem(176);
      height: px2rem(140);
    }
  }
  .primary {
    text-align: center;
    font-style: italic;
    color: #fff;
    font-weight: 700;
    font-size: px2rem(18);
    margin-bottom: px2rem(8);
  }
  .progress-container {
    position: relative;
    width: 80%;
    height: px2rem(4);
    margin: 0 auto px2rem(8) auto;
    border-radius: px2rem(4);
    overflow: hidden;
    .bg-progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #938B80;
    }
    .active-progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: #F07438;
    }
  }
  .secondary {
    color: #fff;
    font-size: px2rem(12);
    text-align: center;
    line-height: 1.5;
    font-weight: 600;
    .level, .need {
      font-style: italic;
      font-weight: 700;
    }
  }
}
</style>