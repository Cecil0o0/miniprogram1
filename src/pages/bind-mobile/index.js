import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import update from 'immutability-helper'
import './index.styl'
import BgPng from '../../images/bind_mobile_bg.png'
import ClockPng from '../../images/bind_mobile_clock.png'
import MobilePng from '../../images/bind_mobile_mobile.png'
import { USER_MODEL_INFO } from '../../lib/constants'
import { showToast, delayToExec } from '../../lib/utils'
import { api_info_edit } from '../../api'

export default class BindMobile extends Component {
  config = {
    navigationBarTitleText: '绑定手机'
  }

  state = {
    info: {
      bindMobile: {
        number: ''
      }
    },
    disabled: false
  }

  componentDidMount() {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.setState({
      info
    })
    if (info.bindMobile.isPass === undefined && info.bindMobile.number) {
      this.setState({
        disabled: true
      })
    }
  }

  handleChange(e) {
    this.setState({
      info: update(this.state.info, {
        bindMobile: {
          number: {
            $set: e.target.value
          }
        }
      })
    })
  }

  submit() {
    if (this.state.disabled) {
      showToast('请耐心等待审核结果', 'none')
      delayToExec(() => Taro.navigateBack())
      return
    }
    const { id, bindMobile } = this.state.info
    api_info_edit({
      id,
      bindMobile
    }).then(res => {
      if (res.success) {
        showToast('保存成功')
        delayToExec(() => Taro.navigateBack())
        Taro.setStorageSync(USER_MODEL_INFO, this.state.info)
      }
    })
  }

  cancel() {
    Taro.navigateBack()
  }

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
          <Input placeholder="请输入手机号" placeholderStyle={{color: '#575757', lineHeight: '44px'}} onInput={this.handleChange} value={this.state.info.bindMobile.number} disabled={this.state.disabled} />
        </View>
        <View className="btns-wrapper">
          <View className="button submit" onClick={this.submit}>提交</View>
          <View className="button cancel" onClick={this.cancel}>取消</View>
        </View>
      </View>
    )
  }
}
