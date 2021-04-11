import Vue from 'vue'
import App from './App.vue'
import BaiduMap from './utils/vue-baidu-map/'
import router from './router/'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import component from './components/global.js'
const vm = new Vue()
Vue.use(Element, {
  size: 'mini'
})
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'rd7c3jggMiQS8zzwZPj0Ue5heANq3ZGK'
})
Vue.config.productionTip = false
component.install()

router.beforeEach((to: any, from, next) => {
  if (to.meta.requireAuth) {
    if (false) {
      next();
    } else {
      next({
        path: '/cat',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (!vm.catDD) {
      promiseMock().then((res: any) => {
        import('@/views/header-mock').then((res: any) => {
          const json: any = res.default.json
          let options = json[to.name]
          console.log(options)
          next()
        })
      })
    } else {
      import('@/views/header-mock').then((res: any) => {
        const json: any = res.default.json
        let options = json[to.name]
        console.log(options)
        next()
      })
    }
  }
})

function promiseMock() {
  return new Promise((resolve: any, reject: any) => {
    setTimeout(() => {
      Vue.prototype.catDD = 'my'
      resolve('1s request')
    })
  })
}

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
