import Taro, { Component } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
import './index.styl'
import { USER_MODEL_INFO } from '../../lib/constants'
import { api_info, api_info_edit } from '../../api'
import { delayToExec, getUploadResAbsAddress, promisifyUpload } from '../../lib/utils'

export default class InfoVideoEdit extends Component {

  config = {
    navigationBarTitleText: '视频编辑'
  }

  state = {
    src: '',
    info: {},
    changed: false
  }

  componentDidShow () {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.state.info = info
    if (info.video) {
      this.setState({
        src: info.video
      })
    }
  }

  upload () {
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success: res => {
        this.setState({
          src: res.tempFilePath,
          changed: true
        })
      }
    })
  }

  confirm () {
    const fn = () => {
      api_info_edit({
        id: this.state.info.id,
        video: this.state.src
      }).then(res => {
        if (res.success) {
          Taro.showToast({
            title: '上传成功',
            duration: 1000,
            mask: true
          })
          delayToExec(() => {
            const info = Taro.getStorageSync(USER_MODEL_INFO)
            Taro.setStorageSync(USER_MODEL_INFO, Object.assign(info, { video: this.state.src}))
            Taro.navigateBack()
          }, 1000)
        }
      })
    }
    if (this.state.changed) {
      promisifyUpload(this.state.src).then(fn)
    } else {
      fn()
    }
  }

  render () {
    return (
      <View className='video-edit'>
        <Video src={this.state.src}></Video>
        <View className="upload-btn" onClick={this.upload}>重新选择视频</View>
        <View className="confirm-btn" onClick={this.confirm}>确定</View>
      </View>
    )
  }
}

