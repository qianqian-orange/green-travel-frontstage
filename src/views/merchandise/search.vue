<template>
  <van-search
    v-model="name"
    shape="round"
    background="#ff0036"
    placeholder="请输入搜索关键字"
    class="search"
    @input="search"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { throttle } from '@/utils/common';
import { UPDATE_CONDITION } from '@/store/modules/merchandise/mutation-types';

export default {
  name: 'MerchandiseSearch',
  data() {
    return {
      name: '',
      search: throttle((name) => {
        this[UPDATE_CONDITION]({ name });
        this.$emit('search', name);
      }),
    };
  },
  computed: {
    ...mapState('merchandise', {
      condition: state => state.condition,
    }),
  },
  methods: {
    ...mapMutations('merchandise', [UPDATE_CONDITION]),
  },
  mounted() {
    this.name = this.condition.name;
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
}
</style>