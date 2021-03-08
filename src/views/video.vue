<template>
  <div>
    <video v-show="false" ref="video" src="../../public/video.mp4" autoplay loop></video>
  </div>
</template>

<script>

import { Mesh, OrthographicCamera, Scene, WebGLRenderer, AmbientLight, PlaneGeometry, MeshPhongMaterial, VideoTexture } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    const scene = new Scene()

    /* const video = document.createElement('video')
    video.src = './video.mp4'
    video.autoplay = 'autoplay' */
    const video = this.$refs.video
    const texture = new VideoTexture(video)
    const geometry = new PlaneGeometry(500, 250)
    const material = new MeshPhongMaterial({
      map: texture
    })
    console.log(geometry.toJSON())
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const light = new AmbientLight(0xffffff)
    scene.add(light)

    const w = window.innerWidth - 256 - 48
    const h = 300
    const r = w / h
    const s = 300
    const camera = new OrthographicCamera(-s * r, s * r, s, -s, 1, 1000)
    camera.position.set(300, 300, 400)
    camera.lookAt(scene.position)
    const renderer = new WebGLRenderer()
    renderer.setSize(w, h)
    renderer.setClearColor(0xf8f8f8, 1)
    this.$el.appendChild(renderer.domElement)

    // 自动旋转  均匀旋转
    function render () {
      requestAnimationFrame(render)
      renderer.render(scene, camera)// 执行渲染操作
    }
    render()
    const controls = new OrbitControls(camera, renderer.domElement)
  }
}
</script>

<style lang="less" scoped>
</style>
