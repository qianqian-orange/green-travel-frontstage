<template>
  <div class="banner-wrapper">
    <div class="slide-banner-scroll" ref="slide">
      <ul class="slide-banner-wrapper">
        <li class="slide-item" v-for="item in list" :key="item.id">
          <a :href="item.outside_link">
            <img :src="item.path" alt="advertisement">
          </a>
          <!-- <router-link :to="`/advertisement?link=${encodeURIComponent(item.outside_link)}`">
            <img :src="item.path" alt="advertisement">
          </router-link> -->
        </li>
      </ul>
    </div>
    <div class="docs-wrapper">
      <span
        class="doc"
        v-for="(item, index) in list"
        :key="index"
        :class="{'active': currentPageIndex === index}"></span>
    </div>
    <svg viewBox="0 0 750 50" class="img_wrap_mask">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path class="img_mask_svgPath" d="M750,1.70530257e-13 L750,50 L0,50 L0,1.70530257e-13 C107.666667,33.3333333 232.666667,50 375,50 C517.333333,50 642.333333,33.3333333 750,1.70530257e-13 Z"></path>
      </g>
    </svg>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from '@better-scroll/core';

export default {
  name: 'HomeSlide',
  data() {
    return {
      slide: null,
      currentPageIndex: 0,
      playTimer: 0,
      list: [],
    };
  },
  mounted() {
    axios.get('/api/advertisement/list')
      .then((res) => {
        const { code, data } = res.data;
        if (code === 0) {
          this.list = data;
          if (this.list.length === 0) return;
          this.$nextTick(() => {
            this.init();
          });
        }
      });
  },
  beforeDestroy() {
    clearTimeout(this.playTimer);
    this.slide.destroy();
  },
  methods: {
    jump() {
      console.log('jump');
    },
    init() {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        slide: {
          loop: true,
          threshold: 100,
        },
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        probeType: 2,
        click: true,
      });
      this.slide.on('scrollEnd', this.onScrollEnd);

      // user touches the slide area
      this.slide.on('beforeScrollStart', () => {
        clearTimeout(this.playTimer);
      });
      // user touched the slide done
      this.slide.on('scrollEnd', () => {
        this.autoGoNext();
      });
      this.slide.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX;
      });
      this.autoGoNext();
    },
    nextPage() {
      this.slide.next();
    },
    prePage() {
      this.slide.prev();
    },
    onScrollEnd() {
      this.autoGoNext();
    },
    autoGoNext() {
      clearTimeout(this.playTimer);
      this.playTimer = setTimeout(() => {
        this.nextPage();
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-wrapper {
  position: relative;

  >.slide-banner-scroll {
    overflow: hidden;

    >.slide-banner-wrapper {
      height: px2rem(160);
      white-space: nowrap;
      font-size: 0;

      .slide-item {
        display: inline-block;
        height: 100%;
        width: 100%;
        img {
          display: block;
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }

  >.docs-wrapper {
    position: absolute;
    bottom: px2rem(56);
    right: px2rem(8);

    >.doc {
      display: inline-block;
      margin: 0 px2rem(4);
      width: px2rem(8);
      height: px2rem(8);
      border-radius: 50%;
      background: rgba(255, 255, 255, .4);

      &.active {
        width: px2rem(20);
        border-radius: px2rem(5);
        background: #fff;
      }
    }
  }

  >.img_wrap_mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: px2rem(4);
    width: 100%;
    max-height: px2rem(72);
    .img_mask_svgPath {
      fill: #fafafc;
      width: 100%;
    }
  }

}
</style>
