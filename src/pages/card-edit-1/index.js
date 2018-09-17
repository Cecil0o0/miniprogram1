import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'
import CaretRightPng from '../../images/caret_right.png'

export default class CardEdit1 extends Component {

  config = {
    navigationBarTitleText: '模卡信息填写'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onClickFormItem(index) {
    Taro.navigateTo({
      url: `/pages/card-edit-2-${index}/index`
    })
  }

  render () {
    return (
      <View className='page-card-edit-1'>
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 1)}>
          <View className="form-item-label">模卡一</View>
          <View className="form-item-info"></View>
          <View className="form-item-suffix"><Image src={CaretRightPng} /></View>
        </View>
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 2)}>
          <View className="form-item-label">模卡二</View>
          <View className="form-item-info"></View>
          <View className="form-item-suffix"><Image src={CaretRightPng} /></View>
        </View>
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 3)}>
          <View className="form-item-label">模卡三</View>
          <View className="form-item-info"></View>
          <View className="form-item-suffix"><Image src={CaretRightPng} /></View>
        </View>
      </View>
    )
  }
}

