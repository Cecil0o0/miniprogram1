import Taro, { Component } from '@tarojs/taro'
import { View, Icon, Text } from '@tarojs/components'
import './index.styl'

export default class ModelCard extends Component {
  handleClick(e) {
    this.props.onClick(e)
  }
  render() {
    const { popularity, imgSrc, name, weight, height } = this.props.model || {}
    return (
      <View className="model-card" onClick={this.handleClick}>
        <View className="popularity">
          <Icon size="12" type="info" />
          <Text>人气值：</Text>
          <Text>{popularity}</Text>
        </View>
        <View className="img" style={{ backgroundImage: `url(${imgSrc})` }} />
        <View className="info">
          <Text>{name}</Text>
          <Text>{height}cm</Text>
          <Text>{weight}kg</Text>
        </View>
      </View>
    )
  }
}
