import Taro, { Component } from '@tarojs/taro'
import { View, Textarea, Input } from '@tarojs/components'
import './index.styl'
import { USER_MODEL_INFO } from '../../lib/constants'
import { showToast, delayToExec } from '../../lib/utils'
import { api_advice_add } from '../../api'

export default class Advice extends Component {
  config = {
    navigationBarTitleText: '投诉建议'
  }

  state = {
    contact: '',
    content: ''
  }

  submit() {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    const { content, contact } = this.state
    api_advice_add({
      modelId: info.id,
      openId: 'test',
      content,
      contact
    }).then(res => {
      if (res.success) {
        showToast('提交成功')
        delayToExec(Taro.navigateBack)
      }
    })
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }

  cancel() {
    Taro.navigateBack()
  }

  render() {
    return (
      <View className="page-advice">
        <View className="textarea-wrapper">
          <Textarea placeholder="请输入您的意见或建议" placeholder-style="color: #BABABA" onInput={this.handleChange.bind(this, 'content')} />
        </View>
        <View className="divider-horizontal" />
        <View className="input-wrapper">
          <Input placeholder="请输入您的qq、微信、邮箱等联系方式，方便我们与您联系" placeholder-style="color: #CBCBCB" onInput={this.handleChange.bind(this, 'contact')}/>
        </View>
        <View className="btns-wrapper">
          <View className="button submit" onClick={this.submit}>提交</View>
          <View className="button cancel" onClick={this.cancel}>取消</View>
        </View>
      </View>
    )
  }
}
