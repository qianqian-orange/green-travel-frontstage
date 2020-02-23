<template>
  <div class="merchandise-list-container">
    <div class="merchandise-list">
        <div class="item" v-for="item in list" :key="item.id">
          <router-link class="item" :to="`/merchandise/detail/${item.id}`">
            <div class="image-container">
              <van-image class="image" :src="item.path" />
            </div>
            <div class="detail-container">
              <p class="name">{{ item.name }}</p>
              <p class="description">{{ item.description }}</p>
              <integral :integral="item.integral" />
            </div>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import Integral from '@/components/Integral/index.vue';

export default {
  name: 'MerchandiseList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Integral,
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-list-container {
    .merchandise-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        flex-basis: 48%;
        margin-bottom: px2rem(14);
        background-color: #fff;
        border-radius: px2rem(8);
        overflow: hidden;
        .image-container {
          position: relative;
          width: 100%;
          padding-top: 100%;
          .image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
        .detail-container {
          padding: px2rem(10);
          .name {
            font-size: px2rem(14);
            color: #222;
            font-weight: 700;
            margin-bottom: px2rem(4);
            @include mutipleLine(2);
          }
          .description {
            color: #999;
            height: px2rem(48);
            line-height: 1.4;
            font-size: px2rem(12);
            margin-bottom: px2rem(4);
            @include mutipleLine(3);
          }
        }
      }
    }
  }
</style>