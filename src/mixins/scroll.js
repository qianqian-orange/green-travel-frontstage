export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    click: {
      type: Boolean,
      default: false,
    },
    bounce: {
      type: Object,
      default: () => ({
        top: false,
        bottom: false,
        left: false,
        right: false,
      }),
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
};