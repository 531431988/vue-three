<template>
  <div></div>
</template>

<script>
import * as THREE from 'three'
export default {
  data () {
    return {
      dom: null
    }
  },
  created () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer()
    this.$emit('init', { scene, camera, renderer }, THREE)
  }
}
</script>

<style lang="scss" scoped></style>
