const routes = [
  {
    path: '/',
    name: 'data-view',
    component: () => import('@/views/data-view/index'),
    meta: {
      title: '3D大屏'
    }
  }
]

export default routes
