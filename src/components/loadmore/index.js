import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.styl'

export default class Loadmore extends Component {
  render() {
    return (
      <View className="loadmore">
        <Text>加载更多...</Text>
      </View>
    )
  }
}
