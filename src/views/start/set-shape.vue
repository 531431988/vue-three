<template>
  <canvas id="renderCanvas" touch-action="none" style="width: 100%;touch-action: none;"></canvas>
</template>

<script>
import 'pepjs'
import { Scene, Engine, ArcRotateCamera, Vector3, HemisphericLight, PointLight, MeshBuilder, ActionManager, ExecuteCodeAction, StandardMaterial, Texture, Color3 } from 'babylonjs'
import 'babylonjs-loaders'
export default {
  methods: {
    createScene (canvas) {
      const engine = new Engine(canvas, true)
      // 创建场景
      const scene = new Scene(engine)
      // 创建相机并添加场景
      const camera = new ArcRotateCamera('Camera', 0, 0.8, 300, new Vector3.Zero(), scene)
      // camera.allowUpsideDown = false
      // camera.useAutoRotationBehavior = true
      // camera.setPosition(new Vector3(0, 3, 3))
      camera.lowerBetaLimit = 0.1 // 纬度轴上允许的最小角度
      camera.upperBetaLimit = (Math.PI / 2) * 0.9 // 纬度轴上允许的最大角度
      camera.lowerRadiusLimit = 2 // 摄像机到目标的最小允许距离（摄像机无法靠近）。
      camera.upperRadiusLimit = 8 // 摄像机到目标的最大允许距离（摄像机不能再远了）。
      camera.speed = 10000000000
      camera.useInputToRestoreState = true
      camera.attachControl(canvas, true)
      // camera.detachControl()

      new HemisphericLight('light1', new Vector3(1, 1, 0), scene)
      new PointLight('light2', new Vector3(0, 1, -1), scene)
      // 创建一个平面网格
      const plane = new MeshBuilder.CreatePlane('plane', { height: 12, width: 18 }, scene)
      plane.rotation.x = Math.PI / 2
      plane.position.x = -1
      // 材质
      const planMaterial = new StandardMaterial('texturePlane', scene)
      planMaterial.diffuseTexture = new Texture('./models/gltf/baidu/grass.jpg', scene)
      planMaterial.diffuseTexture.uScale = 5.0
      planMaterial.diffuseTexture.vScale = 5.0 // 在水平轴上重复5次
      planMaterial.backFaceCulling = false // 总是显示元素的正面和背面
      plane.material = planMaterial

      // 在场景中添加
      Promise.all([
        BABYLON.SceneLoader.ImportMeshAsync(null, './models/gltf/baidu/', 'baidu-o.gltf', scene).then((res) => {
          console.log(res.meshes[1].material)
          // res.meshes[1].outlineWidth = 10
          // res.meshes[1].outlineColor = new Color3(1, 0, 0)
          res.meshes[1].showBoundingBox = true
          res.meshes[1].showSubMeshesBoundingBox = true
          res.meshes[1].actionManager = new ActionManager(scene)
          res.meshes[1].actionManager.registerAction(new ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, () => {
            this.$message.info('别乱点兄弟')
            console.log('ImportMeshAsync clicked')
          }))
        }),
        BABYLON.SceneLoader.ImportMeshAsync(null, './models/gltf/baidu/', 'baidu-wire-o.gltf', scene),
        BABYLON.SceneLoader.ImportMeshAsync(null, './models/gltf/baidu/', 'lu.gltf', scene),
        BABYLON.SceneLoader.ImportMeshAsync(null, './models/gltf/baidu/', 'building-o.gltf', scene)
      ])

      engine.runRenderLoop(() => {
        scene.render()
      })
      window.addEventListener('resize', function (e) {
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
