import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Product from '@/views/Product.vue'
import NProgress from 'nprogress'
import 'nProgress/nprogress.css'
import New from '@/views/New.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/news/:id',
      name: 'new',
      component: New
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },

  ]
})


//加载时出现进度条，页面上面
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})
router.afterEach((to, from, next) => {
  NProgress.done();

})





export default router
