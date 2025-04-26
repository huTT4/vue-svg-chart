import { createRouter, createWebHistory } from 'vue-router'

import SvgTask from '@/views/SvgTask.vue'
import ChartTask from '@/views/ChartTask.vue'

const routes = [
  { path: '/svg', component: SvgTask },
  { path: '/chart', component: ChartTask }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router