<template>
  <div class="task-list-item">
    <span class="emoji">{{ emoji[type] }}</span>
    <div class="content-container">
      <div class="primary">
        <p class="title">{{ title }}</p>
        <integral :integral="integral" />
      </div>
      <p class="description">{{ description }}</p>
      <div class="extra">
        <span class="aim">目标: {{ `${aim}${unit}`}}</span>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Integral from '@/components/Integral/index.vue';
import { traffic } from '@/config/emoji';

export default {
  name: 'TaskListItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    aim: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    integral: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      emoji: traffic,
    };
  },
  components: {
    Integral,
  },
  computed: {
    unit() {
      if (this.type === 0) return 'km';
      return '次';
    },
  },
};
</script>

<style lang="scss" scoped>
.task-list-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: px2rem(10);
  &:last-child {
    margin-bottom: 0;
  }
  .emoji {
    font-size: px2rem(42);
    margin-right: px2rem(10);
  }
  .content-container {
    flex: 1;
    .primary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: px2rem(4);
      margin-bottom: px2rem(4);
    }
    .title {
      color: #222;
      font-size: px2rem(14);
      font-weight: 700;
    }
    .description {
      color: #999;
      font-size: px2rem(12);
      line-height: 1.5;
      margin-bottom: px2rem(4);
      @include mutipleLine(2);
    }
    .extra {
      position: relative;
      height: px2rem(26);
      .aim {
        color: #333;
        font-size: px2rem(12);
      }
    }
  }
}
</style>