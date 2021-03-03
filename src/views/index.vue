<template>
  <ModelFbx :backgroundAlpha="0" @on-load="onLoad" @on-click="onClick" src="/models/fbx/city/city.fbx"></ModelFbx>
</template>

<script>
import { ModelFbx } from 'vue-3d-model'

export default {
  components: {
    ModelFbx
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    onLoad () {
      this.loading = false
    },
    onClick (e) {
      console.log(e)
    }
  }
}
</script>
