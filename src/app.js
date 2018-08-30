import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.styl'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/info-edit/index'
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
