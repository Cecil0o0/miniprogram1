import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, Icon, SwiperItem, Text } from '@tarojs/components'
import cn from 'classnames'
import './index.styl'
import ModelCard from '../../components/model-card/index'
import Loadmore from '../../components/loadmore/index'
import Banner1 from '../../images/banner1.png'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    swipers: [
      {
        src: Banner1,
        jump: {
          type: 'web',
          url: ''
        }
      },
      {
        src: Banner1,
        jump: {
          type: 'web',
          url: ''
        }
      },
      {
        src: Banner1,
        jump: {
          type: 'web',
          url: ''
        }
      }
    ],
    currTab: 1,
    models: [
      {
        popularity: 200000,
        imgSrc: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
        name: '某某某',
        height: 169,
        weight: 51
      },
      {
        popularity: 200000,
        imgSrc: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
        name: '某某某',
        height: 169,
        weight: 51
      },
      {
        popularity: 200000,
        imgSrc: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
        name: '某某某',
        height: 169,
        weight: 51
      },
      {
        popularity: 200000,
        imgSrc: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
        name: '某某某',
        height: 169,
        weight: 51
      },
      {
        popularity: 200000,
        imgSrc: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
        name: '某某某',
        height: 169,
        weight: 51
      },
      {
        popularity: 200000,
        imgSrc: 'http://t2.hddhhn.com/uploads/tu/201610/198/hkgip2b102z.jpg',
        name: '某某某',
        height: 169,
        weight: 51
      }
    ]
  }

  handleClick(index) {
    this.setState({
      currTab: index
    })
  }

  gotoSearch() {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }

  clickModalCard() {
    Taro.navigateTo({
      url: '/pages/resume/index'
    })
  }

  clickItemHandler() {
    Taro.navigateTo({
      url: '/pages/self-center/index'
    })
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View className="search_input" onClick={this.gotoSearch}>
          <Icon size="19" type="search" />
          <Text>请输入你想要的内容...</Text>
        </View>
        <Swiper
          className="swiper"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
        >
          {this.state.swipers.map((item, key) => {
            return (
              <SwiperItem key={key} onClick={this.clickItemHandler.bind(this, item)}>
                <View style={{ backgroundImage: `url("${item.src}")` }} />
              </SwiperItem>
            )
          })}
        </Swiper>
        <View className="tabs">
          <View
            className={cn({
              active: this.state.currTab === 1
            })}
            onClick={this.handleClick.bind(this, 1)}
          >
            <Text>赞助榜</Text>
          </View>
          <View
            className={cn({
              active: this.state.currTab === 2
            })}
            onClick={this.handleClick.bind(this, 2)}
          >
            <Text>人气榜</Text>
          </View>
        </View>
        <View className="model-cards-wrapper">
          {this.state.models.map((model, key) => {
            return (
              <ModelCard model={model} key={key} onClick={this.clickModalCard.bind(this, model)} />
            )
          })}
        </View>
        <Loadmore />
      </View>
    )
  }
}
