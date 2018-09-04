import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'

export default class Advice extends Component {

  config = {
    navigationBarTitleText: '投诉建议'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-advice'>
        投诉建议
      </View>
    )
  }
}
