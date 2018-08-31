import Taro, { Component } from '@tarojs/taro'
import { View, Input, Icon } from '@tarojs/components'
import './index.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '搜索'
  }

  state = {
    tags: ['会跳舞', '会唱歌', '美女']
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onConfirm() {
    console.log('查询')
  }

  render() {
    return (
      <View className="search">
        <View className="search_input">
          <Input placeholder="请输入你想要的内容" onConfirm={this.onConfirm} />
          <Icon size="19" type="search" />
        </View>
        <View className="help-wrapper">
          {this.state.tags.map((tag, key) => {
            return <View key={key}>{tag}</View>
          })}
        </View>
      </View>
    )
  }
}
