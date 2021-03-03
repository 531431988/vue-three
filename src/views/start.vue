<template>
  <div>
    <Threejs @init="onInit" :id="`threejs${_uid}`" />
  </div>
</template>

<script>
import Threejs from '@/components/Threejs'
import OrbitControls from 'three-orbitcontrols'
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
    onInit ({ scene, camera, renderer }, THREE) {
      this.$nextTick(() => {
        const box = this.$el.querySelector(`#threejs${this._uid}`)
        renderer.setSize(box.clientWidth, 600)
        this.dom = renderer.domElement
        box.appendChild(renderer.domElement)
        // const geometry = new THREE.BoxGeometry()
        const geometry = new THREE.SphereGeometry(3, 32, 32)
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        const shape = new THREE.Mesh(geometry, material)
        scene.add(shape)

        camera.position.z = 5

        const animate = function () {
          requestAnimationFrame(animate)

          shape.rotation.x += 0.01
          shape.rotation.y += 0.01

          renderer.render(scene, camera)
        }
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        animate()
      })
    }
  },
  mounted () { }
}
</script>

<style lang="scss" scoped></style>
