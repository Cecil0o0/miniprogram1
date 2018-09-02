import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.styl'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/advice/index',
      'pages/card-edit-1/index',
      'pages/id-verify/index',
      'pages/info-exp-edit/index',
      'pages/resume/index',
      'pages/info-basic-edit/index',
      'pages/view-cover/index',
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
