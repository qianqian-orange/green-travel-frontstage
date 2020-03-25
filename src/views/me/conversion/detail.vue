<template>
  <div class="conversion-detail-container fullscreen-fixed-container">
    <scroll-header to="/me/conversion" title="兑换详情" :visible="visible" />
    <scroll-view
      :click="true"
      :probeType="3"
      @scroll="scroll"
      ref="scroll">
      <div class="scroll-contaienr">
        <merchandise-detail-card
          v-if="conversion"
          :path="conversion.path"
          :name="conversion.name"
          :description="conversion.description"
          :integral="conversion.integral" />
        <div v-if="conversion">
          <p class="title">基本信息</p>
          <div class="cell">
            <span>兑换日期</span>
            <span>{{ conversion.create_time | dateFormatter }}</span>
          </div>
          <div class="cell">
            <span>编号</span>
            <span>{{ conversion.serial_number }}</span>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import ScrollView from '@/components/ScrollView/index.vue';
import ScrollHeader from '@/components/ScrollHeader/index.vue';
import MerchandiseDetailCard from '@/components/MerchandiseDetailCard/index.vue';
import moment from 'moment';

export default {
  name: 'ConversionDetail',
  data() {
    return {
      visible: false,
      conversion: null,
    };
  },
  filters: {
    dateFormatter(val) {
      return moment(val).format('YYYY/MM/DD hh:mm:ss');
    },
  },
  computed: {
    ...mapState('user', {
      list: state => state.conversion.list,
    }),
  },
  components: {
    MerchandiseDetailCard,
    ScrollView,
    ScrollHeader,
  },
  methods: {
    scroll({ y }) {
      if (y <= -80) this.visible = true;
      else this.visible = false;
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.conversion = this.list.find(item => item.id === +id);
    if (this.conversion) {
      this.$refs.scroll.refresh();
      return;
    }
    axios.get('/api/user/conversion/detail', {
      params: {
        id: +id,
      },
    }).then((result) => {
      const { code, data } = result.data;
      if (code === 0) {
        this.conversion = data;
        this.$refs.scroll.refresh();
        return;
      }
      this.$router.replace('/me/conversion');
      this.$notify({ type: 'danger', message: '数据请求失败!' });
    });
  },
};
</script>

<style lang="scss" scoped>
.conversion-detail-container {
  .title {
    padding: 16px 16px 8px;
    color: #969799;
    font-size: 14px;
    line-height: 16px;
  }
  .cell {
    position: relative;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    &:not(:last-child)::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid #ebedf0;
      transform: scaleY(.5);
    }
  }
}
</style>