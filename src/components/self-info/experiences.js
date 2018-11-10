import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import ListPng from '../../images/list.png'
import ActionPng from '../../images/action.png'
import PersonOPng from '../../images/person_o.png'
import PeoplePng from '../../images/people.png'
import './experiences.styl'

export default class Experiences extends Component {
  defaultProps = {
    info: [
      {
        year: 2013,
        name: '非诚勿扰',
        type: '电影',
        director: '冯小刚',
        character: '王嘉涵',
        coActor: '葛优 舒淇 郑恺'
      }
    ]
  }
  render() {
    const exps = this.props.info || this.defaultProps.info
    return (
      <View className="experiences-wrapper">
        {exps.map((exp, idx) => {
          return (
            <View key={idx} className="item">
              <View className="name">{exp.name}</View>
              <View className="content">
                <View>
                  <Image src={ListPng} />
                  类型
                </View>
                <View>{exp.type}</View>
              </View>
              <View className="content">
                <View>
                  <Image src={ActionPng} />
                  导演
                </View>
                <View>{exp.director}</View>
              </View>
              <View className="content">
                <View>
                  <Image src={PersonOPng} />
                  饰演角色
                </View>
                <View>{exp.character}</View>
              </View>
              <View className="content">
                <View>
                  <Image src={PeoplePng} />
                  合作演员
                </View>
                <View>{exp.coActor}</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
