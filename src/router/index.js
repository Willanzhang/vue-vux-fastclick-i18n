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
    },
    {
      path: `/list/${i18n.locale}`,
      name: 'list',
      component: (resolve) => {
        require(['@/pages/list/list'], resolve)
      },
      meta: {
        // 记录
        title: i18n.t('meta.list')
      }
    },
    {
      path: `/userCenter/${i18n.locale}`,
      name: 'userCenter',
      component: (resolve) => {
        require(['@/pages/userCenter/userCenter'], resolve)
      },
      meta: {
        // 个人中心
        title: i18n.t('meta.userCenter')
      }
    },
    {
      path: `/kiting/${i18n.locale}`,
      name: 'kiting',
      component: (resolve) => {
        require(['@/pages/kiting/kiting'], resolve)
      },
      meta: {
        // 提现
        title: i18n.t('meta.kiting')
      }
    }
  ]
})
