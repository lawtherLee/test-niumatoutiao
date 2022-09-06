import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// SPA
// 解决首屏加载慢的问题 路由懒加载（使用到路由页面再去请求）
const routes = [
  // 配置登录页面路由
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
