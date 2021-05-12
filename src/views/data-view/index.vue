<template>
  <div class="data-view">

    <Head />
    <div class="left">
      <BarChart />
      <Progress />
      <AreaChart />
    </div>
    <div class="right">
      <ColumnChart />
      <Table />
      <PieChart />
    </div>
    <Model />
  </div>
</template>

<script>
export default {
  components: {
    Head: () => import('./components/Header'),
    Model: () => import('./components/Model'),
    BarChart: () => import('./components/BarChart'),
    Progress: () => import('./components/Progress'),
    AreaChart: () => import('./components/AreaChart'),
    ColumnChart: () => import('./components/ColumnChart'),
    PieChart: () => import('./components/PieChart'),
    Table: () => import('./components/Table')

  },
  data () {
    return {

    }
  },
  methods: {
    refreshScale () {
      const baseWidth = document.documentElement.clientWidth
      const baseHeight = document.documentElement.clientHeight
      const appStyle = document.querySelector('.data-view')
      // 屏幕比
      const realRatio = baseWidth / baseHeight
      // 设计稿比
      const designRatio = 16 / 9
      let scaleRate = baseWidth / 1920
      if (realRatio > designRatio) {
        scaleRate = baseHeight / 1080
      }
      appStyle.style = `transform-origin: left top;transform: scale(${scaleRate});width:${baseWidth / scaleRate}px;height: 100vh;overflow: hidden`
    }
  },
  mounted () {
    this.refreshScale()
    window.onresize = this.refreshScale
  }
}
</script>

<style lang="less" scoped>
.data-view {
  position: relative;
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  .left,
  .right {
    width: 520px;
    position: absolute;
    top: 90px;
    padding: 24px;
  }
}
</style>
