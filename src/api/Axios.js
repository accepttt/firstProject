import Vue from 'vue'
import Axios from 'axios'
import Storage from '@utils/storage.js'
import VueRouter from '../router'
import { Message } from 'element-ui'

const router = VueRouter

// 创建 axios 实例
const service = Axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间
  timeout: 10000
})

// 获取 token
const userToken = conf => {
  const token = Storage.get("token")
  // conf.headers.Authorization = 'Basic YWVwX3VpOmFlcF91aV9zZWNyZXQ='
  // conf.headers.tenant = 'OTk5OQ=='
  if (token!="") {
    conf.headers.sysToken = token ? token : ''
  }
  return conf
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    return userToken(config)
  },
  error => {
    return Promise.reject(error)
  }
)

// // 响应拦截器
// service.interceptors.response.use(
//   response => {
//     switch (response.data.code) {
//       case -2:
//         Message.warning({
//           message: response.data.msg
//         })
//         break
//       default:
//         break
//     }
//     return response.data
//   },
//   error => {
//     if (error.response.data) {
//       switch (error.response.data.code) {
//         case 40001:
//         case 40002:
//         case 40005:
//           Message.warning({
//             message: error.response.data.msg
//           })
//           Storage.clear()
//           router.push('/login')
//           break
//         default:
//           break
//       }
//     }
//     return Promise.reject(error)
//   }
// )

// 将 axios 挂载到 Vue 原型对象上
Vue.prototype.$http = service

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export default{
  get,
  post
}

