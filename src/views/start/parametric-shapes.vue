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
      const camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 4, 4, new Vector3.Zero(), scene)
      camera.attachControl(canvas, true)
      new HemisphericLight('light1', new Vector3(1, 1, 0), scene)
      new PointLight('light2', new Vector3(0, 1, -1), scene)
      // 在场景中添加
      const points = []
      const deltaTheta = 0.1
      const deltaY = 0.005
      const radius = 1
      let theta = 0
      let Y = 0
      for (var i = 0; i < 400; i++) {
        points.push(new Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)))
        theta += deltaTheta
        Y += deltaY
      }
      new MeshBuilder.CreateLines('lines', { points }, scene)
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
    this.createScene(canvas)
  }
}
</script>
