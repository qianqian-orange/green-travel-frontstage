export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    scroll() {
      this.loading = true;
      this.getData().finally(() => {
        this.loading = false;
      });
    },
  },
  mounted() {
    if (this.list.length > 0 || this.finished) return;
    this.loading = true;
    this.getData().finally(() => { this.loading = false; });
  },
};