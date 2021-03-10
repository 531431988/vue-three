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
      // const camera = new ArcRotateCamera('Camera', 0, 0, 20, new Vector3(), scene)
      // camera.attachControl(canvas, true)
      // const hdrTexture = new HDRCubeTexture('./night.hdr', scene, 512)
      const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData('./environment.dds', scene)
      scene.createDefaultSkybox(hdrTexture, true)

      // 在场景中添加
      BABYLON.SceneLoader.Append('./models/gltf/Duck/', 'Duck.gltf', scene, (meshes) => {
      })
      /* meshes.actionManager = new ActionManager(scene)
      console.log(new ActionManager(scene))
      meshes.actionManager.registerAction(new ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
        alert('mesh clicked')
      })) */
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
