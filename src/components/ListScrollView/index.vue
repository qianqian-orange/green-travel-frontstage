<template>
  <scroll-view
    :dataSource="dataSource"
    :probeType="3"
    :click="true"
    @scroll="scroll"
  >
    <div>
      <slot />
      <div class="end" v-if="dataSource.length > 0">
        <van-divider>我是有底线的</van-divider>
      </div>
      <div class="empty" v-else>暂无相关数据</div>
    </div>
  </scroll-view>
</template>

<script>
import ScrollView from '@/components/ScrollView/index.vue';
import scrollMixin from '@/mixins/scroll';

export default {
  name: 'ListScrollView',
  mixins: [scrollMixin],
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    finished: {
      type: Boolean,
      required: true,
    },
    interval: {
      type: Number,
      default: 300,
    },
  },
  components: {
    ScrollView,
  },
  methods: {
    scroll({ el, y }) {
      if (this.loading || this.finished) return;
      const parentHeight = el.offsetHeight;
      const childrenHeight = el.children[0].offsetHeight;
      if (y + childrenHeight - parentHeight <= this.interval) this.$emit('scroll');
    },
  },
};
</script>

<style lang="scss" scoped>
.end {
  overflow: hidden;
}
.empty {
  text-align: center;
  line-height: px2rem(30);
  font-size: px2rem(14);
  color: #999;
}
</style>