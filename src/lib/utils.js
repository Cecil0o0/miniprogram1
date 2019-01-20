import Taro from '@tarojs/taro'

export const delayToExec = function(fn, delay = 1500) {
  let timer = setTimeout(() => {
    fn.apply(this, Array.from(arguments))
    clearTimeout(timer)
  }, delay)
}

export const getUploadResAbsAddress = function(name) {
  return `${URL_PREFIX}/upload/${name}`
}

// 相当于oss的上传接口
export const promisifyUpload = function(filePath) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: URL_PREFIX + '/v1/upload/',
      filePath,
      name: 'file',
      success: resolve,
      fail: reject
    })
  })
}

export const uploadFiles = function(files = []) {
  return Promise.all(files.map(file => promisifyUpload(file)))
}

export const showToast = function(title, icon = 'success') {
  Taro.showToast({
    title,
    mask: true,
    duration: 1500,
    icon
  })
}

export const formatCurrency = function formatCurrency(str) {
  return `${str.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${str.slice(-2)}`
}

export const pick = function pick(obj, arr) {
  let o = {}
  arr.forEach(key => o[key] = obj[key])
  return o
}

export const debounce = function debounce(fn, delay = 50) {
  let timer = null
  let context = this
  return function() {
    let args = Array.from(arguments)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
      clearTimeout(timer)
    }, delay)
  }
}