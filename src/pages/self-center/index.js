import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.styl'

export default class SelfCenter extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  state = {
    info: {
      id: 0,
      poster:
        'https://www.10wallpaper.com/wallpaper/1366x768/1609/kenza_mel_beach_photography-Beauty_poster_wallpaper_1366x768.jpg',
      avatar: 'https://wx4.sinaimg.cn/orj360/96a79eebgy1fpo3ig1w9qj20c80c83zr.jpg',
      name: '某某某',
      idVerify: true,
      sex: 0,
      popularity: 1258,
      subscribe: 225874,
      intro:
        '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！'
    }
  }

  items = [
    {
      src: '',
      url: '',
      label: '关注的人'
    },
    {
      src: '',
      url: '/pages/info-basic-edit/index',
      label: '基本资料'
    },
    {
      src: '',
      url: '/pages/info-photo-edit/index',
      label: '上传海报'
    },
    {
      src: '',
      url: '/pages/info-photo-edit/index',
      label: '上传相册'
    },
    {
      src: '',
      url: '/pages/info-video-edit/index',
      label: '个人视频'
    },
    {
      src: '',
      url: '/pages/info-exp-edit/index',
      label: '演艺经历'
    },
    {
      src: '',
      url: '/pages/subscribe/index',
      label: '赞助我们'
    },
    {
      src: '',
      url: '/pages/card-edit-1/index',
      label: '模卡制作'
    },
    {
      src: '',
      url: '/pages/id-verify/index',
      label: '实名认证'
    },
    {
      src: '',
      url: '/pages/advice/index',
      label: '投诉建议'
    }
  ]

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  clickAvatar(e) {
    e.stopPropagation()
    Taro.navigateTo({
      url: '/pages/view-avatar/index'
    })
  }

  clickCover() {
    Taro.navigateTo({
      url: '/pages/view-cover/index'
    })
  }

  handlClick(item) {
    Taro.navigateTo({
      url: item.url
    })
  }

  render() {
    const { poster, avatar, name, popularity, subscribe, intro } = this.state.info
    return (
      <View className="self-center">
        <View
          className="header"
          style={{ backgroundImage: `url("${poster}")` }}
          onClick={this.clickCover}
        >
          <View
            className="avatar"
            style={{ backgroundImage: `url("${avatar}")` }}
            onClick={this.clickAvatar}
          />
          <View className="first">
            <Text>{name}</Text>
            <Image className="female" src="" />
            <View className="idVerify">
              <Image src="" /> 实名认证
            </View>
          </View>
          <View className="second">
            <View className="popularity">
              <Image className="heart" src="" />
              <Text>
                人气值：
                {popularity}
              </Text>
            </View>
            <View className="divider" />
            <View className="sponsor-value">
              <Image className="money-bag" src="" />
              <Text>
                赞助值：
                {subscribe}
              </Text>
            </View>
          </View>
          <View className="intro">{intro}</View>
        </View>
        <View className="body">
          {this.items.map((item, index) => {
            const { src, label } = item
            return (
              <View className="item" key={index} onClick={this.handlClick.bind(this, item)}>
                <Image src={src} />
                <Text>{label}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
