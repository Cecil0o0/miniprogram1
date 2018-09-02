import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Modal extends Component {
  constructor(props) {
    super(props)
  }
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
