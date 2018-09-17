import Taro, { Component } from '@tarojs/taro'
import { View, Textarea, Input } from '@tarojs/components'
import './index.styl'

export default class Advice extends Component {
  config = {
    navigationBarTitleText: '投诉建议'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="page-advice">
        <View className="textarea-wrapper">
          <Textarea placeholder="请输入您的意见或建议" placeholder-style="color: #BABABA" />
        </View>
        <View className="divider-horizontal" />
        <View className="input-wrapper">
          <Input placeholder="请输入您的qq、微信、邮箱等联系方式，方便我们与您联系" placeholder-style="color: #CBCBCB" />
        </View>
        <View className="btns-wrapper">
          <View className="button submit">提交</View>
          <View className="button cancel">取消</View>
        </View>
      </View>
    )
  }
}
