export default function getBaseUrl () {
  let [baseUrl, urls, protocol] = ['https://mdev.1peso.com.mx', location.href.toLowerCase(), 'http://']
  // 判断协议
  if (location.protocol === 'https:') {
    protocol = 'https://'
  }
  if (urls.match(/m.1peso.com.mx/) && urls.match(/m.1peso.com.mx/)[0] === 'm.1peso.com.mx') {
    baseUrl = protocol + 'm.1peso.com.mx'
  }
  // 开发环境判断
  return baseUrl
}
