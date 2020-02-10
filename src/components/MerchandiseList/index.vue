<template>
  <div class="merchandise-list-container">
    <div class="merchandise-list">
      <router-link class="item" :to="`/merchandise/detail/${item.id}`" v-for="item in list" :key="item.id">
        <div class="content-container">
          <div class="image-container">
            <img :src="item.path"/>
          </div>
          <div class="detail-container">
            <p class="name">{{ item.name }}</p>
            <p class="description">{{ item.description }}</p>
            <div class="integral">
              <i class="icon icon-tubiao311 iconfont"></i>
              <span class="pre-integral">{{ item.integral | preIntegral }}</span>
              <span class="last-integral">{{ item.integral | lastIntegral }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="end" v-if="list.length > 0">
      <van-divider>我是有底线的</van-divider>
    </div>
    <div class="empty" v-else>暂无相关数据</div>
  </div>
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
  .merchandise-list-container {
    .merchandise-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        flex-basis: 48%;
        margin-bottom: px2rem(14);
        background-color: #fff;
        .content-container {
          border-radius: px2rem(8);
          overflow: hidden;
          .image-container {
            position: relative;
            width: 100%;
            padding-top: 100%;
            img {
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
              line-height: 1.4;
              font-size: px2rem(12);
              margin-bottom: px2rem(4);
              @include mutipleLine(3);
            }
            .integral {
              display: flex;
              align-items: flex-end;
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
    }
    .end {
      overflow: hidden;
    }
    .empty {
      text-align: center;
      line-height: px2rem(30);
      font-size: px2rem(14);
      color: #999;
    }
  }
</style>