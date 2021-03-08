<template>
  <ProLayout :menus="menus" :collapsed="collapsed" :theme="theme" :fixSiderbar="true" :fixedHeader="true" :layout="layout" :contentWidth="contentWidth" :auto-hide-header="autoHideHeader" :mediaQuery="query" :isMobile="isMobile" :i18nRender="t => t" :handleCollapse="handleCollapse"
    :handleMediaQuery="handleMediaQuery">
    <template v-slot:menuHeaderRender>
      <div>
        <logoSvg />
        <h1>vue-babylonjs</h1>
      </div>
    </template>
    <template v-slot:rightContentRender>
      <div :class="[
          'ant-pro-global-header-index-right',
          layout === 'topmenu' && `ant-pro-global-header-index-${theme}`
        ]">
        rightContentRender
      </div>
    </template>
    <template v-slot:footerRender>
      <div>footerRender</div>
    </template>
    <router-view />
  </ProLayout>
</template>

<script>
import ProLayout from '@ant-design-vue/pro-layout'
import routes from '@/config/router.config'
import logoSvg from '@/assets/logo.svg'
export default {
  name: 'BasicLayout',
  components: {
    ProLayout,
    logoSvg
  },
  data () {
    return {
      menus: [],
      collapsed: false,
      autoHideHeader: false,
      query: {},
      layout: 'sidemenu',
      contentWidth: 'Fluid',
      theme: 'dark',
      isMobile: false
    }
  },
  created () {
    this.menus = routes.find(item => item.path === '/').children
  },
  methods: {
    handleMediaQuery (query) {
      this.query = query
      if (this.isMobile && !query['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && query['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
      }
    },
    handleCollapse (collapsed) {
      this.collapsed = collapsed
    }
  }
}
</script>
<style lang="less" scoped>
.ant-pro-sider-menu {
  /deep/ .ant-menu {
    .anticon::before {
      display: block;
    }
  }
}
.ant-layout-footer {
  display: none;
}
</style>
