<template>
  <van-swipe-cell>
    <router-link :to="`/me/conversion/detail/${id}`">
      <div class="conversion-list-item">
        <van-image class="image" :src="path" />
        <div class="detail-container">
          <p class="name">{{ name }}</p>
          <p class="description">{{ description }}</p>
          <integral :integral="integral" />
        </div>
      </div>
    </router-link>
    <van-button
      slot="right"
      square
      text="删除"
      type="danger"
      class="delete"
      @click="remove" />
  </van-swipe-cell>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { REMOVE_CONVERSION } from '@/store/modules/user/mutation-types';
import Integral from '@/components/Integral/index.vue';

export default {
  name: 'ConversionListItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    integral: {
      type: Number,
      required: true,
    },
  },
  components: {
    Integral,
  },
  methods: {
    remove() {
      axios.post('/api/user/conversion/remove', {
        id: this.id,
      }).then((result) => {
        const { code } = result.data;
        if (code === 0) {
          this[REMOVE_CONVERSION](this.id);
          return;
        }
        this.$notify({ type: 'danger', message: '删除失败!' });
      });
    },
    ...mapMutations('user', [REMOVE_CONVERSION]),
  },
};
</script>

<style lang="scss" scoped>
.conversion-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: px2rem(4) 0;
  .image {
    width: px2rem(100);
    height: px2rem(100);
    margin-right: px2rem(10);
  }
  .detail-container {
    flex: 1;
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
.delete {
  height: 100%;
}
</style>