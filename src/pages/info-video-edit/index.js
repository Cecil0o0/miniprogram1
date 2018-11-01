import Taro, { Component } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
import './index.styl'
import { USER_MODEL_INFO } from '../../lib/constants'
import { api_info } from '../../api'
import { delayToExec } from '../../lib/utils'

export default class InfoVideoEdit extends Component {

  config = {
    navigationBarTitleText: '视频编辑'
  }

  state = {
    src: '',
    info: {}
  }

  componentDidShow () {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.state.info = info
    if (info.video && info.video.name) {
      this.setState({
        src: `${URL_PREFIX}/upload/${info.video.name}`
      })
    }
  }

  upload () {
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success: (res) => {
        this.setState({
          src: res.tempFilePath
        })
      }
    })
  }

  confirm () {
    wx.uploadFile({
      url: URL_PREFIX + '/v1/upload/' + this.state.info.id,
      filePath: this.state.src,
      name: 'file',
      success: () => {
        Taro.showToast({
          title: '上传成功',
          duration: 1000,
          mask: true
        })
        delayToExec(() => {
          api_info(this.state.info.id).then(res => {
            if (res.success) {
              Taro.setStorageSync(USER_MODEL_INFO, res.data)
              Taro.navigateBack()
            }
          })
        }, 1000)
      }
    })
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

