import Taro, { Component } from '@tarojs/taro'
import { View, Image, Video } from '@tarojs/components'
import cn from 'classnames'
import './index.styl'
import PersonPng from '../../images/person.png'
import CakePng from '../../images/cake.png'
import HeightPng from '../../images/height.png'
import WeightPng from '../../images/weight.png'
import BWHPng from '../../images/bwh.png'
import LocationPng from '../../images/location.png'
import DegreePng from '../../images/degree.png'
import JobPng from '../../images/job.png'
import CrownPng from '../../images/crown.png'
import VideoPng from '../../images/black_video.png'
import ExpPng from '../../images/yanyijingli.png'
import CaretRightPng from '../../images/caret_right.png'
import PointPng from '../../images/point.png'
import Experiences from './experiences'

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
      intro: '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！',
      bwh: [45, 48, 52],
      city: '北京市',
      school: '北京电影学院',
      exp: '三年平面模特',
      specialities: ['唱歌', '跳舞', '书法'],
      actingExperience: {
        id: [
          {
            year: 2013,
            name: '非诚勿扰',
            type: '电影',
            director: '冯小刚',
            character: '王嘉涵',
            coActor: '葛优 舒淇 郑恺'
          },
          {
            year: 2013,
            name: '非诚勿扰',
            type: '电影',
            director: '冯小刚',
            character: '王嘉涵',
            coActor: '葛优 舒淇 郑恺'
          },
          {
            year: 2014,
            name: '非诚勿扰',
            type: '电影',
            director: '冯小刚',
            character: '王嘉涵',
            coActor: '葛优 舒淇 郑恺'
          }
        ],
        other: `2013年，范冰冰蝉联2014福布斯中国名人榜第一位，5月23日，布莱恩·辛格导演，休·杰克曼；詹姆斯·麦卡沃伊；迈克尔·法斯宾德主演的电影《X战警：逆转未来》全球同步上映，范冰冰在其中饰演“闪烁女Blink”一角。`
      }
    }
  }
  state = {
    selectedExp: 0
  }
  handleClick(idx) {
    this.setState({
      selectedExp: idx === this.state.selectedExp ? -1 : idx
    })
  }
  render() {
    const info = this.props.info || this.defaultProps.info
    const years = {}
    info.actingExperience && info.actingExperience.list &&
      info.actingExperience.list.forEach(item => {
        if (!years[item.year]) years[item.year] = []
        years[item.year].push(item)
      })
    return (
      <View className="self-info">
        <View className="basic wrapper">
          <View className="header">
            <Image src={PersonPng} className="person" />
            基本信息
          </View>
          <View className="first">
            <View>
              <Image src={CakePng} className="icon age" />
              <View>{info.age}岁</View>
            </View>
            <View>
              <Image src={HeightPng} className="icon height" />
              <View>
                {info.height}
                cm
              </View>
            </View>
            <View>
              <Image src={WeightPng} className="icon weight" />
              <View>
                {info.weight}
                kg
              </View>
            </View>
            <View>
              <Image src={BWHPng} className="icon bwh" />
              <View>{info.bwh.join('/')}</View>
            </View>
          </View>
          <View className="middle-line" />
          <View className="second">
            <View className="item">
              <Image className="location" src={LocationPng} />
              {info.city}
            </View>
            <View className="divider-line" />
            <View className="item">
              <Image className="degree" src={DegreePng} />
              {info.school}
            </View>
            <View className="divider-line" />
            <View className="item">
              <Image className="job" src={JobPng} />
              {info.exp}
            </View>
          </View>
        </View>
        <View className="specialities wrapper">
          <View className="header">
            <Image src={CrownPng} className="crown" />
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
            <Image src={VideoPng} className="video-image" />
            个人视频
          </View>
          <View className="inner-wrapper">
            <Video src={info.video} />
          </View>
        </View>
        <View className="exp wrapper">
          <View className="header">
            <Image src={ExpPng} className="crown" />
            演艺经历
          </View>
          <View className="inner-wrapper accordion-wrapper">
            {Object.keys(years).map((year, idx) => {
              let everyYears = years[year]
              console.log(everyYears)
              return (
                <View
                  className={cn('accordion-item', {
                    active: this.state.selectedExp === idx
                  })}
                  key={idx}
                >
                  <View className="icon">
                    <Image src={PointPng} />
                  </View>
                  <View className="content">
                    <View className="header" onClick={this.handleClick.bind(this, idx)}>
                      {year}年 <Image src={CaretRightPng} className="caret" />
                    </View>
                    <View className="body">
                      <Experiences info={everyYears || []} />
                      <View className="other-title">其他</View>
                      <View className="other">{info.actingExperience.other}</View>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}
