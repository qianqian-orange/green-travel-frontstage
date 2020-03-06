<template>
  <div class="public-welfare-card-container">
    <div class="image-container">
      <van-image :src="target.path" class="image" />
    </div>
    <div class="content-container">
      <p class="title">{{ target.title }}</p>
      <p class="description">{{ target.description }}</p>
      <div class="extra">
        <div class="integral">
          <span class="current">{{ target.donate }}</span> / <span class="total">{{ target.integral }}</span>
        </div>
        <van-tag plain :type="tag.type">{{ tag.text }}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicWelfareCard',
  props: {
    target: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    tag() {
      if (this.target.status === 0) return { type: 'primary', text: '审核中' };
      if (this.target.status === 1) return { type: 'success', text: '已通过' };
      if (this.target.status === 2) return { type: 'danger', text: '未通过' };
      return {};
    },
  },
};
</script>

<style lang="scss" scoped>
.public-welfare-card-container {
  .image-container {
    width: 100%;
    height: px2rem(140);
    .image {
      width: 100%;
      height: px2rem(140);
    }
  }
  .content-container {
    padding: px2rem(12);
    background-color: #fff;
    .title {
      color: #222;
      font-size: px2rem(18);
      font-weight: 700;
      margin-bottom: px2rem(6);
    }
    .description {
      color: #999;
      font-size: px2rem(12);
      line-height: 1.5;
      margin-bottom: px2rem(4);
    }
    .extra {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: px2rem(14);
      .integral {
        color: #222;
        .current {
          font-weight: 700;
        }
      }
    }
    .operator {
      display: flex;
      justify-content: flex-end;
      margin-top: px2rem(8);
    }
  }
}
</style>