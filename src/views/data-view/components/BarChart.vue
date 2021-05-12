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
        data: ['合格', '不合格'],
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
        data: ['产品1', '产品2', '产品3', '产品4', '产品5'],
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
        name: '合格',
        type: 'bar',
        barWidth: 16,
        data: [60, 50, 30, 40, 70],
        label: {
          show: true,
          position: 'top',
          color: '#DDE2E7',
          fontSize: 14
        },
        itemStyle: {
          borderRadius: 10,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#0dcdf8'
            }, {
              offset: 1,
              color: '#0571e9'
            }]
          }
        }
      }, {
        name: '不合格',
        type: 'bar',
        barWidth: 16,
        data: [5, 10, 3, 7, 15],
        label: {
          show: true,
          position: 'top',
          color: '#DDE2E7',
          fontSize: 14
        },
        itemStyle: {
          borderRadius: 10,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#fc8c8f'
            }, {
              offset: 1,
              color: '#ff5597'
            }]
          }
        }
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
