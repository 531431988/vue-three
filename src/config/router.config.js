import BasicLayout from '@/layouts/BasicLayout'
import PageView from '@/layouts/PageView'
const routes = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    redirect: '/',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/start',
        name: 'start',
        redirect: '/start/index',
        component: PageView,
        meta: {
          title: '起步'
        },
        children: [
          {
            path: '/index',
            name: 'start',
            component: () => import('@/views/start'),
            meta: {
              title: '创建一个场景'
            }
          },
          {
            path: '/draw-line',
            name: 'draw-line',
            component: () => import('@/views/draw-line'),
            meta: {
              title: '画线'
            }
          }
        ]
      }
    ]
  }
]

export default routes
