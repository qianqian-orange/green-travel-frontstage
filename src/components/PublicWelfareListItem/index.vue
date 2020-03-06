<template>
  <div class="public-welfare-list-item">
    <div class="image-container">
      <van-image class="image" :src="path" />
    </div>
    <div class="content-container">
      <p class="title">{{ title }}</p>
      <div class="end">
        <div class="integral">
          <span class="current">{{ donate }}</span> / <span class="total">{{ integral }}</span>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicWelfareListItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    integral: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    donate: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.public-welfare-list-item {
  background-color: #fff;
  border-radius: px2rem(4);
  overflow: hidden;
  .image-container {
    width: 100%;
    height: px2rem(136);
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .content-container {
    padding: px2rem(10);
    .title {
      font-size: px2rem(14);
      color: #222;
      font-weight: 700;
      margin-bottom: px2rem(4);
      @include mutipleLine(1);
    }
    .end {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .integral {
        color: #222;
        .current {
          font-weight: 700;
        }
      }
    }
  }
}
</style>