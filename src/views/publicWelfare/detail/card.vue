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
        <span>{{ target.name }}</span>
      </div>
      <div class="donate" v-if="overdue">
        <van-stepper v-model="quantity" integer />
        <van-button class="button" :disabled="loading" type="primary" size="small" @click="donate">捐赠</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import { UPDATE_INTEGRAL } from '@/store/modules/user/mutation-types';

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
      quantity: 1,
      loading: false,
    };
  },
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
    overdue() {
      const current = new Date();
      const end = new Date(this.target.end_time);
      return end > current;
    },
  },
  methods: {
    donate() {
      if (this.user.integral < this.quantity) {
        this.$toast('积分不足！');
        return;
      }
      this.loading = true;
      axios.post('/api/publicWelfare/donate', {
        integral: this.quantity,
        id: this.target.id,
      }).then((result) => {
        const { code } = result.data;
        if (code === 0) {
          this.$notify({ type: 'success', message: '捐赠成功！' });
          this[UPDATE_INTEGRAL]({ integral: this.quantity, operator: '-' });
          this.$emit('donate', this.quantity);
          return;
        }
        this.$notify({ type: 'danger', message: '捐赠失败！' });
      }).finally(() => {
        this.loading = false;
      });
    },
    ...mapMutations('user', [UPDATE_INTEGRAL]),
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
      height: 100%;
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
      margin-bottom: px2rem(8);
      .integral {
        color: #222;
        .current {
          font-weight: 700;
        }
      }
    }
    .donate {
      display: flex;
      justify-content: flex-end;
      .button {
        margin-left: px2rem(10);
      }
    }
  }
}
</style>