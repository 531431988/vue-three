<template>
  <div class="header">
    <h2 class="title">某某某智慧车间演示</h2>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 90">
      <defs>
        <linearGradient id="a" x1="960" y1="-3" x2="960" y2="91" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff" stop-opacity="0" />
          <stop offset="1" stop-color="#406ff0" />
        </linearGradient>
        <linearGradient id="b" y1="90" x2="1920" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff" stop-opacity="0" />
          <stop offset="0.5" stop-color="#406ff0" />
          <stop offset="1" stop-color="#fff" />
        </linearGradient>
      </defs>
      <polygon points="659.18 0 1260.82 0 1197.76 91 722.24 91 659.18 0 659.18 0" style="fill:#406ff0;fill-rule:evenodd;opacity:0.55" />
      <path d="M659.18-1.5V0H1258l-61,88H723L660.42-2.36l-1.24.86v0L658-.65l63,91,1.24.64h475.52l1.23-.64,63.06-91a1.49,1.49,0,0,0,.09-1.55,1.49,1.49,0,0,0-1.33-.8H659.18a1.49,1.49,0,0,0-1.32.8A1.47,1.47,0,0,0,658-.65l1.23-.85Z" style="fill:url(#a)" />
      <rect y="89" width="1920" height="2" style="fill:url(#b)" />
      <polygon points="697.98 0 1222.02 0 1167.1 91 752.9 91 697.98 0 697.98 0" style="fill:#406ff0;fill-rule:evenodd;opacity:0.2" />
    </svg> -->
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
.header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 90px;
  overflow: hidden;
  background: url('../../../assets/data-view/header.png') center no-repeat
    rgba(0, 17, 25, 0.8);
  background-size: 100%;
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    color: #fff;
    font-size: 42px;
    font-weight: 700;
    letter-spacing: 8px;
    animation: neon2 1.5s ease-in-out infinite alternate;
  }
}
@keyframes neon2 {
  from {
    text-shadow: 0 0 5px #228dff, 0 0 10px #228dff, 0 0 15px #228dff,
      0 0 20px #228dff;
  }
  to {
    text-shadow: 0 0 10px #228dff, 0 0 15px #228dff, 0 0 20px #228dff,
      0 0 25px #228dff, 0 0 30px #228dff;
  }
}
</style>
