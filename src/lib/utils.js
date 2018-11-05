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

export const showToast = function(title) {
  Taro.showToast({
    title,
    mask: true,
    duration: 1500
  })
}