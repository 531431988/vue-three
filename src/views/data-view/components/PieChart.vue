<template>
  <Card title="供电占比">
    <v-chart ref="chart" :option="chartOption" :autoresize="true" style="height: 90%" />
  </Card>
</template>

<script>
export default {
  components: {

    Card: () => import('./Card')
  },
  data () {
    const chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [{
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: 'transparent',
          borderWidth: 20
        },
        label: {
          show: true,
          // position: 'inside',
          color: '#fff',
          fontSize: 14,
          formatter: '{b}：{d}%'
        },
        data: [
          { value: 1048, name: 'A区' },
          { value: 735, name: 'B区' },
          { value: 580, name: 'C区' },
          { value: 484, name: 'D区' },
          { value: 300, name: 'E区' }]
      }

      ]
    }
    return {
      chartOption
    }
  }

}
</script>

<style lang="less" scoped>
</style>
