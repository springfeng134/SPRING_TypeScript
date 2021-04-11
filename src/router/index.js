import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Customer/List',
      name: 'CustomersList',
      component: () => import('@/views/customer/list'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/cat',
      name: 'cat',
      component: () => import('@/views/cat'),
      redirect: '/cat/sundayday',
      children: [
        {
          path: '/cat/sundayday',
          name: 'catSunday',
          component: () => import('@/views/cat/sundayday'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/cat/sankou',
          name: 'catSankou',
          component: () => import('@/views/cat/sankou'),
          meta: {
            keepAlive: true
          }
        }
      ]
    }
  ]
})
