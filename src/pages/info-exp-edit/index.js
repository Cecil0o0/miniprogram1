import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Textarea, Image } from '@tarojs/components'
import './index.styl'
import CaretRightPng from '../../images/caret_right.png'

export default class ExpEdit extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      selectedIndex: 0,
      experiences: [
        {
          year: 2013,
          name: '',
          // 1: 电影
          type: 1,
          director: '',
          character: '',
          coActor: ['']
        }
      ],
      other: `2013年，范冰冰蝉联2014福布斯中国名人榜第一位，5月23日，布莱恩·辛格导演，休·杰克曼；詹姆斯·麦卡沃伊；迈克尔·法斯宾德主演的电影《X战警：逆转未来》全球同步上映，范冰冰在其中饰演“闪烁女Blink”一角。`
    }
  }

  onDateChange(e) {
    const val = e.detail.value
    let state = this.state
    const { selectedIndex } = state
    if (selectedIndex !== -1) {
      state.experiences[selectedIndex].year = val
    }
    this.setState(state)
  }

  dataTrans(key, value) {
    let i = value
    if (key === 'coActor') {
      i = value.join(' ')
    } else if (key === 'year') {
      i = value + '年'
    }
    return i
  }

  config = {
    navigationBarTitleText: '演艺经历编辑'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { experiences } = this.state
    return (
      <View className="page-exp-edit">
        {experiences.map((item, idx) => {
          const { year, name, type, director, character, coActor } = item
          return (
            <View className="exp-wrapper" key={idx}>
              <Picker mode="date" fields="year" onChange={this.onDateChange}>
                <View className="form-item year">
                  <View className="form-item-label">{year}年</View>
                  <View className="form-item-info">选择年份</View>
                  <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
                </View>
              </Picker>
              <View className="form-item" onClick={this.onClickFormItem.bind(this, item)}>
                <View className="form-item-label">影片名称</View>
                <View className="form-item-info">{name}</View>
                <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
              </View>
              <View className="form-item" onClick={this.onClickFormItem.bind(this, item)}>
                <View className="form-item-label">类型</View>
                <View className="form-item-info">{type}</View>
                <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
              </View>
              <View className="form-item" onClick={this.onClickFormItem.bind(this, item)}>
                <View className="form-item-label">导演</View>
                <View className="form-item-info">{director}</View>
                <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
              </View>
              <View className="form-item" onClick={this.onClickFormItem.bind(this, item)}>
                <View className="form-item-label">饰演角色</View>
                <View className="form-item-info">{character}</View>
                <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
              </View>
              <View className="form-item" onClick={this.onClickFormItem.bind(this, item)}>
                <View className="form-item-label">合作演员</View>
                <View className="form-item-info">{coActor.join(' ')}</View>
                <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
              </View>
            </View>
          )
        })}
        <View className="add-wrapper">
          <View className="button add-exp"><View>+</View>增加经历</View>
        </View>
        <View className="other-exp">
          <View className="form-item">
            <View className="form-item-label">其他介绍</View>
            <View className="form-item-info"></View>
            <View className="form-item-suffix" />
          </View>
          <Textarea value={this.state.other}></Textarea>
          <View className="divider-horizontal" />
        </View>
        <View className="bottom-btn button">完成</View>
      </View>
    )
  }
}
