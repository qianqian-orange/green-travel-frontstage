<template>
  <ul class="rank-list">
    <li class="item" v-for="(item, index) in list" :key="item.id">
      <span class="rank" :class="icon(index)">{{ index + 1 }}</span>
      <div class="content">
        <span class="name">{{ item.name }}</span>
        <integral :integral="item.integral" />
      </div>
    </li>
  </ul>
</template>

<script>
import Integral from '@/components/Integral/index.vue';

export default {
  name: 'Rank',
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
  },
  components: {
    Integral,
  },
  methods: {
    icon(index) {
      if (index === 0) return 'gold-cup';
      if (index === 1) return 'sliver-cup';
      if (index === 2) return 'copper-cup';
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .rank-list {
    background-color: #fff;
    padding: 0 px2rem(10);
    .item {
      display: flex;
      align-items: center;
      height: px2rem(44);
      border-bottom: 1px solid #f1f1f1;
      &:last-child {
        border-bottom: none;
      }
      .rank {
        width: px2rem(25);
        height: px2rem(24);
        line-height: px2rem(24);
        font-size: px2rem(18);
        font-weight: 700;
        text-align: center;
        color: #F07438;
        &.gold-cup {
          color: transparent;
          @include bg('~@/assets/imgs/cup/gold-cup.png');
        }
        &.sliver-cup {
          color: transparent;
          @include bg('~@/assets/imgs/cup/sliver-cup.png');
        }
        &.copper-cup {
          color: transparent;
          @include bg('~@/assets/imgs/cup/copper-cup.png');
        }
      }
      .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 px2rem(10);
        .name {
          font-size: px2rem(14);
          color: #222;
        }
      }
    }
  }
</style>