import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { MessageBox } from 'element-ui'
import { getToken, removeToken } from './auth'

let instance = axios.create({
  method: 'POST',
  baseURL: process.env.VUE_APP_BASE_API,
  responseType: 'blob',
  timeout: 60000
})

instance.interceptors.request.use(config => {
  if (!config.url) MessageBoxAlert('未设置接口地址')
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  config.method = 'POST'

  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  const { data, headers } = response

  // 读取blob
  let fr = new FileReader()
  fr.onload = function (event) {
    // 若读取结果为json，代表发生异常
    if (isJson(event.target.result)) {
      const json = JSON.parse(event.target.result)
      return MessageBoxAlert(json.msg)
    } else {
      const filename = decodeURIComponent(headers['content-disposition'].split('=')[1])
      const blob = new Blob([data])

      // msSaveBlob是IE独有的方法
      if (navigator.msSaveBlob) {
        try {
          navigator.msSaveBlob(blob, filename)
        } catch (blobError) {
          console.log(blobError)
        }
      } else {
        let url = URL.createObjectURL(blob)
        let link = document.createElement('a')

        document.body.append(link)
        link.href = url
        link.download = filename
        link.target = 'blank'
        link.click()
        link.parentNode.removeChild(link)

        // 清除Blob缓存
        URL.revokeObjectURL(url)
      }
    }
  }

  fr.readAsText(data)

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
        removeToken()
        sessionStorage.clear()
        MessageBoxAlert(httpStatus.message).then(() => {
          router.replace({ name: 'login' })
        })
      }
    } else {
      MessageBoxAlert(httpStatus.message)
    }
  }
})

function MessageBoxAlert(content, title = '警告') {
  return MessageBox.alert(content, title, {
    comfirmButtonText: '确定',
    confirmButtonClass: 'el-button--danger',
    lockScroll: true,
    type: 'error'
  })
}

function isJson(obj) {
  try {
    if (typeof JSON.parse(obj) === 'object') {
      return true
    }
  } catch { }

  return false
}

export { instance as download }
