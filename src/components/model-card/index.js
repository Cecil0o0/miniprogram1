import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.styl'

export default class ModelCard extends Component {
  handleClick(e) {
    this.props.onClick(e)
  }
  render() {
    const { num, imgSrc, name, weight, height, text, icon } = this.props.model || {}
    return (
      <View className="model-card" onClick={this.handleClick}>
        <View className="popularity">
          <Image src={icon} />
          <Text>{text}：</Text>
          <Text>{num}</Text>
        </View>
        <View className="img">
          <Image src={imgSrc || ''} />
        </View>
        <View className="info">
          <Text>{name}</Text>
          <Text>
            {height}
            cm
          </Text>
          <Text>
            {weight}
            kg
          </Text>
        </View>
      </View>
    )
  }
}
