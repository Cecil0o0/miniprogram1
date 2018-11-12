import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text, Button } from '@tarojs/components'
import cn from 'classnames'
import SelfInfo from '../../components/self-info'
import './index.styl'
import HeartPng from '../../images/heart.png'
import MoneyBagPng from '../../images/money_bag.png'
import FemalePng from '../../images/female.png'
import MalePng from '../../images/male.png'
import IdVerify2Png from '../../images/verify_icon.png'
import NotDonatePng from '../../images/resume_not_donate.png'
import DonatePng from '../../images/resume_donate.png'
import NotPopuPng from '../../images/resume_not_popu.png'
import PopuPng from '../../images/resume_popu.png'
import SharePng from '../../images/resume_share.png'
import MobileWhitePng from '../../images/self_center_mobile_white.png'
import * as api from '../../api'
import { debounce } from '../../lib/utils'

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
      info: {
        id: 0,
        posters: [],
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
        specialities: ['唱歌', '跳舞', '书法'],
        photos: [],
        bindMobile: {
          number: ''
        }
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

  makePhoneCall (phoneNumber) {
    if (phoneNumber) {
      Taro.makePhoneCall({
        phoneNumber
      })
    } else {
      Taro.showToast({
        title: '未绑定手机号',
        mask: true,
        duration: 1000
      })
    }
  }

  onShareAppMessage() {
    return {
      title: '某某某|芃叔小简历',
      imageUrl: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
      path: '/pages/index/index?redirect=/pages/resume/index'
    }
  }

  previewPhotos() {
    wx.previewImage({
      urls: this.state.info.photos.map(item => item.src)
    })
  }

  componentDidMount() {
    const id = this.$router.params.id
    api.api_info(id).then(res => {
      if (res.success) {
        this.setState({
          info: res.data
        })
      }
    })
  }

  debouncer = debounce((type) => {
    api[`api_model_${type}`](this.state.info.id).then(res => {
      if(res.success) {
        Taro.showToast({
          title: type === 'hot' ? '点赞成功' : '打气成功'
        })
      }
    })
  }, 200)

  touchStart(type) {
    this.setState({
      [`${type}ing`]: true
    })
  }

  touchEnd(type) {
    this.setState({
      [`${type}ing`]: false
    })
    this.debouncer(type)
  }

  render() {
    const { info, currTab } = this.state
    let mobile = info.bindMobile.number ? info.bindMobile.number : '未绑定'
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
          {info.posters.map((item, key) => {
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
            style={{ backgroundImage: `url("${info.avatar}")` }}
          />
          <View className="info1">
            <View className="first">
              <View className="name">{info.name}</View>
              <Image className="sex" src={info.sex === 1 ? MalePng : FemalePng} />
              <View className="id-wrapper" style={{visibility: info.idVerify.isPass ? 'visible' : 'hidden'}}>
                <Image src={IdVerify2Png} className="id-verify-icon" />
                <Text className="verify-text">实名认证</Text>
              </View>
            </View>
            <View className="second">
              <View className="btn-group" onClick={this.makePhoneCall.bind(this, mobile)}>
                <Image src={MobileWhitePng} className="btn" />
                <View className="divider-vertical" />
                <Text className="mobile">
                  {mobile}
                </Text>
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
              {this.state.info.photos.map((item, key) => {
                return (
                  <View
                    key={key}
                    className="photo"
                    onClick={this.previewPhotos}
                  ><View className="img" style={{ backgroundImage: `url("${item.src}")` }}/></View>
                )
              })}
            </View>
            {/* <Loadmore /> */}
          </View>
        )}
        <View className="menu">
          <Image className={cn({
            active: this.state.sponsoring
          })} src={this.state.sponsoring ? DonatePng : NotDonatePng} onTouchStart={this.touchStart.bind(this, 'sponsor')} onTouchEnd={this.touchEnd.bind(this,'sponsor')} />
          <Image className={cn({
            active: this.state.hoting
          })} src={this.state.hoting ? PopuPng : NotPopuPng} onTouchStart={this.touchStart.bind(this, 'hot')} onTouchEnd={this.touchEnd.bind(this, 'hot')} />
          <Button className="transparent" open-type="share"><Image src={SharePng} /></Button>
        </View>
      </View>
    )
  }
}
