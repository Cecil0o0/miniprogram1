import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import './index.styl'
import BgPng from '../../images/bind_mobile_bg.png'
import ClockPng from '../../images/bind_mobile_clock.png'
import MobilePng from '../../images/bind_mobile_mobile.png'

export default class BindMobile extends Component {
  config = {
    navigationBarTitleText: '绑定手机'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="page-bind-mobile">
        <View className="banner-back">
          <Image className="bg" src={BgPng} />
          <View className="inner">
            <Image src={ClockPng} />
            <View>待客服核实后，将为您绑定。</View>
          </View>
        </View>
        <View className="suspension">
          <Image src={MobilePng} />
          <Input placeholder="请输入手机号" placeholderStyle={{color: '#575757', lineHeight: '44px'}} />
        </View>
        <View className="btns-wrapper">
          <View className="button submit">提交</View>
          <View className="button cancel">取消</View>
        </View>
      </View>
    )
  }
}
