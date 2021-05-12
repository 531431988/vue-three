<template>
  <div class="card">
    <h2 class="title">{{title}}</h2>
    <slot></slot>
    <div class="border"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
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
.card {
  position: relative;
  background: rgba(0, 17, 25, 0.6);
  height: calc((100vh - 90px - 96px) / 3);
  margin-bottom: 24px;
  padding: 24px;
  box-shadow: 0 0 5px inset rgb(0, 145, 255, 0.1);
  overflow: hidden;
  &:before,
  &:after,
  .border:before,
  .border:after {
    position: absolute;
    width: 23px;
    height: 23px;
    content: '';
  }
  &:before,
  &:after {
    top: 0;
    border-top: 3px solid rgb(0, 145, 255);
  }
  &:before,
  .border:before {
    border-left: 3px solid rgb(0, 145, 255);
    left: 0;
  }
  &:after,
  .border:after {
    border-right: 3px solid rgb(0, 145, 255);
    right: 0;
  }

  .border {
    &:before,
    &:after {
      border-bottom: 3px solid rgb(0, 145, 255);
      bottom: 0;
    }
  }
  .title {
    padding-left: 8px;
    line-height: 1;
    border-left: 1px solid #45d8ff;
    color: #45d8ff;
    font-weight: 700;
  }
}
</style>
