import axios from 'axios'
import { mapState } from 'vuex'
import { MessageBox } from 'element-ui'

import store from '@/store'
import router from '@/router'

import { getToken, removeToken } from './auth'

axios.defaults.timeout = 60000

// 请求拦截器
axios.interceptors.request.use(config => {
  let token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response
}, error => {
  console.error(error)

  const { code, response } = error

  if (code === 'ECONNABORTED') {
    return Promise.reject(error)
  } else if (response) {
    const status = response.status
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
          router.replace({ name: 'login' })
        })
      }
    } else {
      showWarningModal(httpStatus.message)
      return Promise.reject(error)
    }
  } else {
    showWarningModal('连接到服务器失败')
    return Promise.reject(error)
  }
})

/**
 * http请求
 * @param {String} url  请求地址
 * @param {Object} data 提交参数
 * @param {String} method 请求方式 默认值post
 * @param {Boolean}  noErrorDialog 接收到后台返回false是否不弹出错误提示 默认值为false
 */
export function http({
  url,
  data = {},
  method = 'post',
  noErrorDialog = false,
  isReject = true
}) {
  let httpParms

  return new Promise(function (resolve, reject) {
    url = toUrl(url);

    httpParms = {
      method,
      url,
    }

    if (method.toLowerCase() === 'post') {
      httpParms.data = data
    }

    axios(httpParms).then((res) => {
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
        if (isReject) {
          reject(new Error(data.msg))
        } else {
          resolve(data)
        }
      }
    }, (res) => {
      showWarningModal('网络异常,请稍后再试!')
      reject(new Error())
    })
  })
}

export function redirectToLogin(url) {
  const loginUrl = url || mapState(['config']).loginUrl
  if (!loginUrl) {
    console.log('请定义登录地址 loginUrl')
    return
  }
  window.sessionStorage.clear();
  router.replace({
    path: url,
    // query: { redirect: router.currentRoute.path },
  })
}

export function toUrl(url) {
  if (!url) {
    console.log('url未定义')
    return ''
  }
  if (!url.includes('http')) {
    const baseUrl = process.env.VUE_APP_BASE_API || ''
    return baseUrl + url
  }
  return url
}

/**
 * 错误弹窗
 * @param {String} content 错误内容
 * @param {String} title 标题
 */
export function showWarningModal(content, title = '警告') {
  return new Promise((resolve) => {
    MessageBox.alert(content, title, {
      comfirmButtonText: '确定',
      confirmButtonClass: 'el-button--danger',
      lockScroll: true,
      type: 'error',
      dangerouslyUseHTMLString: true
    }).then(() => {
      resolve()
    })
  })
}

export function getIEVersion() {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1

  if (isIE) {
    var regIE = new RegExp('MSIE (\\d+\\.\\d+);')
    regIE.test(userAgent);

    var fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion === 7) {
      return 7;
    } else if (fIEVersion === 8) {
      return 8;
    } else if (fIEVersion === 9) {
      return 9;
    } else if (fIEVersion === 10) {
      return 10;
    } else {
      return 6 // IE版本<=7
    }
  } else if (isIE11) {
    return 11 // IE11
  } else if (isEdge) {
    return 'edge' // edge
  } else {
    return -1 // 不是ie浏览器
  }
}

/**
 * 防抖
 * @param {Function} method 方法
 * @param {Number} delay 延时
 */
export function debonce(method, delay) {
  let timer = null
  return function () {
    let self = this
    let args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      method.apply(self, args)
    }, delay)
  }
}

export function globalConfirm(message) {
  return MessageBox.confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    cancelButtonClass: 'cancel',
    type: 'warning'
  })
}

/**
 * 导出请求
 * @param {String} url  请求地址
 * @param {Object} data 提交参数
 * @param {String} method 请求方式 默认值post
 * @param {Boolean}  noErrorDialog 接收到后台返回false是否不弹出错误提示 默认值为false
 */
export function download({
  url,
  data = {},
  method = 'post',
  noErrorDialog = false,
  responseType = 'blob'
}) {
  let httpParms

  return new Promise(function (resolve, reject) {
    url = toUrl(url);

    httpParms = {
      method,
      url,
      responseType
    }

    if (method.toLowerCase() === 'post') {
      httpParms.data = data
    }

    axios(httpParms).then((res) => {
      downloadBlob(res)
    }).catch(er => {
      // console.log(er)
      // debugger
      // this.$message.error('需要下载的文件不存在')
      showWarningModal('需要下载的文件不存在!')
    })
  })
}

function downloadBlob(response) {
  const { data, headers } = response
  const filename = decodeURIComponent(
    headers['content-disposition'].split('=')[1]
  )
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
    // this.isDisable = false
    // this.btnName = this.operationType
    // this.close()
    // 清除Blob缓存
    // bus.$emit('miniAudioDownloadDialog', false)
    URL.revokeObjectURL(url)
  }
}

export default {
  http
}
