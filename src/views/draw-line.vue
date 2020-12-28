<template>
  <div>
    <Threejs @init="onInit" :id="`threejs${_uid}`" />
  </div>
</template>

<script>
import Threejs from '@/components/Threejs'
export default {
  components: {
    Threejs
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    onInit ({ scene, renderer }, THREE) {
      this.$nextTick(() => {
        const box = this.$el.querySelector(`#threejs${this._uid}`)
        renderer.setSize(box.clientWidth, 500)
        this.dom = renderer.domElement
        box.appendChild(renderer.domElement)
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
        camera.position.set(0, 0, 100)
        camera.lookAt(0, 0, 0)
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
        const points = [new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0), new THREE.Vector3(10, 0, 0)]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(geometry, material)
        scene.add(line)
        renderer.render(scene, camera)
      })
    }
  },
  mounted () { }
}
</script>

<style lang="scss" scoped></style>
