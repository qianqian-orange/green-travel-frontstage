<template>
  <div class="fullscreen-fixed-container task-detail-container">
    <div class="header" :style="{ backgroundColor }">
      <common-header :to="to" title="任务详情" />
    </div>
    <scroll-view
      v-if="target"
      ref="scroll"
      :dataSource="target.coupons"
      :click="true" >
      <div>
        <van-cell-group title="任务信息">
          <van-cell title="标题" :value="target.title"></van-cell>
          <van-cell title="目标" :value="`${target.aim}${unit}`"></van-cell>
          <van-cell title="类型" :value="emoji[target.type]"></van-cell>
          <van-cell title="描述">
            <p class="description">{{ target.description }}</p>
          </van-cell>
        </van-cell-group>
        <van-cell-group title="任务奖励">
          <van-cell title="成长值" :value="target.growth"></van-cell>
          <van-cell title="碳积分">
            <integral :integral="target.integral" />
          </van-cell>
        </van-cell-group>
        <div class="coupon-list-container" v-if="target.coupons.length > 0">
          <span class="text">优惠卷</span>
          <ul class="coupon-list">
            <li class="item" v-for="item in target.coupons" :key="item.id">
              <coupon
                :integral="item.integral"
                :description="item.description"
                :day="item.day"
                @view="view" />
            </li>
          </ul>
        </div>
      </div>
    </scroll-view>
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { traffic } from '@/config/emoji';
import ScrollView from '@/components/ScrollView/index.vue';
import CommonHeader from '@/components/CommonHeader/index.vue';
import Integral from '@/components/Integral/index.vue';
import Coupon from '@/components/Coupon/index.vue';

export default {
  name: 'TaskDetail',
  props: {
    to: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: '#07c160',
    },
  },
  data() {
    return {
      loading: false,
      target: null,
      emoji: traffic,
    };
  },
  components: {
    ScrollView,
    CommonHeader,
    Integral,
    Coupon,
  },
  computed: {
    unit() {
      if (this.target.type === 0) return 'km';
      return '次';
    },
  },
  methods: {
    view() {
      this.$refs.scroll.refresh();
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.target = this.list.find(item => item.id === +id);
    if (this.target && this.target.coupons.length !== 0) return;
    this.loading = true;
    axios.get('/api/task/find', {
      params: {
        id: +id,
      },
    }).then((result) => {
      const { code, data } = result.data;
      if (code === 0) {
        this.target = data;
        this.$emit('get-coupons-data', data);
        return;
      }
      this.$router.replace(this.to);
      this.$notify({ type: 'danger', message: '数据请求失败' });
    }).finally(() => {
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.task-detail-container {
  box-sizing: border-box;
  padding-top: px2rem(44);
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
  }
  .description {
    text-align: left;
  }
  .coupon-list-container {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 0 16px 16px;
    overflow: hidden;
    color: #323233;
    background-color: #fff;
    .text {
      font-size: 14px;
      line-height: 24px;
      margin-right: px2rem(4);
    }
    .coupon-list {
      flex: 1;
      .item {
        margin-bottom: px2rem(10);
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.task-detail-container {
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
  }
}
</style>