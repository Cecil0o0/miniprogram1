import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.styl'

export default class SelfCenter extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  state = {
    info: {
      id: 0,
      poster:
        'https://www.10wallpaper.com/wallpaper/1366x768/1609/kenza_mel_beach_photography-Beauty_poster_wallpaper_1366x768.jpg',
      avatar: 'https://wx4.sinaimg.cn/orj360/96a79eebgy1fpo3ig1w9qj20c80c83zr.jpg',
      name: '某某某',
      idVerify: true,
      sex: 0,
      popularity: 1258,
      subscribe: 225874,
      intro:
        '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！'
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { poster, avatar, name, popularity, subscribe, intro } = this.state.info
    return (
      <View className="self-center">
        <View className="header" style={{ backgroundImage: `url("${poster}")` }}>
          <View className="avatar" style={{ backgroundImage: `url("${avatar}")` }} />
          <View className="first">
            <Text>{name}</Text>
            <Image className="female" src="" />
            <View className="idVerify">
              <Image src="" /> 实名认证
            </View>
          </View>
          <View className="second">
            <View className="popularity">
              <Image className="heart" src="" />
              <Text>
                人气值：
                {popularity}
              </Text>
            </View>
            <View className="divider" />
            <View className="sponsor-value">
              <Image className="money-bag" src="" />
              <Text>
                赞助值：
                {subscribe}
              </Text>
            </View>
          </View>
          <View className="intro">{intro}</View>
        </View>
        <View className="body">
          <View className="item">
            <Image src="" />
            <Text>关注的人</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>基本资料</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>上传海报</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>上传相册</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>个人视频</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>演艺经历</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>赞助我们</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>制作模卡</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>实名认证</Text>
          </View>
          <View className="item">
            <Image src="" />
            <Text>投诉建议</Text>
          </View>
        </View>
      </View>
    )
  }
}
