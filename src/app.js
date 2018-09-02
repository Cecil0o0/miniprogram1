import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.styl'

class App extends Component {

  config = {
    pages: [
      'pages/resume/index',
      'pages/info-basic-edit/index',
      'pages/view-cover/index',
      'pages/view-avatar/index',
      'pages/info-video-edit/index',
      'pages/info-photo-edit/index',
      'pages/subscribe/index',
      'pages/self-center/index',
      'pages/index/index',
      'pages/search/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
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
