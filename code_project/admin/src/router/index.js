import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import RoutesConfig from './config'
import store from '@/store/index.'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: "/",
      redirest: "/index"
    },
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox,
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('../views/home/Home.vue')
        }
      ]
    }

  ]
})

//动态添加嵌套路由

const ConfigRouter = () => {

  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox,
    })
  }

  RoutesConfig.forEach(item => {
    checkPermission(item) && router.addRoute("mainbox", item)


  })

  //isGetterRouter==true//放行不会进入死循环
  store.commit("changGetterRouter", true)

}
const checkPermission = (item) => {
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1
  }
  return true
}

//每次路由跳转之前会进入
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next()
  } else {
    //如果授权（已经登录过了） next（）
    //没有登录，重定向到login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      })
    } else {

      //因为路由还没创建
      //走一遍创建路由/isGetterRouter==true/放行不会进入死循环
      //第二遍有token直接进入
      if (!store.state.isGetterRouter) {
        //删除所有的嵌套路由
        //创建路由mainbox
        router.removeRoute("mainbox")
        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        next()
      }

    }
  }
})




export default router
