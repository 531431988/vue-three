<template>
  <canvas id="renderCanvas" touch-action="none" style="width: 100%;height: 100vh;touch-action: none;"></canvas>
</template>

<script>
import 'pepjs'
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import 'babylonjs-loaders'
export default {
  methods: {
    createScene (canvas) {
      const engine = new BABYLON.Engine(canvas, true)
      var scene = new BABYLON.Scene(engine)
      var camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene)
      camera.setPosition(new BABYLON.Vector3(0, 0, 10))
      camera.attachControl(canvas, true)
      // camera.lowerRadiusLimit = 100
      // camera.upperRadiusLimit = 10

      BABYLON.SceneLoader.Append('./models/gltf/tap/', 'scene.gltf', scene)
      engine.runRenderLoop(() => {
        scene.render()
      })
      window.addEventListener('resize', function () {
        engine.resize()
      })
      console.log(scene)
      this.createGUI(scene)
    },
    createGUI (scene) {
      const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
      var button1 = new GUI.Button.CreateSimpleButton('but1', '1')
      button1.top = '-20%'
      button1.width = '40px'
      button1.height = '40px'
      button1.color = 'white'
      button1.cornerRadius = 1000
      button1.background = 'rgba(0,0,0,.5)'
      button1.onPointerUpObservable.add(function () {
        alert(11111)
      })
      advancedTexture.addControl(button1)
      button1.linkWithMesh(scene.meshes[0])

      /* const btn = new GUI.Ellipse('btn')
      const text = new GUI.TextBlock()
      text.text = '1'
      btn.width = '40px'
      btn.height = '40px'
      btn.color = '#fff'
      btn.thickness = 2
      btn.background = 'rgba(0,0,0,.5)'
      btn.addControl(text)
      btn.onPointerClickObservable.add(function () {
        alert('you did it!')
      })
      advancedTexture.addControl(btn)
      btn.linkWithMesh(scene.meshes[0])
      console.log(btn) */
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

<style>
</style>
