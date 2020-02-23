<template>
  <div class="item">
    <router-link :to="`/publicWelfare/detail/${id}`">
      <van-image class="image" :src="path" />
      <div class="content-container">
        <p class="title">{{ title }}</p>
        <div class="end">
          <div class="integral">
            <span class="current">{{ donate }}</span> / <span class="total">{{ integral }}</span>
          </div>
          <div class="count">
            <span>{{ hour | fit }}</span>:<span>{{ minute | fit }}</span>:<span>{{ second | fit }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PublicWelfareListItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    integral: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    donate: {
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
    const current = new Date();
    const end = new Date(this.endTime);
    let seconds = parseInt((end.getTime() - current.getTime()) / 1000, 10);
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
.item {
  background-color: #fff;
  margin-bottom: px2rem(10);
  &:last-child {
    margin-bottom: px2rem(0);
  }
  .image {
    width: 100%;
    height: px2rem(136);
  }
  .content-container {
    padding: px2rem(10);
    .title {
      font-size: px2rem(14);
      color: #222;
      font-weight: 700;
      margin-bottom: px2rem(4);
      @include mutipleLine(1);
    }
    .end {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .integral {
        color: #222;
        .current {
          font-weight: 700;
        }
      }
      .count {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: px2rem(64);
        span {
          background-color: #ff0036;
          padding: px2rem(2);
          font-size: px2rem(12);
          color: #fff;
          font-weight: 700;
          border-radius: px2rem(4);
        }
      }
    }
  }
}
</style>