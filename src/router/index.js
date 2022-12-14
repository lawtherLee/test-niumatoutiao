import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// SPA
// 解决首屏加载慢的问题 路由懒加载（使用到路由页面再去请求）
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base" */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import(/* webpackChunkName: "user" */ '@/views/My')
      }
    ]
  },
  // 配置登录页面路由
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ '@/views/User')
  },
  {
    path: '/detail',
    props: ({ query }) => ({ articleId: query.articleID }),
    component: () =>
      import(/* webpackChunkName: "detail" */ '@/views/ArticleDetail')
  }
]

const router = new VueRouter({
  routes
})

export default router
