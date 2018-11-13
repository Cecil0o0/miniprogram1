import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'
import HeartPng from '../../images/heart.png'
import MoneyBagPng from '../../images/money_bag.png'
import { USER_MODEL_INFO } from '../../lib/constants'
import { api_get_partical_models, api_user_remove_attention } from '../../api'

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

  componentWillMount() {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.info = info
    api_get_partical_models(info.attentions || []).then(res => {
      if (res.success) {
        this.setState({
          list: res.data
        })
      }
    })
  }

  removeAttention(id) {
    wx.showModal({
      title: '提示',
      content: '是否取消关注',
      success: res => {
        if (res.confirm) {
          api_user_remove_attention(id).then(res => {
            if(res.success) {
              Taro.showToast({
                title: '已取消关注',
                icon: 'none',
                mask: true,
                duration: 1000
              })
              let index = this.state.list.findIndex(item => item.id === id)
              this.state.list.splice(index, 1)
              this.setState({
                list: this.state.list
              })
              Taro.setStorageSync(USER_MODEL_INFO, Object.assign({}, this.info, {
                attentions: this.state.list.map(item => item.id)
              }))
            }
          })
        }
      }
    })
  }

  render() {
    return (
      <View className="page-attention">
        {this.state.list.map((item, key) => {
          return (
            <View key={key} className="item-wrapper">
              <View className="cancel-btn" onClick={this.removeAttention.bind(this, item.id)}>取消关注</View>
              <View className="avatar-wrapper">
                <Image src={item.avatar} />
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
