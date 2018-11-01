import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'
import HeartPng from '../../images/heart.png'
import MoneyBagPng from '../../images/money_bag.png'
import { USER_MODEL_INFO } from '../../lib/constants'

export default class Attention extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      list: [
        {
          id: 0,
          avatar: 'https://wx4.sinaimg.cn/orj360/96a79eebgy1fpo3ig1w9qj20c80c83zr.jpg',
          name: '某某某',
          popularity: 1258,
          subscribe: 225874,
          intro: '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！'
        },
        {
          id: 0,
          avatar: 'https://wx4.sinaimg.cn/orj360/96a79eebgy1fpo3ig1w9qj20c80c83zr.jpg',
          name: '某某某',
          popularity: 1258,
          subscribe: 225874,
          intro: '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！'
        },
        {
          id: 0,
          avatar: 'https://wx4.sinaimg.cn/orj360/96a79eebgy1fpo3ig1w9qj20c80c83zr.jpg',
          name: '某某某',
          popularity: 1258,
          subscribe: 225874,
          intro: '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！'
        }
      ]
    }
  }

  config = {
    navigationBarTitleText: '关注的人'
  }

  componentWillMount() {}

  componentDidMount = () => {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.setState({
      list: info.attentions || []
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="page-attention">
        {this.state.list.map((item, key) => {
          return (
            <View key={key} className="item-wrapper">
              <View className="cancel-btn">取消关注</View>
              <View className="avatar-wrapper">
                <Image src="" />
              </View>
              <View className="info-wrapper">
                <View className="name">{item.name}</View>
                <View className="middle">
                  <Image src={HeartPng} className="heart" />
                  <View>
                    人气值：
                    {item.popularity}
                  </View>
                  <Image src={MoneyBagPng} className="moneybag" />
                  <View>
                    赞助值：
                    {item.subscribe}
                  </View>
                </View>
                <View className="intro ellipsis">{item.intro}</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
