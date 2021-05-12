<template>
  <Card title="实时数据监控">
    <a-row type="flex" :gutter="64" justify="center" style="margin-top: 32px">
      <a-col>
        <a-progress :width="150" :strokeWidth="10" type="circle" :stroke-color="{
        '0%': '#67b0ff',
        '100%': '#164cff',
      }" :percent="20" :format="val => `${val}%`" />
        <p class="text">生产进度</p>
      </a-col>
      <!-- <a-col>
        <a-progress :width="150" :strokeWidth="10" type="circle" :stroke-color="{
        '0%': '#f0992e',
        '100%': '#e5372b',
      }" :percent="55" :format="val => `${val}%`" />
        <p class="text">生产进度</p>
      </a-col> -->
      <a-col>
        <a-progress :width="150" :strokeWidth="10" type="circle" :stroke-color="{
        '0%': '#b2ff3b',
        '100%': '#068824',
      }" :percent="78" :format="val => `${val}%`" />
        <p class="text">生产进度</p>
      </a-col>
    </a-row>
  </Card>
</template>

<script>
export default {
  components: {
    Card: () => import('./Card')
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.text {
  text-align: center;
  color: #fff;
  font-size: 18px;
  margin-top: 8px;
}
/deep/ .ant-progress-circle-trail {
  stroke: rgba(255, 255, 255, 0.1) !important;
}
/deep/ .ant-progress-text {
  color: #fff;
  font-size: 24px;
}
</style>
