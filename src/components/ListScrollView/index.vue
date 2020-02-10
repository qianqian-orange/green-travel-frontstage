<template>
  <scroll-view
    :dataSource="dataSource"
    :probeType="3"
    :click="true"
    @scroll="scroll"
  >
    <slot />
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