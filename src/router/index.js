import Vue from 'vue'
import Router from 'vue-router'
import i18n from './../language'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: (resolve) => {
        require(['@/pages/home/home'], resolve)
      },
      meta: {
        // 首页
        title: i18n.t('meta.index')
      },
      redirect: `home/${i18n.locale}`
    },
    {
      path: `/home/${i18n.locale}`,
      name: 'homes',
      component: (resolve) => {
        require(['@/pages/home/home'], resolve)
      },
      meta: {
        // 首页
        title: i18n.t('meta.index')
      }
    }
  ]
})
