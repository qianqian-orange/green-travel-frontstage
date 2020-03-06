<template>
  <div class="count" v-if="hour !== 0 || minute !== 0 || second !== 0">
    <span :style="{ backgroundColor }">{{ hour | fit }}</span>:<span :style="{ backgroundColor }">{{ minute | fit }}</span>:<span :style="{ backgroundColor }">{{ second | fit }}</span>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    backgroundColor: {
      type: String,
      default: '#07c160',
    },
    begin: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      timer: null,
    };
  },
  filters: {
    fit(value) {
      return `${value}`.padStart(2, '0');
    },
  },
  mounted() {
    let seconds = parseInt((this.end - this.begin) / 1000, 10);
    if (seconds <= 0) return;
    this.hour = parseInt(seconds / 60 / 60, 10);
    seconds -= this.hour * 60 * 60;
    this.minute = parseInt(seconds / 60, 10);
    this.second = seconds % 60;
    this.timer = setInterval(() => {
      this.second -= 1;
      if (this.second < 0) {
        this.minute -= 1;
        this.second = 60;
      }
      if (this.minute < 0) {
        this.hour -= 1;
        this.minute = 60;
      }
      if (this.hour < 0) {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        clearInterval(this.timer);
      }
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: px2rem(64);
  span {
    padding: px2rem(2);
    font-size: px2rem(12);
    color: #fff;
    font-weight: 700;
    border-radius: px2rem(4);
  }
}
</style>