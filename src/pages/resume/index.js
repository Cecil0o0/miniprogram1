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
import { LOGIN_STATUS, USER_MODEL_INFO } from '../../lib/constants';

export default class Resume extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipers: [],
      currTab: 1,
      info: {},
      isAttention: true
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

  getIfAttention() {
    api.api_user_if_follow(this.state.info.id).then(res => {
      if (res.success) {
        this.setState({
          isAttention: res.data
        })
      }
    })
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

  previewPhotos(current) {
    wx.previewImage({
      urls: this.state.info.photos.map(item => item.src),
      current
    })
  }

  componentDidMount() {
    const id = this.$router.params.id
    api.api_info(id).then(res => {
      if (res.success) {
        this.setState({
          info: res.data
        }, this.getIfAttention)
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

  addAttention() {
    const userId = Taro.getStorageSync(LOGIN_STATUS).id
    const modelId = this.state.info.id
    api.api_user_attention({ userId, modelId }).then(res => {
      if (res.success) {
        Taro.showToast({
          title: '关注成功'
        })
        this.setState({
          isAttention: true
        })
        // 更新本地缓存
        let modelInfo = Taro.getStorageSync(USER_MODEL_INFO)
        modelInfo.attentions.push(modelId)
        Taro.setStorageSync(USER_MODEL_INFO, modelInfo)
      }
    })
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
              <View className="btn-group" onClick={this.makePhoneCall.bind(this, info.bindMobile.number)}>
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
                    onClick={this.previewPhotos.bind(this, item.src)}
                  ><Image className="img" mode="aspectFit" src={item.src} /></View>
                )
              })}
            </View>
            {/* <Loadmore /> */}
          </View>
        )}
        <View className="menu">
          <Image className={cn({
            active: this.state.hoting
          })} src={this.state.hoting ? DonatePng : NotDonatePng} onTouchStart={this.touchStart.bind(this, 'hot')} onTouchEnd={this.touchEnd.bind(this,'hot')} />
          <Image src={this.state.isAttention ? PopuPng : NotPopuPng} onClick={this.addAttention} />
          <Button className="transparent" open-type="share"><Image src={SharePng} /></Button>
        </View>
      </View>
    )
  }
}
