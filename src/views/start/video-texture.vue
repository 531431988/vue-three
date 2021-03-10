<template>
  <canvas id="renderCanvas" touch-action="none" style="width: 100%;touch-action: none;"></canvas>
</template>

<script>
import 'pepjs'
import { Scene, Engine, ArcRotateCamera, Vector3, HemisphericLight, PointLight, MeshBuilder, StandardMaterial, CubeTexture, VideoTexture, Color3, PointerEventTypes } from 'babylonjs'
import 'babylonjs-loaders'
export default {
  methods: {
    createScene (canvas, callback) {
      const engine = new Engine(canvas, true)
      // 创建场景
      const scene = new Scene(engine)
      // 创建相机并添加场景
      const camera = new ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 2, 5, new Vector3.Zero(), scene)
      camera.attachControl(canvas, true)
      const light = new HemisphericLight('hemiLigt', new Vector3(-1, 1, 0), scene)
      light.diffuse = new Color3(1, 1, 1)

      // 天空盒
      /*  var skybox = new MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene)
      var skyboxMaterial = new StandardMaterial('skyBox', scene)
      skyboxMaterial.backFaceCulling = false
      skyboxMaterial.disableLighting = true
      skyboxMaterial.reflectionTexture = new CubeTexture('./skybox/TropicalSunnyDay', scene)
      skyboxMaterial.reflectionTexture.coordinatesMode = new Texture.SKYBOX_MODE
      skyboxMaterial.diffuseColor = new Color3(0, 0, 0)
      skyboxMaterial.specularColor = new Color3(0, 0, 0)
      skybox.material = skyboxMaterial
      skybox.infiniteDistance = true
      skybox.renderingGroupId = 0 */
      var planeOpts = {
        height: 5.4762,
        width: 7.3967,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
      }
      var ANote0Video = new MeshBuilder.CreatePlane('plane', planeOpts, scene)
      var vidPos = new Vector3(0, 0, 0.1)
      ANote0Video.position = vidPos
      var ANote0VideoMat = new StandardMaterial('m', scene)
      var ANote0VideoVidTex = new VideoTexture('vidtex', './video.mp4', scene)
      ANote0VideoMat.diffuseTexture = ANote0VideoVidTex
      ANote0VideoMat.roughness = 1
      ANote0VideoMat.emissiveColor = new Color3.White()
      ANote0Video.material = ANote0VideoMat
      ANote0VideoVidTex.video.muted = true
      ANote0VideoVidTex.video.play()
      scene.onPointerObservable.add(evt => {
        if (evt.pickInfo.pickedMesh === ANote0Video) {
          if (ANote0VideoVidTex.video.paused) {
            ANote0VideoVidTex.video.play()
          } else {
            ANote0VideoVidTex.video.pause()
          }
          console.log(ANote0VideoVidTex.video.paused ? 'paused' : 'playing')
        }
      }, BABYLON.PointerEventTypes.POINTERPICK)

      engine.runRenderLoop(() => {
        scene.render()
      })
      window.addEventListener('resize', function () {
        engine.resize()
      })
      callback && callback(scene)
    }
  },
  mounted () {
    const canvas = document.querySelector('#renderCanvas')
    this.createScene(canvas, scene => {
    })
  }
}
</script>
