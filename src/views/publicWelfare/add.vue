<template>
  <div class="public-welfare-add-container">
    <div class="header">
      <common-header to="/publicWelfare" title="新增表单"/>
    </div>
    <van-form
      @submit="submit">
      <van-field
        clearable
        required
        v-model="formData.title"
        label="标题"
        :rules="rules.title" />
      <van-field
        clearable
        required
        v-model="formData.integral"
        type="digit"
        name="integral"
        label="碳积分"
        :rules="rules.integral" />
      <van-field
        required
        readonly
        clickable
        label="截止时间"
        :value="formData.endTime"
        :rules="rules.time"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="datetime"
          :min-date="minDate"
          @confirm="confirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        label="图片"
        required
        :rules="rules.path">
        <template #input>
          <van-uploader
            v-model="list"
            :before-read="beforeRead"
            :after-read="afterRead"
            :before-delete="beforeDelete"
            :max-count="1"
            :accept="whiteList.join(',')" />
        </template>
      </van-field>
      <van-field
        clearable
        required
        v-model="formData.description"
        rows="3"
        autosize
        label="描述"
        type="textarea"
        maxlength="300"
        show-word-limit
        :rules="rules.description"
      />
      <div style="margin: 16px;">
        <van-button
          :loading="loading"
          :disabled="loading"
          loading-text="提交中..."
          round
          block
          native-type="submit"
          color="linear-gradient(to right, #ff6034, #ee0a24)">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import CommonHeader from '@/components/CommonHeader/index.vue';

export default {
  name: 'PublicWelfareAdd',
  data() {
    return {
      whiteList: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
      size: 1024 * 1024 * 5,
      list: [],
      loading: false,
      minDate: new Date(),
      showPicker: false,
      formData: {
        title: '',
        integral: '',
        description: '',
        path: '1',
        endTime: '',
      },
      rules: {
        title: [
          { required: true, message: '请填写标题' },
        ],
        integral: [
          { required: true, message: '请填写碳积分' },
          { validator: val => val >= 1 && val <= 10000, message: '数值不符合要求' },
        ],
        description: [
          { required: true, message: '请填写描述' },
        ],
        path: [
          { required: true, message: '请上传图片' },
        ],
        time: [
          { required: true, message: '请选择截止时间' },
        ],
      },
    };
  },
  components: {
    CommonHeader,
  },
  methods: {
    submit() {
      if (this.loading) return;
      this.loading = true;
      const {
        path,
        endTime,
        title,
        integral,
        description,
      } = this.formData;
      axios.post('/api/publicWelfare/save', {
        title,
        integral,
        description,
        end_time: endTime,
        path,
      }).then((result) => {
        const { code } = result.data;
        if (code === 0) {
          this.$notify({ type: 'success', message: '提交成功！' });
          return;
        }
        this.$notify({ type: 'danger', message: '提交失败！' });
      }).finally(() => {
        this.loading = false;
      });
    },
    beforeRead(file) {
      const { size, type } = file;
      if (size > this.size) {
        this.$toast('图片太大啦！');
        return false;
      }
      if (!this.whiteList.includes(type)) {
        this.$toast('请上传正确的图片格式！');
        return false;
      }
      return true;
    },
    afterRead(file) {
      const f = file;
      f.status = 'uploading';
      f.message = '上传中...';
      const fd = new FormData();
      fd.append('task', f.file);
      fd.append('name', 'task');
      axios.post('http://localhost:3000/api/upload/task', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((result) => {
        const { code, path } = result.data;
        if (code === 0) {
          f.status = 'done';
          f.message = '';
          this.formData.path = path;
          return;
        }
        f.status = 'failed';
        f.message = '上传失败';
      });
    },
    beforeDelete() {
      this.path = '';
      return true;
    },
    confirm(time) {
      this.formData.endTime = moment(time).format('YYYY-MM-DD HH:mm');
      this.showPicker = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.public-welfare-add-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #fafafc;
  .header {
    height: px2rem(44);
    background-color: #ff0036;
    margin-bottom: px2rem(10);
  }
}

</style>

<style lang="scss">
.public-welfare-add-container {
  .van-image.van-uploader__preview-image {
    width: px2rem(200);
    height: px2rem(110);
  }
}
</style>