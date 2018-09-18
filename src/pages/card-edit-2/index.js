import Taro, { Component } from '@tarojs/taro'
import { View, Image, Picker, Input } from '@tarojs/components'
import './index.styl'
import CaretRightPng from '../../images/caret_right.png'

const heights = []
for (let i = 60; i <= 220; i++) {
  heights.push(i)
}
const weights = []
for (let i = 20; i <= 150; i++) {
  weights.push(i)
}
const bwhs = []
const col = []
for (let j = 0; j < 3; j++) {
  for (let i = 30; i <= 130; i++) {
    col.push(i)
  }
  bwhs.push(col)
}
const shoess = []
for (let i = 30; i <= 50; i++) {
  shoess.push(i)
}
const bgcolors = [
  { name: '红', value: 'red' },
  { name: '黄', value: 'yellow' },
  { name: '蓝', value: 'blue' },
  { name: '白', value: 'white' }
]

export default class CardEdit2 extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      info: {
        name: '某某某',
        age: 20,
        height: 165,
        weight: 50,
        bwh: [88, 88, 88],
        shoeSize: 35,
        city: ['北京市', '无', '无'],
        bgcolor: { name: '白', value: 'white' }
      }
    }
  }

  config = {
    navigationBarTitleText: '模卡制作'
  }

  dataTrans(key, value) {
    let i = value
    if (key === 'specialities') {
      i = value.join(' ')
    } else if (key === 'bwh') {
      i = value.join('/')
    } else if (key === 'city') {
      i = value.join('-')
    } else if (key === 'bgcolor') {
      i = value.name
    }
    return i
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  confirm() {
    console.log('confirm')
  }

  cancel() {
    console.log('cancel')
  }

  setInfo(key, value) {
    return Object.assign({}, this.state.info, {
      [key]: value
    })
  }

  onHeightChange(e) {
    const index = e.detail.value
    this.setState({
      info: this.setInfo('height', heights[index])
    })
  }

  onWeightChange(e) {
    const index = e.detail.value
    this.setState({
      info: this.setInfo('weight', weights[index])
    })
  }

  onBWHChange(e) {
    const indexArr = e.detail.value
    const val = indexArr.map((item, index) => {
      return bwhs[index][item]
    })
    this.setState({
      info: this.setInfo('bwh', val)
    })
  }

  onColorChange(e) {
    const index = e.detail.value
    this.setState({
      info: this.setInfo('bgcolor', Object.assign({}, bgcolors[index]))
    })
  }

  onCityChange(e) {
    this.setState({
      info: this.setInfo('city', e.detail.value)
    })
  }

  render() {
    const { info } = this.state
    // 身高
    const currHeight = this.dataTrans('height', info['height'])
    const height_value = heights.findIndex(item => item === currHeight)
    // 体重
    const currWeight = this.dataTrans('weight', info['weight'])
    const weight_value = weights.findIndex(item => item === currWeight)
    // 三围
    const bwh_value = this.state.info.bwh.map((item, index) => {
      return bwhs[index].findIndex(i => i === item)
    })
    // 鞋码
    const currShoeSize = this.dataTrans('shoeSize', info['shoeSize'])
    const shoeSize_value = shoess.findIndex(item => item === currShoeSize)
    // 背景颜色
    const currBgcolor = info['bgcolor']
    const bgcolor_value = bgcolors.findIndex(item => item.value === currBgcolor)
    return (
      <View className="page-edit-2">
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 'name')}>
          <View className="form-item-label">姓名</View>
          <View className="form-item-info">
            <Input value={this.dataTrans('name', info['name'])} />
          </View>
          <View className="form-item-suffix" />
        </View>
        <Picker range={heights} onChange={this.onHeightChange} value={height_value}>
          <View className="form-item">
            <View className="form-item-label">身高</View>
            <View className="form-item-info">{this.dataTrans('height', info['height'])}</View>
            <View className="form-item-suffix">
              <Image src={CaretRightPng} />
            </View>
          </View>
        </Picker>
        <Picker range={weights} onChange={this.onWeightChange} value={weight_value}>
          <View className="form-item">
            <View className="form-item-label">体重</View>
            <View className="form-item-info">{this.dataTrans('weight', info['weight'])}</View>
            <View className="form-item-suffix">
              <Image src={CaretRightPng} />
            </View>
          </View>
        </Picker>
        <Picker mode="multiSelector" range={bwhs} onChange={this.onBWHChange} value={bwh_value}>
          <View className="form-item">
            <View className="form-item-label">三围</View>
            <View className="form-item-info">{this.dataTrans('bwh', info['bwh'])}</View>
            <View className="form-item-suffix">
              <Image src={CaretRightPng} />
            </View>
          </View>
        </Picker>
        <View style={{ height: 22, backgroundColor: '#F8F8F8' }} />
        <Picker range={shoess} onChange={this.onShoeSizeChange} value={shoeSize_value}>
          <View className="form-item">
            <View className="form-item-label">鞋码</View>
            <View className="form-item-info">{this.dataTrans('shoeSize', info['shoeSize'])}</View>
            <View className="form-item-suffix">
              <Image src={CaretRightPng} />
            </View>
          </View>
        </Picker>
        <Picker mode="region" onChange={this.onCityChange} value={0} custom-item="无">
          <View className="form-item">
            <View className="form-item-label">所在地</View>
            <View className="form-item-info">{this.dataTrans('city', info['city'])}</View>
            <View className="form-item-suffix">
              <Image src={CaretRightPng} />
            </View>
          </View>
        </Picker>
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 'qrcode')}>
          <View className="form-item-label">二维码展示</View>
          <View className="form-item-info">{this.dataTrans('name', info['name'])}</View>
          <View className="form-item-suffix">
            <Image src={CaretRightPng} />
          </View>
        </View>
        <Picker range={bgcolors} range-key="name" onChange={this.onColorChange} value={bgcolor_value}>
          <View className="form-item">
            <View className="form-item-label">背景颜色</View>
            <View className="form-item-info">{this.dataTrans('bgcolor', info['bgcolor'])}</View>
            <View className="form-item-suffix">
              <Image src={CaretRightPng} />
            </View>
          </View>
        </Picker>
        <View className="btn-group">
          <View onClick={this.confirm} className="confirm button">
            完成
          </View>
          <View onClick={this.cancel} className="cancel button">
            取消
          </View>
        </View>
      </View>
    )
  }
}
