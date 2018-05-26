
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './language'
import fastclick from 'fastclick'
import store from './store'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})

Vue.use(i18n)

fastclick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 判断app的登录态
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
