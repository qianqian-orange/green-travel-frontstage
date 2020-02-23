<template>
  <div class="level-container">
    <div class="header">
      <common-header to="/" title="我的等级" />
    </div>
    <scroll-view :dataSource="list">
      <div>
        <level-header
          :level="level"
          :current="growth - growths[level- 1]"
          :total="growths[level] - growths[level - 1]"
          :percent="list.length > 0 ? list[level - 1].percent : 0"/>
        <ul class="list">
          <li class="item" v-for="(item, index) in list" :key="index">
            <van-image
              class="image"
              :src="require(`${item.path}`)" />
            <div class="content-container">
              <p class="level">Lv.{{ index + 1 }}</p>
              <p class="growth"><span>{{ item.growth }}</span> 成长值</p>
              <p class="extra">{{ item.percent }}%的人在此等级</p>
            </div>
          </li>
        </ul>
      </div>
    </scroll-view>
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import ScrollView from '@/components/ScrollView/index.vue';
import CommonHeader from '@/components/CommonHeader/index.vue';
import LevelHeader from './header.vue';

export default {
  name: 'Level',
  data() {
    return {
      list: [],
      growths: [
        0, 400, 900, 1500, 2500,
        3600, 4900, 6400, 8000, 10000,
        15000, 20000, 25000, 36000, 49000,
      ],
      loading: false,
    };
  },
  components: {
    LevelHeader,
    ScrollView,
    CommonHeader,
  },
  computed: {
    ...mapState('user', {
      level: state => state.level,
      growth: state => state.growth,
    }),
  },
  mounted() {
    this.loading = true;
    axios.get('/api/level/precents')
      .then((result) => {
        const { code, data } = result.data;
        if (code === 0) {
          for (let i = 0; i < this.level; i += 1) {
            this.list.push({
              path: `./imgs/level${i + 1}-active.png`,
              percent: data[i],
              growth: this.growths[i],
            });
          }
          for (let i = this.level; i < 15; i += 1) {
            this.list.push({
              path: `./imgs/level${i + 1}-wait.png`,
              percent: data[i],
              growth: this.growths[i],
            });
          }
          return;
        }
        this.$notify('请求数据失败！');
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
 .level-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .header {
      display: flex;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(44);
      background-color: #2B1420;
    }
    .list {
      background-color: #f7f7f7;
      padding: px2rem(10) 0;
      .item {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: px2rem(10);
        margin-bottom: px2rem(10);
        &:last-child {
          margin-bottom: 0;
        }
        .image {
          width: px2rem(35);
          height: px2rem(28);
          margin-right: px2rem(10);
        }
        .content-container {
          .level {
            font-size: px2rem(14);
            font-weight: 700;
            font-style: italic;
            color: #222;
            margin-bottom: px2rem(4);
          }
          .growth {
            font-size: px2rem(12);
            margin-bottom: px2rem(4);
            span {
              font-size: px2rem(20);
            }
          }
          .extra {
            color: #999;
          }
        }
      }
    }
 }
</style>