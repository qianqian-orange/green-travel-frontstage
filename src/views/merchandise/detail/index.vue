<template>
  <div class="merchandise-detail-container">
    <scroll-header to="/merchandise" title="商品详情" :visible="visible" />
    <scroll-view
      :click="true"
      :probeType="3"
      @scroll="scroll"
      ref="scroll">
      <div class="scroll-contaienr">
        <merchandise-detail-card v-if="merchandise" :merchandise="merchandise" @conversion="toggle" />
        <div v-if="others.length > 0">
        <van-divider :style="{ color: '#222' }">看了又看</van-divider>
        <div class="list-container">
          <merchandise-list :list="others" />
        </div>
        </div>
      </div>
    </scroll-view>
    <van-popup
      v-model="popup"
      round
      closeable
      :lock-scroll="false"
      position="bottom"
      style="height: 50%; padding-top: 40px;"
    >
      <div class="popup-container">
        <coupon-list @use="conversion" />
        <div class="btn">
          <van-button
            @click="conversion(-1)"
            round
            block
            color="linear-gradient(to right, #6cd557, #34c2aa)">不使用优惠卷</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import { CONVERSION } from '@/store/modules/user/mutation-types';
import ScrollView from '@/components/ScrollView/index.vue';
import ScrollHeader from '@/components/ScrollHeader/index.vue';
import MerchandiseList from '@/components/MerchandiseList/index.vue';
import CouponList from '@/components/CouponList/index.vue';
import MerchandiseDetailCard from './card.vue';

export default {
  name: 'MerchandiseDetail',
  data() {
    return {
      popup: false,
      visible: false,
      loading: false,
      merchandise: null,
    };
  },
  watch: {
    list() {
      this.$refs.scroll.refresh();
    },
    $route(value) {
      const { id } = value.params;
      this.merchandise = this.list.find(item => item.id === +id);
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
  computed: {
    others() {
      const { id } = this.$route.params;
      return this.list.filter(item => item.id !== +id).splice(0, 5);
    },
    ...mapState('merchandise', {
      list: state => state.list,
    }),
    ...mapState('user', {
      user: state => state,
    }),
  },
  components: {
    MerchandiseList,
    MerchandiseDetailCard,
    ScrollView,
    ScrollHeader,
    CouponList,
  },
  methods: {
    scroll({ y }) {
      if (y <= -80) this.visible = true;
      else this.visible = false;
    },
    toggle() {
      this.popup = !this.popup;
    },
    conversion(id) {
      this.toggle();
      if (this.user.integral < this.merchandise.integral) {
        this.$toast({ type: 'fail', message: '积分不足！' });
        return;
      }
      if (this.loading) return;
      this.loading = true;
      axios.post('/api/merchandise/conversion', {
        id: this.merchandise.id,
        uc_id: id,
      }).then((result) => {
        const { code } = result.data;
        if (code !== 0) {
          this.$notify({ type: 'danger', message: '兑换失败！' });
          return;
        }
        this.$notify({ type: 'success', message: '兑换成功！' });
        this[CONVERSION]({ integral: this.merchandise.integral, id });
        this.merchandise.stock -= 1;
      }).finally(() => {
        this.loading = false;
      });
    },
    ...mapMutations('user', [CONVERSION]),
  },
  mounted() {
    const { id } = this.$route.params;
    this.merchandise = this.list.find(item => item.id === +id);
    if (this.merchandise) {
      this.$refs.scroll.refresh();
      return;
    }
    axios.get('/api/merchandise/find', {
      params: {
        id: +id,
      },
    }).then((result) => {
      const { code, data } = result.data;
      if (code === 0) {
        this.merchandise = data;
        this.$refs.scroll.refresh();
        return;
      }
      this.$router.replace('/merchandise');
      this.$notify({ type: 'danger', message: '数据请求失败' });
    });
  },
};
</script>

<style lang="scss" scoped>
  .merchandise-detail-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fafafc;
    .list-container {
      margin: 0 px2rem(10);
    }
    .popup-container {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding-bottom: px2rem(52);
      .btn {
        position: absolute;
        bottom: px2rem(4);
        left: px2rem(10);
        right: px2rem(10);
      }
    }
  }
</style>