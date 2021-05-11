<template>
  <canvas id="renderCanvas" touch-action="none" style="width: 100%;height: 100vh;touch-action: none;"></canvas>
</template>

<script>
import 'pepjs'
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import 'babylonjs-inspector'
import 'babylonjs-loaders'
let engine = null
let scene1 = null
let scene2 = null
export default {
  data () {
    return {
      showScene: '全景视图'
    }
  },
  watch: {
    showScene () {
      console.log('neww', this.showScene)
      this.advancedTexture.dispose()
      this.createGUI({ engine, text: this.showScene })
    }
  },
  methods: {
    createScene (canvas) {
      engine = new BABYLON.Engine(canvas, true)
      // 创建场景1
      scene1 = new BABYLON.Scene(engine)
      const camera1 = new BABYLON.ArcRotateCamera('Camera', 4.67, 1.45, 138, new BABYLON.Vector3(0, -100, 50), scene1)
      camera1.lowerBetaLimit = 0.1 // 纬度轴上允许的最小角度
      camera1.upperBetaLimit = (Math.PI / 2) * 0.9 // 纬度轴上允许的最大角度
      camera1.lowerRadiusLimit = 100 // 摄像机到目标的最小允许距离（摄像机无法靠近）。
      camera1.upperRadiusLimit = 200 // 摄像机到目标的最大允许距离（摄像机不能再远了）。
      camera1.attachControl(canvas, true)
      const light1 = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0.60, -0.7, 0.63), scene1)
      light1.position = new BABYLON.Vector3(-0.05, 0.35, -0.05)
      light1.intensity = 8
      new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene1)

      // 创建场景2
      scene2 = new BABYLON.Scene(engine)
      // const camera2 = new BABYLON.ArcRotateCamera('Camera', 4.66, 1.15, 100, new BABYLON.Vector3(0, -100, 50), scene2)
      scene2.createDefaultCameraOrLight(true, true, true)
      // 加载模型
      BABYLON.SceneLoader.AppendAsync('./models/gltf/dongfangnanfang/', 'dfnf.gltf', scene1).then(scene => {
        console.log('加载场景1成功')
      })
      BABYLON.SceneLoader.Append('./models/gltf/first-floor/', '1c.gltf', scene2, res => {
        console.log('加载场景2成功')
      }, () => { }, error => {
        console.log('error', error)
      })
      this.createGUI({ engine, text: '进入一层' })
      this.changeScene({ engine })
    },
    changeScene ({ engine }) {
      engine.stopRenderLoop()
      /* if (this.showScene === '进入一层') {
        scene1.debugLayer.show()
      } else {
        scene2.debugLayer.show()
      } */
      engine.runRenderLoop(() => {
        if (this.showScene === '进入一层') {
          scene1.render()
        } else {
          scene2.render()
        }
      })
      window.addEventListener('resize', function () {
        engine.resize()
      })
    },
    createGUI ({ text }) {
      this.showScene = text
      this.advancedTexture = new GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, text === '进入一层' ? scene1 : scene2)
      const button = new GUI.Button.CreateSimpleButton('but', text)
      button.width = 0.2
      button.height = '40px'
      button.color = 'white'
      button.background = 'rgba(0,0,0,.5)'
      button.onPointerUpObservable.add(() => {
        if (this.showScene === '进入一层') {
          this.showScene = '全景视图'
        } else {
          this.showScene = '进入一层'
        }
      })
      this.advancedTexture.addControl(button)
    }
  },
  mounted () {
    const canvas = document.querySelector('#renderCanvas')
    this.createScene(canvas)
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
