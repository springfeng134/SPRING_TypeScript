import axios from 'axios'

import store from '@/store'
import router from '@/router'

import { getToken, removeToken } from './auth'
import { toUrl, showWarningModal } from './index'

let uploadClient = axios.create()
uploadClient.defaults.timeout = 60000

// 请求拦截器
uploadClient.interceptors.request.use(config => {
  let token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器即异常处理
uploadClient.interceptors.response.use(response => {
  return response
}, error => {
  console.error(error)
  if (error && error.response) {
    const status = error.response.status
    let httpStatus = HTTP_STATUS_CODE[status]
    if (httpStatus === null || httpStatus === undefined) {
      httpStatus.message = '未知错误'
    }

    if (status === 401) {
      if (!store.state.application.tokenExpired) {
        store.dispatch('application/setTokenExpired', true)
        store.dispatch('user/setToken', '')
        sessionStorage.clear()
        removeToken()
        showWarningModal(httpStatus.message).then(() => {
          router.push({ name: 'login' })
        })
      }
    } else {
      showWarningModal(httpStatus.message)
    }
  } else {
    showWarningModal('连接到服务器失败')
  }
})

/**
 * http请求
 * @param {String} url  请求地址
 * @param {Object} data 提交参数
 * @param {String} method 请求方式 默认值post
 * @param {Boolean}  noErrorDialog 接收到后台返回false是否不弹出错误提示 默认值为false
 */
export function uploadfile({
  url,
  data = {},
  method = 'post',
  noErrorDialog = false
}) {
  let httpParms
  console.log(data);
  return new Promise(function (resolve, reject) {
    url = toUrl(url);

    httpParms = {
      method,
      url,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }

    if (method.toLowerCase() === 'post') {
      httpParms.data = data
    }

    uploadClient(httpParms).then((res) => {
      if (!res) return

      const data = res.data;
      if (data.success === true) {
        if (store.state.application.tokenExpired) {
          store.dispatch('application/setTokenExpired', false)
        }
        resolve(data)
      } else {
        // 默认弹出错误警告窗
        if (noErrorDialog === false && data.success === false) {
          showWarningModal(data.msg)
        } else {
          console.log(data.msg)
        }
        reject(new Error(data.msg))
      }
    }, (res) => {
      console.log(res);
      showWarningModal('网络异常,请稍后再试!')
    })
  })
}

export default {
  uploadfile
}
