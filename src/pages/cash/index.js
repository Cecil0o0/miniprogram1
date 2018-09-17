import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'
import BgPng from '../../images/cash_bg.png'
import KefuPng from '../../images/cash_kefu.png'

export default class Cash extends Component {
  config = {
    navigationBarTitleText: '提现'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="page-cash">
        <View className="cash-wrapper">
          <Image src={BgPng} className="bg" />
          <View className="money">10,000</View>
          <View className="helper-text">可提现额度(元)</View>
        </View>
        <View className="helper-text-wrapper">
          <Image src={KefuPng} />
          <View>提现需要联系客服人员，微信：</View>
          <View>5598356</View>
        </View>
        <View className="button">复制客服微信</View>
      </View>
    )
  }
}
