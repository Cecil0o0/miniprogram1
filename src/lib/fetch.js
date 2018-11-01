import Taro from '@tarojs/taro'

export default function({ url, data, method = 'GET', dataType = 'json' } = {}) {
  return Taro.request({
    url,
    data,
    method,
    dataType,
    header: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.data).then(res => {
    if (!res.success) {
      Taro.showToast({
        title: res.reason || '服务器错误',
        duration: 1500,
        mask: true,
        icon: 'none'
      })
    }
    return res
  })
}
