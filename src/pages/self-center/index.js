import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.styl'
import { api_info } from '../../api'
import { USER_MODEL_INFO } from '../../lib/constants'
import AttentionPng from '../../images/attention.png'
import BasicInfoPng from '../../images/basic_info.png'
import PosterPng from '../../images/upload.png'
import PicturesPng from '../../images/photo.png'
import VideoPng from '../../images/video.png'
import ExpPng from '../../images/yanyi.png'
import SubscribePng from '../../images/money_ticket.png'
import CardMadePng from '../../images/model_card.png'
import IdVerifyPng from '../../images/id_verify.png'
import AdvicePng from '../../images/tip.png'
import FemalePng from '../../images/female.png'
import MalePng from '../../images/male.png'
import IdVerify2Png from '../../images/verify_icon.png'
import HeartPng from '../../images/heart.png'
import MoneyBagPng from '../../images/money_bag.png'
import MobilePng from '../../images/self_center_mobile.png'
import TicketPng from '../../images/self_center_ticket.png'
import MobileWhitePng from '../../images/self_center_mobile_white.png'
import VerifyWhitePng from '../../images/self_center_verify_white.png'


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
      src: AttentionPng,
      url: '/pages/attention/index',
      label: '关注的人'
    },
    {
      src: BasicInfoPng,
      url: '/pages/info-basic-edit/index',
      label: '基本资料'
    },
    {
      src: PosterPng,
      url: '/pages/info-photo-edit/index',
      label: '上传海报'
    },
    {
      src: PicturesPng,
      url: '/pages/info-photo-edit/index',
      label: '上传相册'
    },
    {
      src: VideoPng,
      url: '/pages/info-video-edit/index',
      label: '个人视频'
    },
    {
      src: ExpPng,
      url: '/pages/info-exp-edit/index',
      label: '演艺经历'
    },
    {
      src: SubscribePng,
      url: '/pages/subscribe/index',
      label: '赞助我们'
    },
    {
      src: CardMadePng,
      url: '/pages/card-edit-1/index',
      label: '模卡制作'
    },
    {
      src: IdVerifyPng,
      url: '/pages/id-verify/index',
      label: '实名认证'
    },
    {
      src: MobilePng,
      url: '/pages/bind-mobile/index',
      label: '绑定手机'
    },
    {
      src: TicketPng,
      url: '/pages/cash/index',
      label: '提现'
    },
    {
      src: AdvicePng,
      url: '/pages/advice/index',
      label: '投诉建议'
    }
  ]

  componentWillMount() {}

  componentDidMount() {
    api_info('0a3305ff-a32c-4f69-86c4-fbdb18208ec3').then(res => {
      if (res.success) {
        this.setState({
          info: res.data
        })
        Taro.setStorageSync(USER_MODEL_INFO, res.data)
      }
    })
  }

  componentWillUnmount() {}

  componentDidShow() {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    if (info) {
      this.setState({ info })
    }
  }

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
    const { poster, avatar, name, popularity, subscribe, intro, sex } = this.state.info
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
            { sex === 1 ? <Image className="sex" src={MalePng} /> : <Image className="sex" src={FemalePng} /> }
          </View>
          <View className="btn-group">
            <View className="btn">
              <Image src={VerifyWhitePng} className="icon" />
              <Text>实名认证</Text>
            </View>
            <View className="divider-vertical" />
            <View className="btn">
              <Image src={MobileWhitePng} className="icon" />
              <Text>138****6688</Text>
            </View>
          </View>
          <View className="second">
            <View className="popularity">
              <Image className="heart" src={HeartPng} />
              <Text>
                人气值：
                {popularity}
              </Text>
            </View>
            <View className="divider" />
            <View className="sponsor-value">
              <Image className="money-bag" src={MoneyBagPng} />
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
