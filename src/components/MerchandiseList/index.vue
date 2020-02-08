<template>
  <ul class="merchandise-list">
    <router-link :to="`/merchandise/detail/${item.id}`" v-for="item in list" :key="item.id">
      <li class="item">
        <img alt="shop picture" :src="item.path"/>
        <div class="content">
          <p class="name">{{ item.name }}</p>
          <p class="description">{{ item.description }}</p>
          <div class="integral">
            <i class="icon icon-tubiao311 iconfont"></i>
            <span class="pre-integral">{{ item.integral | preIntegral }}</span>
            <span class="last-integral">{{ item.integral | lastIntegral }}</span>
          </div>
        </div>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'MerchandiseList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  filters: {
    preIntegral(integral) {
      return parseInt(integral, 10);
    },
    lastIntegral(integral) {
      const [, decimal] = `${integral}`.split('.');
      return decimal ? `.${decimal}` : '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-list {
    a:last-child {
      .item {
        border-bottom: none;
      }
    }
    .item {
      display: flex;
      padding: px2rem(4) 0;
      border-bottom: 1px solid #eee;
      >img {
        width: px2rem(80);
        height: px2rem(80);
        margin-right: px2rem(8);
      }
      >.content {
        position: relative;
        flex: 1;
        >.name {
          color: #333;
          font-size: px2rem(14);
          padding-bottom: px2rem(4);
          @include mutipleLine(2);
        }
        >.description {
          line-height: 1.2;
          color: #999;
          @include mutipleLine(3);
        }
        .integral {
          display: flex;
          align-items: flex-end;
          position: absolute;
          right: 0;
          bottom: 0;
          color: #f42;
          .icon {
            font-size: px2rem(14);
            margin-right: px2rem(2);
          }
          .pre-integral {
            font-size: px2rem(18);
            font-weight: 700;
          }
          .last-integral {
            font-size: px2rem(14);
            font-weight: 700;
          }
        }
      }
    }
  }
</style>