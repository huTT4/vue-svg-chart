import { createRouter, createWebHashHistory } from 'vue-router'

import SvgView from '@/views/SvgView.vue'
import ChartView from '@/views/ChartView.vue'

const routes = [
  { path: '/svg', component: SvgView },
  { path: '/chart', component: ChartView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, _, next) => {
  if (to.path === '/') next('/chart')
  else next()
})

export default router
