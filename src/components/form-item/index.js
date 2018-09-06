import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import cn from 'classnames'
import CaretRightPng from '../../images/caret_right.png'

export default class FormItem extends Component {
  render() {
    const { name, label, value, className } = this.props
    const caretStyle = {
      backgroundImage: `url("${CaretRightPng}")`
    }
    return (
      <View className={cn('form-item', className)} onClick={this.props.onClick.bind(this, name)}>
        <View className="form-item-label">{label}</View>
        <View className="form-item-info">{value}</View>
        <View className="form-item-suffix" style={caretStyle} />
      </View>
    )
  }
}
