import Taro, { Component } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
import './index.styl'

export default class InfoVideoEdit extends Component {

  config = {
    navigationBarTitleText: '视频编辑'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  upload () {
    console.log('upload')
  }

  confirm () {
    console.log('confirm')
  }

  render () {
    return (
      <View className='video-edit'>
        <Video></Video>
        <View className="upload-btn" onClick={this.upload}>重新上传视频</View>
        <View className="confirm-btn" onClick={this.confirm}>确定</View>
      </View>
    )
  }
}

