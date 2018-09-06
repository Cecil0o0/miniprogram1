import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'
import CaretRightPng from '../../images/caret_right.png'

export default class IdVerify extends Component {
  state = {
    info: {
      name: '某某某',
      mobile: '13333333333',
      idNumber: '258746985148756654',
      idCardPhotos: ['']
    }
  }

  config = {
    navigationBarTitleText: '实名认证'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onClickFormItem(name) {
    console.log(name)
  }

  render() {
    const { info } = this.state
    return (
      <View className="page-id-verify">
        <View>
          <View
            className='form-item'
            onClick={this.onClickFormItem.bind(this, 'name')}
          >
            <View className="form-item-label">真实姓名</View>
            <View className="form-item-info">{info.name}</View>
            <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
          </View>
          <View
            className='form-item'
            onClick={this.onClickFormItem.bind(this, 'mobile')}
          >
            <View className="form-item-label">手机号码</View>
            <View className="form-item-info">{info.mobile}</View>
            <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
          </View>
          <View
            className='form-item'
            onClick={this.onClickFormItem.bind(this, 'idNumber')}
          >
            <View className="form-item-label">身份证号</View>
            <View className="form-item-info">{info.idNumber}</View>
            <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
          </View>
        </View>
        <View className="uploader-wrapper">
          <View className="label">上传身份证</View>
          <View className="uploader" />
        </View>
        <View className="button">提交认证</View>
      </View>
    )
  }
}
