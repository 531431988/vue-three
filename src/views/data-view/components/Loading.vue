<template>
  <div class="loading">
    <div class="outer"></div>
    <div class="inner"></div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@blue: rgb(13, 206, 241);
.loading {
  position: relative;
  width: 100px;
  height: 100px;
  .outer {
    width: 100%;
    height: 100%;
    border: 5px solid @blue;
    opacity: 0.9;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-shadow: 0 0 35px darken(@blue, 30%);
    animation: spin-right 0.5s linear infinite;
    animation-delay: 0;
  }
  .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60%;
    height: 60%;
    border: 5px solid @blue;
    opacity: 0.9;
    border-radius: 50%;
    border-left-color: transparent;
    border-bottom-color: transparent;
    box-shadow: 0 0 35px darken(@blue, 30%);
    animation: spin-left 0.5s linear infinite;
    animation-delay: 0;
    margin: -30% 0 0 -30%;
  }
}

.animation
  (@name, @duration:1s, @delay:0, @ease:linear, @iterations:infinite, @endState:normal) {
  animation: @name @duration @ease @iterations @endState;
}
@keyframes spin-left {
  from {
    transform: rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: rotate(-180deg);
    opacity: 1;
  }
  to {
    transform: rotate(-360deg);
    opacity: 0.2;
  }
}

@keyframes spin-right {
  from {
    transform: rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: rotate(180deg);
    opacity: 1;
  }
  to {
    transform: rotate(360deg);
    opacity: 0.2;
  }
}
</style>
