import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'
import BgPng from '../../images/cash_bg.png'
import KefuPng from '../../images/cash_kefu.png'
import { formatCurrency, showToast } from '../../lib/utils'
import { USER_MODEL_INFO } from '../../lib/constants';

export default class Cash extends Component {
  config = {
    navigationBarTitleText: '提现'
  }

  state = {
    info: {
      cash: '999999'
    },
    wechat: "5598356"
  }

  componentDidMount() {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.setState({
      info
    })
  }

  copyWechat() {
    Taro.setClipboardData({
      data: this.state.wechat,
      success (res) {
        showToast('复制成功')
      }
    })
  }

  render() {
    return (
      <View className="page-cash">
        <View className="cash-wrapper">
          <Image src={BgPng} className="bg" />
          <View className="money">{formatCurrency(this.state.info.cash)}</View>
          <View className="helper-text">可提现额度(元)</View>
        </View>
        <View className="helper-text-wrapper">
          <Image src={KefuPng} />
          <View>提现需要联系客服人员，微信：</View>
          <View>{this.state.wechat}</View>
        </View>
        <View className="button" onClick={this.copyWechat}>复制客服微信</View>
      </View>
    )
  }
}
