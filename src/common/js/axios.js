import axios from 'axios'
import qs from 'qs'
import getUrl from './baseUrl'
// 配置axios的config
// let language = localStorage.getItem('ELEMENT_LANGUAGE') ? localStorage.getItem('ELEMENT_LANGUAGE') : 'mx'
let config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: getUrl(),
  withCredentials: true,
  headers: {
    // 设置
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    data = qs.stringify(data)
    return data
  }],
  data: {
    // 全局参数
    channelType: '1',
    channelTag: '1',
    language: language
  }
}
// 拦截请求
axios.interceptors.request.use((config) => {
  return config
}, error => {
  return Promise.reject(error)
})

const get = (url, params) => {
  url = urlEncode(url, params)
  return axios.get(url, config)
}

const post = (url, params, con) => {
  return axios.post(url, params, config)
}

// 用来拼接get请求的时候的参数
let urlEncode = (url, data) => {
  if (typeof (url) === 'undefined' || url === null || url === '') return ''
  if (typeof (data) === 'undefined' || data === null || typeof (data) !== 'object') return url
  url += (url.indexOf('?') !== -1) ? '' : '?'
  for (let k in data) {
    url += ((url.indexOf('=') !== -1) ? '&' : '') + k + '=' + encodeURI(data[k])
  }
  return url
}

export {
  get,
  post
}
