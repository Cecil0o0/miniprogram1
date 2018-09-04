import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import cn from 'classnames'
import Loadmore from '../../components/loadmore'
import SelfInfo from '../../components/self-info'
import './index.styl'
import HeartPng from '../../images/个人中心_03.png'
import MoneyBagPng from '../../images/个人中心_05.png'
import PlusPng from '../../images/个人资料_16.png'
import EmailPng from '../../images/个人资料_18.png'
import FemalePng from '../../images/个人资料_03.png'
import MalePng from '../../images/个人资料_05.png'
import IdVerify2Png from '../../images/个人资料_08.png'

export default class Resume extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipers: [
        {
          src: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
          jump: {
            type: 'web',
            url: ''
          }
        },
        {
          src: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
          jump: {
            type: 'web',
            url: ''
          }
        },
        {
          src: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
          jump: {
            type: 'web',
            url: ''
          }
        }
      ],
      currTab: 1,
      photos: [
        {
          src: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg'
        },
        {
          src: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg'
        },
        {
          src: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg'
        },
        {
          src: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg'
        }
      ],
      info: {
        id: 0,
        poster:
          'https://www.10wallpaper.com/wallpaper/1366x768/1609/kenza_mel_beach_photography-Beauty_poster_wallpaper_1366x768.jpg',
        avatar: 'https://wx4.sinaimg.cn/orj360/96a79eebgy1fpo3ig1w9qj20c80c83zr.jpg',
        name: '某某某',
        age: 20,
        height: 168,
        weight: 45,
        idVerify: true,
        sex: 0,
        popularity: 1258,
        subscribe: 225874,
        intro:
          '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！',
        bwh: [45, 48, 52],
        city: '北京市',
        school: '北京电影学院',
        exp: '三年平面模特',
        specialities: ['唱歌', '跳舞', '书法']
      }
    }
  }

  handleTabClick(index) {
    this.setState({
      currTab: index
    })
  }

  config = {
    navigationBarTitleText: '个人简历'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { info, currTab } = this.state
    return (
      <View className="resume">
        <Swiper
          className="swiper"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots={false}
          autoplay
        >
          {this.state.swipers.map((item, key) => {
            return (
              <SwiperItem key={key}>
                <View style={{ backgroundImage: `url("${item.src}")` }} />
              </SwiperItem>
            )
          })}
        </Swiper>
        <View className="parallax-card">
          <View
            className="avatar"
            style={{ backgroundImage: `url("${this.state.swipers[0].src}")` }}
          />
          <View className="info1">
            <View className="first">
              <View className="name">{info.name}</View>
              <Image className="sex" src={FemalePng} />
              <View className="id-wrapper">
                <Image src={IdVerify2Png} className="id-verify-icon" />
                <Text className="verify-text">实名认证</Text>
              </View>
            </View>
            <View className="second">
              <View className="btn-group">
                <View className="btn">
                  <Image src={PlusPng} className="add icon" />
                  <Text>关注</Text>
                </View>
                <View className="divider-vertical" />
                <View className="btn">
                  <Image src={EmailPng} className="email icon" />
                  <Text>私信</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="divider-horizontal" />
          <View className="info2">
            <View className="popularity">
              <Image src={HeartPng} className="heart icon" />
              <View>
                人气值：
                {info.popularity}
              </View>
            </View>
            <View className="divider-vertical" />
            <View className="subscribe">
              <Image src={MoneyBagPng} className="money-bag icon" />
              <View>
                赞助值：
                {info.subscribe}
              </View>
            </View>
          </View>
          <View className="info3">{info.intro}</View>
          <View className="tabs">
            <View
              className={cn({
                active: currTab === 1
              })}
              onClick={this.handleTabClick.bind(this, 1)}
            >
              <Text>个人简介</Text>
            </View>
            <View
              className={cn({
                active: currTab === 2
              })}
              onClick={this.handleTabClick.bind(this, 2)}
            >
              <Text>相册</Text>
            </View>
          </View>
        </View>
        {currTab === 1 ? (
          <SelfInfo info={info} />
        ) : (
          <View className="container">
            <View className="photos-wrapper">
              {this.state.photos.map((item, key) => {
                return (
                  <View
                    key={key}
                    className="photo"
                    style={{ backgroundImage: `url("${item.src}")` }}
                  />
                )
              })}
            </View>
            <Loadmore />
          </View>
        )}
      </View>
    )
  }
}
