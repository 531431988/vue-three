<template>
  <Card title="数量TOP5">
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
      color: [],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '5%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitNumber: 2,
        splitLine: null,
        axisLine: null,
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 14
        }
      },
      yAxis: {
        type: 'category',
        data: ['A品', 'B品', 'C品', 'D品', 'E品'],
        axisLine: null,
        axisTick: null,
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 14
        }
      },
      series: [{
        type: 'bar',
        barWidth: 16,
        data: [{
          value: 20,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
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
          value: 30,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0,
                color: '#fc8c8f'
              }, {
                offset: 1,
                color: '#ff5597'
              }]
            }
          }
        }, {
          value: 40,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0,
                color: '#7703e2'
              }, {
                offset: 1,
                color: '#434cd7'
              }]
            }
          }
        }, {
          value: 50,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0,
                color: '#6f29e3'
              }, {
                offset: 1,
                color: '#f137e2'
              }]
            }
          }
        }, {
          value: 70,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0,
                color: '#01a5fa'
              }, {
                offset: 1,
                color: '#09e2d7'
              }]
            }
          }
        }],
        label: {
          show: true,
          position: 'right',
          color: '#DDE2E7',
          fontSize: 14
        },
        itemStyle: {
          borderRadius: 10
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
