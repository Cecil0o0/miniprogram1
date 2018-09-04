import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'
import FormItem from '../../components/form-item'

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

  handleClick(name) {
    console.log(name)
  }

  render() {
    const { info } = this.state
    return (
      <View className="page-id-verify">
        <View>
          <FormItem name="name" label="真实姓名" value={info.name} onClick={this.handleClick} />
          <FormItem name="mobile" label="手机号码" value={info.mobile} onClick={this.handleClick} />
          <FormItem
            name="idNumber"
            label="身份证号"
            value={info.idNumber}
            onClick={this.handleClick}
          />
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
