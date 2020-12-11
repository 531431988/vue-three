<template>
  <PageHeaderWrapper title="">
    <RouteView />
  </PageHeaderWrapper>
</template>

<script>
import RouteView from './RouteView'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
export default {
  name: 'PageView',
  components: {
    PageHeaderWrapper,
    RouteView
  }
}
</script>
