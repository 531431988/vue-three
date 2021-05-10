<template>
  <canvas id="renderCanvas" touch-action="none" style="width: 100%;touch-action: none;"></canvas>
</template>

<script>
import 'pepjs'
import { Scene, Engine, ArcRotateCamera, Vector3, HemisphericLight, PointLight, MeshBuilder, HDRCubeTexture, ActionManager, ExecuteCodeAction } from 'babylonjs'
import 'babylonjs-loaders'
export default {
  methods: {
    createScene (canvas) {
      const engine = new Engine(canvas, true)
      const scene = new Scene(engine)

      scene.createDefaultCameraOrLight(true, true, true)
      scene.activeCamera.radius = 20

      // const hdrTexture = new HDRCubeTexture('./night.hdr', scene, 512)
      const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData('./environment.dds', scene)
      scene.createDefaultSkybox(hdrTexture, true)

      var sphere = new MeshBuilder.CreateSphere('sphere1', { diameter: 5 }, scene)
      sphere.position.x = 2
      sphere.actionManager = new ActionManager(scene)
      sphere.actionManager.registerAction(new ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
        alert('sphere clicked')
      }))
      console.log('sphere', sphere)

      // 在场景中添加
      BABYLON.SceneLoader.Append('./models/gltf/nanfangdalou/', 'nanfangdalou.gltf', scene, res => {
        console.log('Append', res)
        res.meshes[3].scaling.scaleInPlace(15)
        res.meshes[3].actionManager = new ActionManager(scene)
        res.meshes[3].actionManager.registerAction(new ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
          alert('Append clicked')
        }))
      })
      /* Promise.all([
        BABYLON.SceneLoader.ImportMeshAsync(null, './models/gltf/Duck/', 'scene.gltf', scene).then((res) => {
          console.log('ImportMeshAsync', res)
          res.meshes[1].scaling.scaleInPlace(5)
          res.meshes[1].actionManager = new ActionManager(scene)
          res.meshes[1].actionManager.registerAction(new ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            alert('ImportMeshAsync clicked')
          }))
        })
      ]) */

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
