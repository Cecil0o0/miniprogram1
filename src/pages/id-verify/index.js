import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.styl'

export default class IdVerify extends Component {

  config = {
    navigationBarTitleText: '实名认证'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-id-verify'>
        <Text>实名认证</Text>
      </View>
    )
  }
}

