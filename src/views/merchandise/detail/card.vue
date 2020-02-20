<template>
  <div class="merchandise-detail-card">
    <div class="image-container">
      <van-image
        :src="merchandise.path"
        class="image"
      />
    </div>
    <div class="content-container">
      <p class="name">{{ merchandise.name }}</p>
      <p class="description">{{ merchandise.description }}</p>
      <div class="integral-container">
        <div class="integral">
          <i class="icon icon-tubiao311 iconfont"></i>
          <span class="pre-integral">{{ merchandise.integral | preIntegral }}</span>
          <span class="last-integral">{{ merchandise.integral | lastIntegral }}</span>
        </div>
        <van-button :disabled="loading" v-if="merchandise.stock" type="primary" size="small" @click="conversion">兑换</van-button>
        <van-tag v-if="merchandise.stock === 0" plain type="danger">已售馨</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import { UPDATE_INTEGRAL } from '@/store/modules/user/mutation-types';

export default {
  name: 'MerchandiseDetailCard',
  props: {
    merchandise: {
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
    ...mapState('user', {
      user: state => state,
    }),
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
  methods: {
    conversion() {
      if (this.user.integral <= this.merchandise.integral) {
        this.$toast({ type: 'fail', message: '积分不足！' });
        return;
      }
      if (this.loading) return;
      this.loading = true;
      axios.post('/api/merchandise/conversion', {
        id: this.merchandise.id,
      }).then((result) => {
        const { code } = result.data;
        if (code !== 0) {
          this.$notify({ type: 'danger', message: '兑换失败！' });
          return;
        }
        this.$notify({ type: 'success', message: '兑换成功！' });
        this[UPDATE_INTEGRAL]({ integral: this.merchandise.integral, operator: '-' });
        this.$emit('conversion');
      }).finally(() => {
        this.loading = false;
      });
    },
    ...mapMutations('user', [UPDATE_INTEGRAL]),
  },
};
</script>

<style lang="scss" scoped>
  .image-container {
    position: relative;
    width: 100%;
    padding-top: 100%;
    .image {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
  }
  .content-container {
    padding: px2rem(12);
    background-color: #fff;
    .name {
      color: #222;
      font-size: px2rem(16);
      font-weight: 700;
      margin-bottom: px2rem(4);
    }
    .description {
      color: #999;
      font-size: px2rem(12);
      line-height: 1.5;
      margin-bottom: px2rem(4);
    }
    .integral-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .integral {
      display: flex;
      align-items: flex-end;
      color: #f42;
      .icon {
        font-size: px2rem(14);
        margin-right: px2rem(2);
        line-height: 1.5;
      }
      .pre-integral {
        font-size: px2rem(36);
        font-weight: 700;
        line-height: 1;
      }
      .last-integral {
        font-size: px2rem(14);
        font-weight: 700;
        line-height: 1.5;
      }
    }
  }
</style>