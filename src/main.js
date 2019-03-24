// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
import './common/css/reset.css'
import './common/iconfont/iconfont.css'
import './common/iconfont/iconfont'
import router from './router'
import store from './store/index'
import axios from 'axios'
Vue.config.productionTip = false
let hotelMoney = {
  "A": 220,
  "B": 280,
  "C": 380,
  "D": 480,
  "E": 1280
}
Vue.prototype.hotelMoney = hotelMoney
Vue.use(ElementUI)
import * as socketApi from './common/js/socket'
Vue.prototype.socketApi = socketApi

router.beforeEach((to, from, next) => { // 这里做个路由拦截，需要先登录
  if(to.matched.some(res => res.meta.requireAuth)) {
    axios.get('/api/users/authrize', {
      params: {username: store.state.userName}
    }).then(res => {
      if (res.data.code === 0) {
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
