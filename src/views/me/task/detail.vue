<template>
  <task-detail
    to="/me/task"
    backgroundColor="#F07438"
    :list="tasks"
    @get-coupons-data="getCouponsData" />
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import TaskDetail from '@/components/TaskDetail/index.vue';
import { GET_TASK_COUPONS_DATA } from '@/store/modules/user/mutation-types';

export default {
  components: {
    TaskDetail,
  },
  computed: {
    ...mapState('user', {
      tasks: state => state.tasks,
    }),
  },
  methods: {
    getCouponsData(data) {
      this[GET_TASK_COUPONS_DATA](data);
    },
    ...mapMutations('user', [GET_TASK_COUPONS_DATA]),
  },
};
</script>