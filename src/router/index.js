import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 Storage 工具函数
// import storage from '../utils/storage.js'


Vue.use(VueRouter)


// 通过命名 chunk 把某个路由下的所有组件都打包在同个异步块 (chunk) 中
// /* webpackChunkName: "group-foo" */

const routes = [

  {
    path: '/',
    redirect: "/login",
    meta: {
      title: '登录'
    }

  },
  {
    path: '/login',
    name: "login",
    meta: {
      title: '登录'
    },
    component: () =>
      import('../views/login')
  },
  {
    path: '/dasbord',
    name: 'dasbord',
    meta: {
      title: '主页',
    },
    component: () =>
      import('../views/dasbord/left'),
    children: [
      {
        path: '',
        name: 'index',
        component: () =>
          import('../views/dasbord/index'),
      },
      {
        path: 'system',
        name: 'index',
        component: () =>
          import('../views/system'),
      },
      {
        path: 'studentInfo',
        name: 'index',
        component: () =>
          import('../views/studentInfo'),
      },

      //职业信息职位管理
      {
        path: 'positionInfo',
        name: 'index',
        component: () =>
          import('../views/positionInfo'),
      },
      {
        path: 'companySort',
        name: 'index',
        component: () =>
          import('../views/companySort'),
      },
      {
        path: 'studentResume',
        name: 'index',
        component: () =>
          import('../views/studentResume'),
      },
      {
        path: 'studentResume',
        name: 'index',
        component: () =>
          import('../views/studentResume'),
      },

      //就业资料管理路由
      {
        path: 'employmentInfo',
        name: 'index',
        component: () =>
          import('../views/employmentInfo'),
      },
      //就业管理
      {
        path: 'employmentInfoJManagerment',
        name: 'index',
        component: () =>
          import('../views/employmentInfoJManagerment'),
      },
      //咨询管理
      {
        path: 'consultingManagement',
        name: 'index',
        component: () =>
          import('../views/consultingManagement'),
      },


    ]
  },


]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 路由对象，添加全局前置导航守卫
// router.beforeEach((to, from, next) => {
//   // 设置页面的 title
//   document.title = to.meta.title ? `太理自考 · ${to.meta.title}` : '太理自考'
//   // 从 Storage 中获取到保存的 token 值
//   const tokenStr = Storage.getItem('TOKEN')
//   // 如果用户访问的是登录页，直接放行
//   if ((to.path === '/login' && !tokenStr) || to.path === '/agreement' || to.path === '/policy') {
//     return next()
//   }
//   // 如果没有 token，强制跳转到登录页
//   if (!tokenStr) {
//     return next('/login')
//   }
//   // 已经登录再次访问登录页面跳转到首页
//   if (to.path === '/login' && tokenStr) {
//     return next('/home')
//   }

//   // if (from.name === 'questionBankExam' && !to.params.pass) {
//   //   bus.$emit('exitExam', to)
//   //   return
//   // }
//   next()
// })

router.afterEach(() => { })

export default router
