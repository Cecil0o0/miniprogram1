import Taro, { Component } from '@tarojs/taro'
import { View, Image, Video } from '@tarojs/components'

export default class SelfInfo extends Component {
  defaultProps = {
    info: {
      id: 0,
      poster:
        'https://www.10wallpaper.com/wallpaper/1366x768/1609/kenza_mel_beach_photography-Beauty_poster_wallpaper_1366x768.jpg',
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
      specialities: ['唱歌', '跳舞', '书法']
    }
  }
  render() {
    const info = this.props.info
    return (
      <View className="self-info">
        <View className="basic wrapper">
          <View className="header">
            <Image src="" className="person" />
            基本信息
          </View>
          <View className="first">
            <View>
              <Image src="" className="icon age" />
              <View>{info.age}岁</View>
            </View>
            <View>
              <Image src="" className="icon height" />
              <View>
                {info.height}
                cm
              </View>
            </View>
            <View>
              <Image src="" className="icon weight" />
              <View>
                {info.weight}
                kg
              </View>
            </View>
            <View>
              <Image src="" className="icon bwh" />
              <View>{info.bwh.join('/')}</View>
            </View>
          </View>
          <View className="middle-line" />
          <View className="second">
            <View className="item">
              <Image className="location" src="" />
              {info.city}
            </View>
            <View className="divider-line" />
            <View className="item">
              <Image className="degree" src="" />
              {info.school}
            </View>
            <View className="divider-line" />
            <View className="item">
              <Image className="job" src="" />
              {info.exp}
            </View>
          </View>
        </View>
        <View className="specialities wrapper">
          <View className="header">
            <Image src="" className="crown" />
            特长
          </View>
          <View className="inner-wrapper">
            {info.specialities.map((item, key) => {
              return (
                <View className="speciality" key={key}>
                  {item}
                </View>
              )
            })}
          </View>
        </View>
        <View className="video wrapper">
          <View className="header">
            <Image src="" className="video-image" />
            个人视频
          </View>
          <View className="inner-wrapper">
            <Video />
          </View>
        </View>
        <View className="exp wrapper">
          <View className="header">
            <Image src="" className="crown" />
            演艺经历
          </View>
          <View className="inner-wrapper">
          </View>
        </View>
      </View>
    )
  }
}
