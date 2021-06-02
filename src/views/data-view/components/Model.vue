<template>
  <div>
    <canvas id="renderCanvas" touch-action="none" style="width: 100%;height: 100vh;touch-action: none;"></canvas>

    <div class="loading-screen" v-if="loading">
      <Loading />
    </div>
    <div class="btn-bar">
      <button :class="{btn: true, active: active === index}" v-for="(btn, index) in btns" :key="index" @click="onClick(btn,index)">{{btn}}</button>
    </div>
    <a-modal v-model="visible" :destroyOnClose="true" width="40%" :closable="false" centered :footer="null" :bodyStyle="{padding: 0}" dialogClass="dialogClass">
      <div class="card" style="height: 100%">
        <div class="border"></div>
        <video src="../../../../public/city.mp4" width="100%" autoplay="autoplay" controls></video>
      </div>
    </a-modal>
  </div>
</template>

<script>
import 'pepjs'
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import 'babylonjs-inspector'
import 'babylonjs-loaders'
let scene1 = null
let scene2 = null
export default {
  components: {
    Loading: () => import('./Loading')
  },
  data () {
    return {
      active: 0,
      btns: ['全景视图', '进入一层'],
      visible: false,
      loading: true,
      loadingText: 'loading',
      loadedPercent: 0
    }
  },
  watch: {
    active () {
      this.changeScene()
    }
  },
  methods: {
    createScene (canvas) {
      const clearColor = new BABYLON.Color4(0.5, 0.5, 0.5, 1)
      this.engine = new BABYLON.Engine(canvas, true)
      // 创建场景1
      scene1 = new BABYLON.Scene(this.engine)
      let camera = new BABYLON.ArcRotateCamera('Camera', Math.PI, 1.45, 100, new BABYLON.Vector3(0, -100, 50), scene1)
      camera.attachControl(canvas, true)
      camera.allowUpsideDown = false
      camera.useAutoRotationBehavior = true
      camera.useBouncingBehavior = true
      camera.lowerBetaLimit = 0.1 // 纬度轴上允许的最小角度
      camera.upperBetaLimit = (Math.PI / 2) // 纬度轴上允许的最大角度
      camera.lowerRadiusLimit = 50 // 摄像机到目标的最小允许距离（摄像机无法靠近）。
      camera.upperRadiusLimit = 200 // 摄像机到目标的最大允许距离（摄像机不能再远了）。
      this.customLoading()
      // 加载模型
      BABYLON.SceneLoader.Append('./models/gltf/dongfangnanfang/', 'dfnf.gltf', scene1, meshes => {
        // onSuccess
        scene1.clearColor = clearColor
        const directionalLight = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0, 0, 0), scene1)
        directionalLight.position = new BABYLON.Vector3(0, 100, 100)
        directionalLight.intensity = 8
        const hemiLight = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene1)
        hemiLight.intensity = 2
        hemiLight.groundColor = new BABYLON.Color3(1, 1, 1)
        console.log('场景1加载成功')
        // this.engine.hideLoadingUI()
        this.$emit('ready')
      }, e => {
        // onProgress
        this.loadedPercent = 0
        if (e.lengthComputable) {
          this.loadedPercent = (e.loaded * 100 / e.total).toFixed()
        } else {
          var dlCount = e.loaded / (1024 * 1024)
          this.loadedPercent = Math.floor(dlCount * 100.0) / 100.0
        }
      }, error => {
        console.log('error', error)
      })
      /* // 贴标签
      var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 10, scene1)
      sphere.position.x = 22
      sphere.position.y = -100
      sphere.position.z = 20
      sphere.isVisible = false
      // GUI
      var plane = BABYLON.Mesh.CreatePlane('plane', 7)
      plane.parent = sphere
      plane.position.z = 2
      const advancedTexture = new GUI.AdvancedDynamicTexture.CreateForMesh(plane)
      // advancedTexture.vAng = Math.PI
      const button1 = new GUI.Button.CreateSimpleButton('but1', '查看视频')
      button1.width = 1
      button1.height = 0.4
      button1.color = 'white'
      button1.fontSize = 200
      button1.background = 'rgba(0,0,0,.5)'
      button1.onPointerUpObservable.add(() => {
        this.visible = true
      })
      advancedTexture.addControl(button1) */

      var sphere = new BABYLON.Mesh.CreateSphere('sphere1', 16, 100, scene1)
      sphere.position.x = 22
      sphere.position.y = -82
      sphere.position.z = 50
      sphere.isVisible = false
      // GUI
      var advancedTexture = new GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')

      var button = new GUI.Button.CreateSimpleButton('but1', '查看视频')
      button.width = '100px'
      button.height = '40px'
      button.cornerRadius = 20
      button.color = '#fff'
      button.thickness = 2
      button.background = 'rgba(0,0,0,.5)'
      advancedTexture.addControl(button)
      button.linkWithMesh(sphere)
      button.linkOffsetY = -250
      button.onPointerUpObservable.add(() => {
        this.visible = true
      })
      // label.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP

      // var text = new GUI.TextBlock()
      // text.text = '查看视频'
      // label.addControl(text)

      var line = new GUI.Line()
      line.lineWidth = 2
      line.color = '#fff'
      line.y2 = 20
      line.linkOffsetY = -20
      line.dash = [5, 10]
      advancedTexture.addControl(line)
      line.linkWithMesh(sphere)
      line.connectedControl = button

      // scene1.debugLayer.show()

      // 创建场景2
      scene2 = new BABYLON.Scene(this.engine)
      scene2.clearColor = clearColor
      // 加载模型
      BABYLON.SceneLoader.Append('./models/gltf/first-floor/', '1c.gltf', scene2, meshes => {
        camera = new BABYLON.ArcRotateCamera('Camera', 4.66, 1.15, 100, new BABYLON.Vector3(0, 0, 0), scene2)
        camera.cameraRotation = new BABYLON.Vector2(4.66, 1.15)
        camera.cameraDirection = new BABYLON.Vector3(0, -100, 50)
        camera.allowUpsideDown = false
        camera.useAutoRotationBehavior = true
        camera.useBouncingBehavior = true
        camera.lowerBetaLimit = 0.1 // 纬度轴上允许的最小角度
        camera.upperBetaLimit = (Math.PI / 2) * 0.9 // 纬度轴上允许的最大角度
        camera.lowerRadiusLimit = 10 // 摄像机到目标的最小允许距离（摄像机无法靠近）。
        camera.upperRadiusLimit = 200 // 摄像机到目标的最大允许距离（摄像机不能再远了）。
        camera.attachControl(canvas, true)
        const hemiLight = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene2)
        hemiLight.intensity = 2.5
        hemiLight.diffuse = new BABYLON.Color3(0.7, 0.7, 0.7)
        hemiLight.groundColor = new BABYLON.Color3(1, 1, 1)
        console.log('场景2加载成功')
      }, () => { }, error => {
        console.log('error', error)
      })

      this.changeScene()
    },
    changeScene () {
      this.engine.stopRenderLoop()
      this.engine.runRenderLoop(() => {
        if (this.active === 1) {
          scene2.render()
        } else {
          scene1.render()
        }
      })
      window.addEventListener('resize', () => {
        this.engine.resize()
      })
    },
    // 自定义loading
    customLoading () {
      class CustomLoadingScreen {
      }
      CustomLoadingScreen.prototype.displayLoadingUI = () => {
        this.loadingText = '加载中…'
      }
      CustomLoadingScreen.prototype.hideLoadingUI = () => {
        this.loading = false
      }
      var loadingScreen = new CustomLoadingScreen()
      this.engine.loadingScreen = loadingScreen
      this.engine.displayLoadingUI()
    },
    onClick (text, index) {
      this.active = index
      scene1.debugLayer.hide()
      scene2.debugLayer.hide()
      // if (index === 1) scene2.debugLayer.show()
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
  z-index: 99999;
}
.btn-bar {
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  bottom: 10px;
  text-align: center;
  .btn {
    cursor: pointer;
    margin: 0 16px;
    font-size: 20px;
    font-weight: 700;
    padding: 8px 16px;
    color: rgb(13, 206, 241);
    box-shadow: 0 0 10px inset rgba(13, 206, 241, 0.5);
    background: transparent;
    border: none;
    transition: 0.3s all;
    &:hover {
      box-shadow: 0 0 25px inset rgba(13, 206, 241, 0.5);
    }
    &.active {
      color: rgb(253, 240, 52);
      box-shadow: 0 0 10px inset rgb(253, 240, 52, 0.5);
    }
  }
}

.loading-screen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(-135deg, #006f79, darkblue);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
}
</style>
