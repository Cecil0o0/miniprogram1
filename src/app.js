import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.styl'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/card-edit-2/index',
      'pages/card-edit-1/index',
      'pages/card-edit-3/index',
      'pages/wx-cropper/index',
      'pages/advice/index',
      'pages/attention/index',
      'pages/id-verify/index',
      'pages/info-exp-edit/index',
      'pages/resume/index',
      'pages/bind-mobile/index',
      'pages/info-basic-edit/index',
      'pages/view-cover/index',
      'pages/cash/index',
      'pages/view-avatar/index',
      'pages/info-video-edit/index',
      'pages/info-photo-edit/index',
      'pages/subscribe/index',
      'pages/self-center/index',
      'pages/search/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '芃叔小简历',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './images/home_home.png',
          selectedIconPath: './images/home_home_active.png'
        },
        {
          pagePath: 'pages/self-center/index',
          text: '个人中心',
          iconPath: './images/home_person.png',
          selectedIconPath: './images/home_person_active.png'
        }
      ],
      color: '#BDC0C5',
      selectedColor: '#000',
      backgroundColor: '#fff',
      borderStyle: 'black',
      position: 'bottom'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
