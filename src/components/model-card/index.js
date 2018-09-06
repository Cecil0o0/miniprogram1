import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.styl'
import HeartPng from '../../images/heart.png'
import MoneyBagPng from '../../images/money_bag.png'

export default class ModelCard extends Component {
  handleClick(e) {
    this.props.onClick(e)
  }
  render() {
    const { popularity, imgSrc, name, weight, height, type } = this.props.model || {}
    return (
      <View className="model-card" onClick={this.handleClick}>
        <View className="popularity">
          <Image src={type === 1 ? MoneyBagPng : HeartPng} />
          <Text>{type === 1 ? '赞助值' : '人气值'}：</Text>
          <Text>{popularity}</Text>
        </View>
        <View className="img">
          <Image src={imgSrc || 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'} />
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
