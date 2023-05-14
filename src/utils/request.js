import axios from 'axios'
import { getToken } from '@/utils/auth'

// 设置请求的基本 URL
axios.defaults.baseURL = "http://127.0.0.1:9091/"

// 设置请求的超时时间
axios.defaults.timeout = 10000

// 设置请求的默认 headers
axios.defaults.headers.common['x-token'] = 'Bearer ' + getToken();
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 设置响应的数据类型
axios.defaults.responseType = 'json'

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理，例如添加 token
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 在响应成功返回之前做一些处理
    return response
  },
  error => {
    // 在响应出错时做一些处理
    return Promise.reject(error)
  }
)

export default axios