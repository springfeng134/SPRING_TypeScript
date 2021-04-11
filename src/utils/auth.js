import Cookies from 'js-cookie'

const key = 'yilu-archives'

export function getToken() {
  return Cookies.get(key)
}

export function setToken(token) {
  sessionStorage['token'] = token
  return Cookies.set(key, token)
}

export function removeToken() {
  sessionStorage.removeItem('token')
  return Cookies.remove(key)
}
