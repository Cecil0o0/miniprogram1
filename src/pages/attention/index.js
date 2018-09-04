import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'

export default class Attention extends Component {

  config = {
    navigationBarTitleText: '关注的人'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-attention'>
        关注的人
      </View>
    )
  }
}
