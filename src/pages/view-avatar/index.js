import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'

export default class ViewAvatar extends Component {
  config = {
    navigationBarTitleText: '更换头像'
  }

  state = {
    imgUrl: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  upload() {
    console.log('upload')
  }

  cancel() {
    console.log('cancel')
    Taro.navigateBack({ delta: 1 })
  }

  render() {
    const { imgUrl } = this.state
    return (
      <View className="view-avatar">
        <View style={{backgroundImage: `url("${imgUrl}")`}} className="img" />
        <View className="upload-btn" onClick={this.upload}>
          更换头像
        </View>
        <View className="confirm-btn" onClick={this.cancel}>
          取消
        </View>
      </View>
    )
  }
}
