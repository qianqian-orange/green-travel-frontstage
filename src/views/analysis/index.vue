<template>
  <div class="analysis-container">
    <div class="header">
      <common-header to="/" />
    </div>
    <div class="panel">
      <p class="title">饼状图</p>
      <canvas id="pie"></canvas>
    </div>
    <div class="panel">
      <p class="title">折线图</p>
      <canvas id="line"></canvas>
    </div>
  </div>
</template>

<script>
import F2 from '@antv/f2/lib/core';
import PieLabel from '@antv/f2/lib/plugin/pie-label';
import '@antv/f2/lib/geom/interval'; // 饼状图
import '@antv/f2/lib/geom/line'; // 折线图
import '@antv/f2/lib/geom/point'; // 点图
import '@antv/f2/lib/coord/polar';
import '@antv/f2/lib/geom/adjust/stack';
import '@antv/f2/lib/component/guide/html';
import '@antv/f2/lib/interaction/';
import Guide from '@antv/f2/lib/plugin/guide';
import Animation from '@antv/f2/lib/animation/detail';
import ScrollBar from '@antv/f2/lib/plugin/scroll-bar';
import Tooltip from '@antv/f2/lib/plugin/tooltip';
import { mapState } from 'vuex';
import CommonHeader from '@/components/CommonHeader/index.vue';

F2.Chart.plugins.register(Guide);
F2.Chart.plugins.register(PieLabel);
F2.Chart.plugins.register(Animation);
F2.Chart.plugins.register(ScrollBar);
F2.Chart.plugins.register(Tooltip);
export default {
  name: 'Analysis',
  data() {
    return {
      pieChart: null,
      lienChart: null,
    };
  },
  components: {
    CommonHeader,
  },
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
  },
  methods: {
    pie() {
      const dataSource = [{
        const: 'const',
        type: '骑行',
        count: this.user.bicycleCount,
      }, {
        const: 'const',
        type: '公交车',
        count: this.user.busCount,
      }, {
        const: 'const',
        type: '地铁',
        count: this.user.subwayCount,
      }, {
        const: 'const',
        type: '高铁',
        count: this.user.railCount,
      }];
      this.pieChart = new F2.Chart({
        id: 'pie',
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientWidth * 0.6,
        pixelRatio: window.devicePixelRatio,
      });
      this.pieChart.source(dataSource);
      this.pieChart.coord('polar', {
        transposed: true,
        radius: 0.9,
        innerRadius: 0.5,
      });
      this.pieChart.axis(false);
      this.pieChart.guide()
        .html({
          position: ['50%', '50%'],
          html: `
            <div style="text-align: center;width:150px;height: 50px;">
              <p style="font-size: 12px;color: #999;margin: 0" id="title"></p>
              <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>
            </div>
          `,
        });
      this.pieChart
        .interval()
        .position('const*count')
        .adjust('stack')
        .color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']);
      this.pieChart.pieLabel({
        sidePadding: 30,
        activeShape: true,
        label1: data => ({
          text: `${data.count}次`,
          fill: '#343434',
          fontWeight: 'bold',
        }),
        label2: data => ({
          text: data.type,
          fill: '#999',
        }),
        onClick: (e) => {
          if (e.data) {
            document.querySelector('#title').innerText = e.data.type;
            document.querySelector('#money').innerText = `${e.data.count}次`;
          }
        },
      });
      this.pieChart.render();
    },
    line() {
      const dataSource = [{
        day: 0,
        value: null,
      }, {
        day: 1,
        value: 12,
      }, {
        day: 2,
        value: 32,
      }, {
        day: 3,
        value: 50,
      }, {
        day: 4,
        value: 45,
      }, {
        day: 5,
        value: 37,
      }, {
        day: 6,
        value: 68,
      }, {
        day: 7,
        value: 12,
      }, {
        day: 8,
        value: 5,
      }, {
        day: 9,
        value: 90,
      }, {
        day: 10,
        value: 88,
      }, {
        day: 11,
        value: 76,
      }, {
        day: 12,
        value: 23,
      }, {
        day: 13,
        value: null,
      }];
      this.lienChart = new F2.Chart({
        id: 'line',
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientWidth * 0.6,
        pixelRatio: window.devicePixelRatio,
      });
      this.lienChart.source(dataSource, {
        day: {
          min: 0,
          max: 6,
          formatter: (val) => {
            if (val === 0) return 'begin';
            if (val === 13) return 'end';
            return `${val}月份`;
          },
        },
      });
      this.lienChart.tooltip({
        showCrosshairs: true,
        showItemMarker: true,
        onShow: (e) => {
          const { items } = e;
          items[0].name = null;
          items[0].value = items[0].value;
        },
      });
      this.lienChart.axis('day', {
        label: (text, index, total) => {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        },
      });
      this.lienChart.line().position('day*value');
      this.lienChart.point().position('day*value').style({
        stroke: '#fff',
        lineWidth: 1,
      });
      this.lienChart.interaction('pan');
      this.lienChart.scrollBar({
        mode: 'x',
        xStyle: {
          offsetY: -5,
        },
      });
      this.lienChart.render();
    },
  },
  mounted() {
    this.pie();
    this.line();
  },
  beforeDestroy() {
    this.pieChart.destroy();
    this.lienChart.destroy();
  },
};
</script>

<style lang="scss">
.analysis-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: px2rem(44);
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
    background-color: #07c160;
  }
  .panel {
    background-color: #fff;
    margin-bottom: px2rem(10);
    &:last-child {
      margin-bottom: 0;
    }
  }
  .panel .title {
    padding: px2rem(16);
    line-height: px2rem(16);
    font-size: px2rem(14);
    color: #969799;
  }
}
</style>