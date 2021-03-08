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
            component: () => import('@/views/start/index'),
            meta: {
              title: '创建一个场景'
            }
          }
        ]
      }
    ]
  }
]

export default routes
