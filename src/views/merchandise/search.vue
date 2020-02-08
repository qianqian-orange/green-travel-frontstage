<template>
  <van-search
    v-model="name"
    shape="round"
    background="#e43130"
    placeholder="请输入搜索关键字"
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