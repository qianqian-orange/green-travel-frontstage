<template>
  <div class="signIn-container">
    <sign-in-header :day="day" />
    <p class="tip">领取的奖励已自动发放至您的账户上</p>
    <div class="content-container">
      <div class="header">
        <p class="primary">
          每日连续签到 月领
          <span class="integral">
            <span>{{ totalIntegral }}</span>
            <span class="icon">+</span>
          </span>
          碳积分
        </p>
        <p class="secondary">配合优惠卷，去积分商城兑换心仪的商品吧</p>
      </div>
      <scroll-view
        ref="scroll"
        :click="true"
        :dataSource="list"
      >
        <div class="main">
          <sign-in-list
            :list="list"
            @scrollToElement="scrollToElement"
            @signIn="signIn"
          />
          <div v-if="loading" class="loading">
            <van-loading  type="spinner" color="#1989fa" />
          </div>
          <p class="end">若连续签到中断，再来领取时只能从头再来哦～</p>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
import { getDays } from '@/utils/date';
import ScrollView from '@/components/ScrollView/index.vue';
import { UPDATE_INTEGRAL } from '@/store/modules/user/mutation-types';
import SignInHeader from './header.vue';
import SignInList from './list.vue';

const ACTIVE = 'active';
const FINISHED = 'finished';
const WAIT = 'wait';
export default {
  name: 'SignIn',
  data() {
    return {
      list: [],
      id: -1,
      days: [],
      integrals: [
        0.5, 0.3, 1.0, 0.5, 0.6, 1.0, 2.5,
        1.5, 1.3, 2.0, 1.5, 1.6, 2.0, 3.5,
        2.5, 2.3, 3.0, 2.5, 3.6, 3.0, 4.5,
        3.5, 3.3, 4.0, 3.5, 4.6, 4.0, 5.5,
        4.5, 4.3, 5.0,
      ],
      date: new Date(),
      day: 0,
      loading: false,
    };
  },
  components: {
    SignInHeader,
    ScrollView,
    SignInList,
  },
  computed: {
    totalIntegral() {
      const sum = this.integrals.reduce((cur, pre) => (parseInt(cur * 100, 10) + parseInt(pre * 100, 10)) / 100, 0);
      return parseInt(sum, 10);
    },
    ...mapState('user', {
      user: state => state,
    }),
  },
  methods: {
    scrollToElement(el) {
      this.$refs.scroll.scrollToElement(el);
    },
    signIn(index) {
      const { type, integral } = this.list[index];
      if (type !== ACTIVE) return;
      this.days.push(this.date.getDate());
      axios.post('/api/signIn/update', {
        id: this.id,
        days: this.days,
        integral,
      }).then((result) => {
        const { code } = result.data;
        if (code === 0) {
          this.list[index].type = FINISHED;
          this.day += 1;
          this[UPDATE_INTEGRAL]({ operator: '+', integral });
          this.$notify({ type: 'success', message: '签到成功' });
          return;
        }
        this.$notify('签到失败！');
      });
    },
    init() {
      const total = getDays(this.date);
      const current = this.date.getDate();
      const last = this.days[this.days.length - 1];
      if (last === current) this.day += 1;
      for (let i = this.days.length - (last === current ? 2 : 1), j = 1; i >= 0; i -= 1, j += 1) {
        if (this.days[i] !== current - j) break;
        this.list.unshift({
          day: this.days[i],
          type: FINISHED,
        });
        this.day += 1;
      }
      const base = this.list.length === 0 ? current : this.list[0].day;
      this.list = this.list.map(item => ({
        ...item,
        day: item.day - base,
        integral: this.integrals[item.day - base],
      }));
      this.list.push({
        day: current - base,
        integral: this.integrals[current - base],
        type: current === last ? FINISHED : ACTIVE,
      });
      const length = total - current <= 6 ? total - current : 6;
      for (let i = 0; i < length; i += 1) {
        this.list.push({
          day: current - base + i + 1,
          integral: this.integrals[current - base + i + 1],
          type: WAIT,
        });
      }
    },
    ...mapMutations('user', [UPDATE_INTEGRAL]),
  },
  mounted() {
    this.loading = true;
    axios.get('/api/signIn/data', {
      params: {
        year: this.date.getFullYear(),
        month: this.date.getMonth() + 1,
      },
    })
      .then((result) => {
        const { code, data: { id, days } } = result.data;
        if (code !== 0) {
          this.$notify('请求数据失败！');
          return;
        }
        this.id = id;
        this.days = days;
        this.init();
      }).finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
  .signIn-container {
    position: relative;
    height: 100%;
    background-color: #F07438;
    .tip {
      height: px2rem(30);
      line-height: px2rem(30);
      font-size: px2rem(12);
      color: rgba(255, 255, 255, .8);
      text-align: center;
    }
    .content-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      top: px2rem(130);
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #fff;
      .header {
        position: relative;
        background-color: #fff;
        height: px2rem(44);
        padding: px2rem(20) 0;
        border-bottom: px2rem(6) solid #fafafc;;
        border-top-left-radius: px2rem(20);
        border-top-right-radius: px2rem(20);
        text-align: center;
        &::before, &::after {
          content: "";
          position: absolute;
          top: px2rem(-3);
          width: px2rem(6);
          height: px2rem(15);
          @include bg('./imgs/ring.png');
        }
        &::before {
          left: px2rem(40);
        }
        &::after {
          right: px2rem(40);
        }
        .primary {
          color: #222;
          font-size: px2rem(18);
          font-weight: 700;
          margin-bottom: px2rem(8);
          .integral {
            color: #fff;
            font-size: px2rem(16);
            background-color: #F07438;
            padding: 0 px2rem(4);
            border-radius: px2rem(4);
          }
        }
        .secondary {
          color: #999;
          font-size: px2rem(14);
        }
      }
      .main {
        background-color: #fff;
        .loading {
          text-align: center;
        }
        .end {
          padding: px2rem(20) 0;
          text-align: center;
          font-size: px2rem(12);
          color: #999;
        }
      }
    }
  }
</style>