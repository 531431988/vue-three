<template>
  <div class="data-view">
    <template v-if="visible">
      <Animated name="fadeInDown" delay="1s" :begin="begin">

        <Head />
      </Animated>
      <div class="left">
        <Animated name="fadeInLeft" delay="0.2s" :begin="begin">
          <BarChart />
        </Animated>
        <Animated name="fadeInLeft" delay="0.6s" :begin="begin">
          <Progress />
        </Animated>
        <Animated name="fadeInLeft" delay="1s" :begin="begin">
          <AreaChart />
        </Animated>
      </div>
      <div class="right">
        <Animated name="fadeInRight" delay="0.4s" :begin="begin">
          <ColumnChart />
        </Animated>
        <Animated name="fadeInRight" delay="0.8s" :begin="begin">
          <Table />
        </Animated>
        <Animated name="fadeInRight" delay="1.2s" :begin="begin">
          <PieChart />
        </Animated>
      </div>
    </template>
    <Model @ready="onReady" />
  </div>
</template>

<script>
export default {
  components: {
    Animated: () => import('./components/Animated'),
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
      visible: false,
      begin: false
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
      appStyle.style = `transform-origin: left center;transform: scale(${scaleRate});width:${baseWidth / scaleRate}px;height: 100vh;overflow: hidden`
    },
    onReady () {
      this.visible = true
      this.begin = true
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
