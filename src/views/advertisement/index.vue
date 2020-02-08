<template>
  <div class="advertisement-container">
    <!-- <div class="header">
      <span class="arrow"></span>
    </div> -->
    <iframe
      :src="link"
      id="page"
      name="page"
      frameborder="0"
      scrolling="no"
      class="page"
      @load="load"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Advertisement',
  computed: {
    link() {
      return this.$route.query.link;
    },
  },
  methods: {
    load() {
      // const page = document.querySelector('#page');
      // page.height = 8888;
      // console.log(page.contentWindow.documentElement);
      // const { page } = window.frames;
      // console.log(page);
      // page.height = '8888';
    },
  },
  mounted() {
    // page.height = 888;
    // const { page } = window.frames;
    // console.log(page.window);
    // page.height = 8888;
    // page.height = page.window.document.body.offsetHeight;
    // console.log(page.window.document.body.scrollHeight);
  },
};
</script>

<style lang="scss" scoped>
  .advertisement-container {
    .header {
      position: relative;
      width: 100%;
      height: px2rem(50);
      background-color: #67c23a;
      .arrow {
        position: absolute;
        top: px2rem(20);
        left: px2rem(20);
        width: px2rem(10);
        height: px2rem(10);
        border-top: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(-45deg);
        transform-origin: center center;
        @include expand;
      }
    }
    .page {
      width: 100%;
    }
  }
</style>