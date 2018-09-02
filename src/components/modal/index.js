import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'

export default class Modal extends Component {
  InnerClick(e) {
    e.stopPropagation()
  }
  render() {
    return (
      <View className="qf-modal">
        <View onClick={this.InnerClick}>{this.props.children}</View>
      </View>
    )
  }
}
