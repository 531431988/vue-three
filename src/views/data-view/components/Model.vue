<template>
  <div>
    <canvas id="renderCanvas" touch-action="none" style="width: 100%;height: 100vh;touch-action: none;"></canvas>
    <div class="btn-bar">
      <button :class="{btn: true, active: active === index}" v-for="(btn, index) in btns" :key="index" @click="onClick(btn,index)">{{btn}}</button>
    </div>
    <a-modal v-model="visible" width="40%" :closable="false" centered :footer="null" :bodyStyle="{padding: 0}" dialogClass="dialogClass">
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
  data () {
    return {
      active: 0,
      btns: ['全景视图', '进入一层'],
      visible: false
    }
  },
  watch: {
    active () {
      // this.advancedTexture && this.advancedTexture.dispose()
      this.changeScene()
    }
  },
  methods: {
    createScene (canvas) {
      const clearColor = new BABYLON.Color4(0.5, 0.5, 0.5, 1)
      this.engine = new BABYLON.Engine(canvas, true)
      // 创建场景1
      scene1 = new BABYLON.Scene(this.engine)
      scene1.clearColor = clearColor
      const camera1 = new BABYLON.ArcRotateCamera('Camera', 4.67, 1.45, 100, new BABYLON.Vector3(0, -100, 50), scene1)
      camera1.allowUpsideDown = false
      camera1.useAutoRotationBehavior = true
      camera1.useBouncingBehavior = true
      camera1.lowerBetaLimit = 0.1 // 纬度轴上允许的最小角度
      camera1.upperBetaLimit = (Math.PI / 2) * 0.9 // 纬度轴上允许的最大角度
      camera1.lowerRadiusLimit = 10 // 摄像机到目标的最小允许距离（摄像机无法靠近）。
      camera1.upperRadiusLimit = 240 // 摄像机到目标的最大允许距离（摄像机不能再远了）。
      camera1.attachControl(canvas, true)
      const light1 = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0.60, -0.7, 0.63), scene1)
      light1.position = new BABYLON.Vector3(-0.05, 0.35, -0.05)
      light1.intensity = 8
      new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene1)

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
      advancedTexture.addControl(button1)
      console.log(scene1.getMeshByID('dizhaunqi'))

      // 加载模型
      BABYLON.SceneLoader.Append('./models/gltf/dongfangnanfang/', 'dfnf.gltf', scene1, res => {
        console.log('场景1加载成功')
      })

      // 创建场景2
      scene2 = new BABYLON.Scene(this.engine)
      scene2.clearColor = clearColor
      // scene2.createDefaultCameraOrLight(true, true, true)
      const camera2 = new BABYLON.ArcRotateCamera('Camera', 4.66, 1.15, 100, new BABYLON.Vector3(0, 0, 0), scene2)
      camera2.allowUpsideDown = false
      camera2.cameraRotation = new BABYLON.Vector2(4.66, 1.15)
      camera2.cameraDirection = new BABYLON.Vector3(0, -100, 50)
      camera2.useAutoRotationBehavior = true
      camera2.lowerBetaLimit = 0.1 // 纬度轴上允许的最小角度
      camera2.upperBetaLimit = (Math.PI / 2) * 0.9 // 纬度轴上允许的最大角度
      camera2.lowerRadiusLimit = 20 // 摄像机到目标的最小允许距离（摄像机无法靠近）。
      camera2.upperRadiusLimit = 200 // 摄像机到目标的最大允许距离（摄像机不能再远了）。
      camera2.attachControl(canvas, true)
      const light2 = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0.60, -0.7, 0.63), scene2)
      light2.position = new BABYLON.Vector3(-0.05, 0.35, -0.05)
      light2.intensity = 8
      new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene2)
      // 加载模型
      BABYLON.SceneLoader.Append('./models/gltf/first-floor/', '1c.gltf', scene2, res => {
        console.log('场景2加载成功')
      }, () => { }, error => {
        console.log('error', error)
      })

      this.changeScene()
    },
    changeScene () {
      this.engine.stopRenderLoop()
      /* if (this.active === 1) {
        scene2.debugLayer.show()
      } else {
        scene1.debugLayer.show()
      } */
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
    createGUI () {

      /*  scene1.registerBeforeRender(function () {
        plane.lookAt(camera.position)
      })
 */
      /* var advancedTexture = new GUI.AdvancedDynamicTexture.CreateForMesh(plane)
      const button = new GUI.Button.CreateSimpleButton('but', '查看视频')
      button.width = 0.2
      button.height = '40px'
      button.color = 'white'
      button.background = 'rgba(0,0,0,.5)'
      button.onPointerUpObservable.add(() => {
        alert(1)
      })
      advancedTexture.addControl(button) */
    },
    onClick (text, index) {
      this.active = index
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
</style>
<style lang="less">
.dialogClass {
}
</style>
