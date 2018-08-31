import Taro from '@tarojs/taro'

export default function ({ url, data, method = 'GET', dataType = 'json' }) {
  return Taro.request({
    url,
    data,
    method,
    dataType,
    header: {
      'content-type': 'application/json'
    }
  })
}
