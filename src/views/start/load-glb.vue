<template>
  <div>
    <div class="loading-screen" v-if="loading">
      <div class="loading"></div>
      <div class="text">{{loadingText}}</div>
    </div>
    <canvas id="renderCanvas" touch-action="none" style="width: 100%;touch-action: none;"></canvas>
  </div>
</template>

<script>
import 'pepjs'
import { Scene, Engine, ArcRotateCamera, Vector3, HemisphericLight, PointLight, MeshBuilder, HDRCubeTexture, ActionManager, ExecuteCodeAction } from 'babylonjs'
import 'babylonjs-loaders'
export default {
  data () {
    return {
      loading: true,
      loadingText: 'loading'
    }
  },
  methods: {
    createScene (canvas) {
      const engine = new Engine(canvas, true)
      class CustomLoadingScreen {
      }
      CustomLoadingScreen.prototype.displayLoadingUI = () => {
        this.loadingText = '加载中…'
      }
      CustomLoadingScreen.prototype.hideLoadingUI = () => {
        this.loading = false
      }
      var loadingScreen = new CustomLoadingScreen()
      engine.loadingScreen = loadingScreen
      engine.displayLoadingUI()

      const scene = new Scene(engine)

      scene.createDefaultCameraOrLight(true, true, true)

      BABYLON.SceneLoader.Append('./models/', 'fish.glb', scene, function (container) {
        container.meshes[0].scaling.scaleInPlace(0.1)

        // Add loaded file to the scene
        container.addAllToScene()
        engine.hideLoadingUI()
      })
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
<style lang="less" scoped>
.loading-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading {
    width: 50px;
    height: 50px;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      border-radius: 100%;
      background-color: #fff;
      opacity: 0.6;
      animation: bounce 2s infinite ease-in-out;
    }
    &::after {
      animation-delay: -1s;
    }
  }
  .text {
    text-align: center;
    color: #fff;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
}
</style>
