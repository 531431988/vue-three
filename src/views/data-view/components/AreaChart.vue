<template>
  <Card title="某产品合格率">
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
      legend: {
        data: ['产品1', '产品2', '产品3'],
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五'],
        axisLine: null,
        axisTick: null,
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 14
        }
      },
      yAxis: {
        type: 'value',
        splitNumber: 2,
        splitLine: null,
        axisLine: null,
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 14
        }
      },
      series: [{
        name: '产品1',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          color: '#91cc75'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: '产品2',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          color: '#fac858'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      },
      {
        name: '产品3',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          fontSize: 14
        },
        areaStyle: {
          color: '#ee6666'
        },
        data: [220, 302, 181, 234, 210, 290, 150]
      }]
    }
    return {
      chartOption
    }
  }

}
</script>

<style lang="less" scoped>
</style>
