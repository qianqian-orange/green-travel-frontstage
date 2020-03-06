<template>
  <div class="scroll-container" ref="scroll-container">
    <slot />
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import scrollMixin from '@/mixins/scroll';

export default {
  name: 'ScrollView',
  mixins: [scrollMixin],
  watch: {
    dataSource() {
      this.refresh();
    },
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        // console.log(this.$refs['scroll-container'].children[0].offsetHeight);
        this.scroll.refresh();
      });
    },
    scrollTo(x, y) {
      this.scroll.scrollTo(x, y);
    },
    scrollToElement(el) {
      this.scroll.scrollToElement(el);
    },
    initScroll() {
      this.scroll = new BScroll(this.$refs['scroll-container'], {
        probeType: this.probeType,
        click: this.click,
        bounce: this.bounce,
      });
      if (this.probeType !== 0) {
        this.scroll.on('scroll', ({ x, y }) => {
          this.$emit('scroll', {
            x,
            y,
            el: this.$refs['scroll-container'],
          });
        });
      }
    },
  },
  mounted() {
    this.initScroll();
  },
  beforeDestroy() {
    this.scroll.destroy();
  },
};
</script>

<style scoped lang="scss">
.scroll-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>