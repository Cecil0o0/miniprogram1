import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.styl'
import SubscribePng from '../../images/subscribe_ticket.png'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '赞助我们'
  }

  state = {
    tickets: [
      {
        type: 1,
        price: 1,
        months: 1,
        intros: ['日升1点赞助值', '可使用模特卡，打气加5次']
      },
      {
        type: 2,
        price: 30,
        months: 1,
        intros: ['日升1点赞助值', '可使用模特卡，打气加5次']
      },
      {
        type: 3,
        price: 150,
        months: 6,
        intros: ['日升1点赞助值', '可互相聊天使用模特卡打气五次并送一条10图形象照和自我介绍拍摄']
      }
    ]
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="subscribe">
        {this.state.tickets.map((item, key) => {
          return (
            <View key={key} className="ticket" style={{backgroundImage: `url("${SubscribePng}")`}}>
              <View className="left">
                <Text>{item.price}</Text>
                {item.months > 1 ? (
                  <Text>
                    元/
                    {item.months}
                    个月
                  </Text>
                ) : (
                  <Text>元/月</Text>
                )}
              </View>
              <View className="divider" />
              <View className="intros">
                {item.intros.map((intro, index) => {
                  return <View key={index}>{intro}</View>
                })}
              </View>
              <View className="right">立即开通</View>
            </View>
          )
        })}
      </View>
    )
  }
}
