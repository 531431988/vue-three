<template>
  <Card title="效率监控">
    <swiper class="table" :options="deviceSwiperOption">
      <swiper-slide v-for="(item, index) in table" :key="index">
        <a-row class="tbody">
          <a-col :span="4" class="td">{{ item.name }}</a-col>
          <a-col :span="20" class="td">
            <a-progress :strokeWidth="15" :percent="item.value"></a-progress>
          </a-col>
        </a-row>
      </swiper-slide>
    </swiper>
  </Card>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Card: () => import('./Card'),
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      deviceSwiperOption: {
        autoplay: false,
        slidesPerView: 5,
        direction: 'vertical'
      },
      table: [{
        name: '1号机',
        value: 65
      }, {
        name: '2号机',
        value: 15
      }, {
        name: '3号机',
        value: 35
      }, {
        name: '4号机',
        value: 95
      }, {
        name: '5号机',
        value: 25
      }, {
        name: '6号机',
        value: 45
      }, {
        name: '7号机',
        value: 85
      }, {
        name: '8号机',
        value: 75
      }]
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.table {
  .tbody {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
  }
  /deep/ .ant-progress-inner {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  /deep/.ant-progress-text {
    color: #fff;
  }
}
</style>
