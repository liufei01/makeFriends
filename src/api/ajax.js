import axios from 'axios'

export default function ajax (url, data = {}, types = 'GET') {
  if (types === 'GET') {
    // 原始数据是：{username：Tom，password：123}
    // 格式化的数据：username=Tom&password=123
    if (Object.keys(data).length === 0) {
      return axios.get(url)
    } else {
      let paramStr = ''
      Object.key(data).forEach(key => {
        paramStr += key + '=' + data[key] + '&'
      })
      if (paramStr != '') {
        paramStr = paramStr.substring(0, paramStr.lastIndexOf('&'))
        url = url + '?' + paramStr
      }
      return axios.get(url)
    }
  } else {
    return axios.post(url, data)
  }
}
