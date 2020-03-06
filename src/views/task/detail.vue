<template>
  <task-detail
    to="/task"
    backgroundColor="#07c160"
    :list="list"
    @get-coupons-data="getCouponsData" />
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import TaskDetail from '@/components/TaskDetail/index.vue';
import { GET_COUPONS_DATA } from '@/store/modules/task/mutation-types';

export default {
  components: {
    TaskDetail,
  },
  computed: {
    ...mapState('task', {
      list: state => state.list,
    }),
  },
  methods: {
    getCouponsData(data) {
      this[GET_COUPONS_DATA](data);
    },
    ...mapMutations('task', [GET_COUPONS_DATA]),
  },
};
</script>