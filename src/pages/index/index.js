import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, Icon, SwiperItem, Text, Image } from '@tarojs/components'
import update from 'immutability-helper'
import cn from 'classnames'
import { api_banners, api_login } from '../../api'
import './index.styl'
import ModelCard from '../../components/model-card/index'
import Loadmore from '../../components/loadmore/index'
import { LOGIN_STATUS } from '../../lib/constants'
import { api_home_models } from '../../api'
import { SIZE } from '../../lib/constants'
import HeartPng from '../../images/heart.png'
import MoneyBagPng from '../../images/money_bag.png'

const genState = () => { return JSON.parse(JSON.stringify({
  swipers: [],
  // tab拦
  currTab: 'sponsor',
  sponsorModels: [],
  hotModels: [],
  hotPage: 1,
  sponsorPage: 1,
  sponsorLoaded: false,
  hotLoaded: false
})) }

export default class Index extends Component {
  constructor() {
    super(...arguments)
    this.initState = genState()
    this.state = genState()
  }

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  }

  loginPromise = new Promise(resolve => this.loginPromiseResolver = resolve)

  getModels({ page = 1, type = 'sponsor' } = {}) {
    return api_home_models({ page, type }).then(res => {
      if (res.success) {
        let list = res.data.list
        let nextState = {
          [`${type}Models`]: update(this.state[`${type}Models`], {
            $push: res.data.list.map(item => ({
              id: item.id,
              num: type === 'sponsor' ? item.subscribe : item.popularity,
              imgSrc: item.cover,
              name: item.name,
              height: item.height,
              weight: item.weight,
              text: type === 'sponsor' ? '赞助值' : '人气值',
              icon: type === 'sponsor' ? MoneyBagPng : HeartPng
            }))
          })
        }
        if (list.length < SIZE) {
          nextState[`${type}Loaded`] = true
        } else {
          nextState[`${type}Page`] = this.state[`${type}Page`] + 1
        }
        this.setState(nextState)
      }
    })
  }

  handleClick(index) {
    this.setState({
      currTab: index
    })
  }

  onReachBottom() {
    let { currTab } = this.state
    !this.state[`${currTab}Loaded`] && this.getModels({ page: this.state[`${currTab}Page`], type: currTab })
  }

  onPullDownRefresh() {
    this.init()
  }

  gotoSearch() {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }

  clickModalCard(model) {
    Taro.navigateTo({
      url: `/pages/resume/index?id=${model.id}`
    })
  }

  clickItemHandler() {
    Taro.switchTab({
      url: '/pages/self-center/index'
    })
  }

  componentDidMount() {
    let redirect = this.$router.params.redirect
    if (redirect) {
      Taro.navigateTo({
        url: redirect
      })
    }
    this.init()
  }

  init() {
    this.loginPromise.then(() => {
      this.setState(genState(), () => {
        // 获取banner图
        // 获取赞助榜和人气榜
        Promise.all([this.getBanners(), this.getModels({ type: 'hot' }), this.getModels({ type: 'sponsor' })]).then(Taro.stopPullDownRefresh)
      })
    })
  }

  login() {
    Taro.login({
      success: (res) => {
        if (res.code) {
          api_login(res.code).then(res => {
            if (res.success) {
              Taro.setStorageSync(LOGIN_STATUS, {
                login: true,
                ...res.data
              })
            }
            // 无论成功与否，只要尝试过登陆即可
            this.loginPromiseResolver()
          })
        } else {
          console.error('登录失败！' + res.errMsg)
          this.loginPromiseResolver()
        }
      },
      fail: this.loginPromiseResolver
    })
  }

  checkSession() {
    // 为了兼容真机调试登陆，需要先判断本地登陆状态
    const loginStatus = Taro.getStorageSync(LOGIN_STATUS) || {}
    if (!loginStatus.login) {
      this.login()
    } else {
      Taro.checkSession().then(this.loginPromiseResolver).catch(this.login.bind(this))
    }
  }

  getBanners() {
    return api_banners().then(res => {
      if (res.success) {
        this.setState({
          swipers: res.data
        })
      }
    })
  }

  componentDidShow() {
    this.checkSession()
  }

  render() {
    const { currTab, hotLoaded, sponsorLoaded } = this.state
    const showLoadMore = currTab === 'hot' && !hotLoaded || currTab === 'sponsor' && !sponsorLoaded
    return (
      <View className="index">
        <View className="search_input" onClick={this.gotoSearch}>
          <Icon size="19" type="search" />
          <Text>请输入你想要的内容...</Text>
        </View>
        <Swiper className="swiper" indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots autoplay>
          {this.state.swipers.map((item, key) => {
            return (
              <SwiperItem key={key} onClick={this.clickItemHandler.bind(this, item)}>
                <View>
                  <Image src={item.src} />
                </View>
              </SwiperItem>
            )
          })}
        </Swiper>
        <View className="tabs">
          <View
            className={cn({
              active: this.state.currTab === 'sponsor'
            })}
            onClick={this.handleClick.bind(this, 'sponsor')}
          >
            <Text>赞助榜</Text>
          </View>
          <View
            className={cn({
              active: this.state.currTab === 'hot'
            })}
            onClick={this.handleClick.bind(this, 'hot')}
          >
            <Text>人气榜</Text>
          </View>
        </View>
        <View className="model-cards-wrapper">
          {this.state.currTab === 'sponsor'
            ? this.state.sponsorModels.map((model, key) => {
                return (
                  <ModelCard
                    model={Object.assign(
                      {
                        type: this.state.currTab
                      },
                      model
                    )}
                    key={key}
                    onClick={this.clickModalCard.bind(this, model)}
                  />
                )
              })
            : this.state.hotModels.map((model, key) => {
                return (
                  <ModelCard
                    model={Object.assign(
                      {
                        label: this.state.currTab
                      },
                      model
                    )}
                    key={key}
                    onClick={this.clickModalCard.bind(this, model)}
                  />
                )
              })}
        </View>
        { showLoadMore && <Loadmore /> }
      </View>
    )
  }
}
