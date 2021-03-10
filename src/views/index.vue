<template>
  <canvas id="renderCanvas" touch-action="none" style="width: 100%;touch-action: none;"></canvas>
</template>

<script>
import 'pepjs'
import { Scene, Engine, ArcRotateCamera, Vector3, HemisphericLight, PointLight, MeshBuilder } from 'babylonjs'
export default {
  methods: {
    createScene (canvas) {
      const engine = new Engine(canvas, true)
      // 创建场景
      const scene = new Scene(engine)
      // 创建相机并添加场景
      const camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new Vector3.Zero(0, 0, 5), scene)
      camera.attachControl(canvas, true)
      new HemisphericLight('light1', new Vector3(1, 1, 0), scene)
      new PointLight('light2', new Vector3(0, 1, -1), scene)
      // 在场景中添加和网格
      new MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene)
      engine.runRenderLoop(() => {
        scene.render()
      })
      window.addEventListener('resize', function () {
        engine.resize()
      })
    }
  },
  mounted () {
    const canvas = document.querySelector('#renderCanvas')
    this.$el.addEventListener('pointermove', function (event) {
      console.log(event)
    })
    this.createScene(canvas)
  }
}
</script>
