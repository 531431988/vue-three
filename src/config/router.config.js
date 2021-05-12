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
          title: '首页',
          icon: 'home'
        }
      },
      {
        path: '/start',
        name: 'start',
        redirect: '/start/index',
        component: RouteView,
        meta: {
          title: '起步',
          icon: 'rocket'
        },
        children: [
          {
            path: '/set-shape',
            name: 'set-shape',
            component: () => import('@/views/start/set-shape'),
            meta: {
              title: '设置形状'
            }
          },
          {
            path: '/parametric-shapes',
            name: 'parametric-shapes',
            component: () => import('@/views/start/parametric-shapes'),
            meta: {
              title: '参数形状'
            }
          },
          {
            path: '/load-gltf',
            name: 'load-gltf',
            component: () => import('@/views/start/load-gltf'),
            meta: {
              title: '加载gltf'
            }
          },
          {
            path: '/load-glb',
            name: 'load-glb',
            component: () => import('@/views/start/load-glb'),
            meta: {
              title: '加载glb'
            }
          }, {
            path: '/video-texture',
            name: 'video-texture',
            component: () => import('@/views/start/video-texture'),
            meta: {
              title: '视频贴图'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/data-view',
    name: 'data-view',
    component: () => import('@/views/data-view/index'),
    meta: {
      title: '3D大屏'
    }
  }
]

export default routes
