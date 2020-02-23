<template>
  <div class="merchandise-detail-container">
    <scroll-header to="/merchandise" title="商品详情" :visible="visible" />
    <scroll-view
      :click="true"
      :probeType="3"
      @scroll="scroll"
      ref="scroll">
      <div class="scroll-contaienr">
        <merchandise-detail-card v-if="merchandise" :merchandise="merchandise" @conversion="conversion" />
        <div v-if="others.length > 0">
        <van-divider :style="{ color: '#222' }">看了又看</van-divider>
        <div class="list-container">
          <merchandise-list :list="others" />
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
import MerchandiseList from '@/components/MerchandiseList/index.vue';
import MerchandiseDetailCard from './card.vue';

export default {
  name: 'MerchandiseDetail',
  data() {
    return {
      visible: false,
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
  },
  methods: {
    scroll({ y }) {
      if (y <= -80) this.visible = true;
      else this.visible = false;
    },
    conversion() {
      this.merchandise.stock -= 1;
    },
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
  }
</style>