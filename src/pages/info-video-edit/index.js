import Taro, { Component } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
import './index.styl'
import { USER_MODEL_INFO } from '../../lib/constants'
import { api_info_edit } from '../../api'
import { delayToExec, promisifyUpload, showToast } from '../../lib/utils'

export default class InfoVideoEdit extends Component {

  config = {
    navigationBarTitleText: '视频编辑'
  }

  state = {
    src: '',
    info: {},
    changed: false
  }

  videoCtx = null

  componentDidShow () {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.state.info = info
    if (info.video) {
      this.setState({
        src: info.video
      })
      this.videoCtx = Taro.createVideoContext('video')
      this.videoCtx.play()
    }
  }

  select () {
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      compressed: true,
      success: res => {
        console.log(res)
        this.setState({
          src: null
        }, () => {
          this.setState({
            src: res.data,
            changed: true
          }, () => {
            this.videoCtx.play()
          })
        })
      }
    })
  }

  confirm () {
    const fn = () => {
      promisifyUpload(this.state.src).then(res => {
        api_info_edit({
          id: this.state.info.id,
          video: res.data
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
      })
    }
    if (this.state.changed) {
      fn()
    } else {
      showToast('请先选择视频', 'none')
    }
  }

  render () {
    const { src } = this.state
    return (
      <View className='video-edit'>
        {src ? <Video id="video" src={src}></Video> : <Video src={null}></Video>}
        <View className="upload-btn" onClick={this.select}>重新选择视频</View>
        <View className="confirm-btn" onClick={this.confirm}>确定</View>
      </View>
    )
  }
}

