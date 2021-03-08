import BasicLayout from '@/layouts/BasicLayout'
import RouteView from '@/layouts/RouteView'
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
        component: RouteView,
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
          },
          {
            path: '/top',
            name: 'top',
            component: () => import('@/views/top'),
            meta: {
              title: '顶点'
            }
          },
          {
            path: '/material',
            name: 'material',
            component: () => import('@/views/material'),
            meta: {
              title: '材质'
            }
          },
          {
            path: '/video',
            name: 'video',
            component: () => import('@/views/video'),
            meta: {
              title: '加载视频'
            }
          }
        ]
      }
    ]
  }
]

export default routes
