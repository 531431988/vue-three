<template>
  <canvas id="renderCanvas" touch-action="none" style="width: 100%;height: 100vh;touch-action: none;"></canvas>
</template>

<script>
import 'pepjs'
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import 'babylonjs-inspector'
import 'babylonjs-loaders'
export default {
  data () {
    return {
      scene: 1
    }
  },
  methods: {
    createScene (canvas) {
      const engine = new BABYLON.Engine(canvas, true)
      this.loadScene({ engine, canvas, url: './models/gltf/dongfangnanfang/', name: 'dfnf.gltf', text: '进入1层' })
    },
    // 动态加载场景
    loadScene ({ engine, canvas, url, name, text }) {
      const scene = new BABYLON.Scene(engine)
      var camera = null
      var light = null
      if (text === '进入1层') {
        camera = new BABYLON.ArcRotateCamera('Camera', 4.67, 1.45, 138, new BABYLON.Vector3(0, -100, 50), scene)
        camera.lowerBetaLimit = 0.1 // 纬度轴上允许的最小角度
        camera.upperBetaLimit = (Math.PI / 2) * 0.9 // 纬度轴上允许的最大角度
        camera.lowerRadiusLimit = 100 // 摄像机到目标的最小允许距离（摄像机无法靠近）。
        camera.upperRadiusLimit = 200 // 摄像机到目标的最大允许距离（摄像机不能再远了）。
        camera.attachControl(canvas, true)
        light = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0.60, -0.7, 0.63), scene)
        light.position = new BABYLON.Vector3(-0.05, 0.35, -0.05)
        light.intensity = 8
        new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene)
      } else {
        camera = new BABYLON.ArcRotateCamera('Camera', 4.66, 1.15, 100, new BABYLON.Vector3(0, -100, 50), scene)
        /* camera.lowerBetaLimit = 0.1 // 纬度轴上允许的最小角度
        camera.upperBetaLimit = (Math.PI / 2) * 0.9 // 纬度轴上允许的最大角度
        camera.lowerRadiusLimit = 100 // 摄像机到目标的最小允许距离（摄像机无法靠近）。
        camera.upperRadiusLimit = 200 // 摄像机到目标的最大允许距离（摄像机不能再远了）。
        camera.attachControl(canvas, true)
        light = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0.60, -0.7, 0.63), scene)
        light.position = new BABYLON.Vector3(-0.05, 0.35, -0.05)
        light.intensity = 8
        new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene) */
      }
      BABYLON.SceneLoader.Append(url, name, scene, res => {
        this.createGUI({ engine, canvas, text })
      }, () => { }, error => {
        console.log('error', error)
      })
      engine.runRenderLoop(() => {
        scene.render()
      })
      window.addEventListener('resize', function () {
        engine.resize()
      })
      scene.debugLayer.show()
    },
    createGUI ({ engine, canvas, text = '1' }) {
      var advancedTexture = new GUI.AdvancedDynamicTexture.CreateFullscreenUI('enter-the-buliding')
      var button1 = new GUI.Button.CreateSimpleButton('btn', text)
      button1.width = '100px'
      button1.height = '40px'
      button1.left = '13%'
      button1.color = '#fff'
      button1.background = 'rgba(0,0,0,.5)'
      button1.onPointerUpObservable.add(() => {
        if (text === '进入1层') {
          this.loadScene({ engine, canvas, url: './models/gltf/first-floor/', name: '1c.gltf', text: '全景' })
        } else {
          this.loadScene({ engine, canvas, url: './models/gltf/dongfangnanfang/', name: 'dfnf.gltf', text: '进入1层' })
        }
      })
      advancedTexture.addControl(button1)
    },
    refreshScale () {
      const baseWidth = document.documentElement.clientWidth
      const baseHeight = document.documentElement.clientHeight
      const appStyle = document.getElementById('app')
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
    const canvas = document.querySelector('#renderCanvas')
    this.createScene(canvas)

    // this.refreshScale()
    // window.onresize = this.refreshScale
  }
}
</script>

<style lang="less">
#actionTabs {
  input,
  button,
  select,
  optgroup,
  textarea {
    color: #333;
  }
}
</style>
