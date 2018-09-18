import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker, Textarea, Image } from '@tarojs/components'
import QfModal from '../../components/modal'
import './index.styl'
import CaretRightPng from '../../images/caret_right.png'

const ages = []
for (let i = 10; i <= 60; i++) {
  ages.push(i)
}
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

export default class InfoBasicEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {
        name: '某某某',
        age: 20,
        height: 165,
        weight: 50,
        bwh: [88, 88, 88],
        city: ['北京市', '无', '无'],
        school: '北京电影学院',
        exp: '三年平面模特',
        specialities: ['唱歌', '跳舞', '书法'],
        intro: '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！'
      },
      label: {
        name: '姓名',
        age: '年龄',
        height: '身高',
        weight: '体重',
        bwh: '三围',
        city: '所在地',
        school: '院校',
        exp: '经验',
        specialities: '特长',
        intro: '个性签名'
      },
      modalVisible: false,
      inputPlaceholder: '',
      inputName: ''
    }
    this.inputValue = ''
  }
  config = {
    navigationBarTitleText: '基本资料编辑'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  inputChange(e) {
    this.setState({
      inputValue: e.detail.value
    })
  }

  confirm() {
    console.log('confirm')
  }

  cancel() {
    console.log('cancel')
  }

  modalConfirm() {
    let value = this.state.inputValue
    if (this.state.inputName === 'specialities') {
      try {
        value = this.state.inputValue.split(' ')
      } catch (e) {
        console.log(e)
      }
    }
    this.setState({
      info: this.setInfo(this.state.inputName, value),
      modalVisible: false
    })
  }

  modalCancel() {
    this.setState({
      modalVisible: false
    })
  }

  onClickFormItem(key) {
    const label = this.state.label[key]
    let value = this.dataTrans(key, this.state.info[key])
    this.setState({
      inputPlaceholder: `请输入${label}`,
      inputValue: value,
      inputName: key,
      modalVisible: true
    })
  }

  dataTrans(key, value) {
    let i = value
    if (key === 'specialities') {
      i = value.join(' ')
    } else if (key === 'bwh') {
      i = value.join('/')
    } else if (key === 'city') {
      i = value.join('-')
    }
    return i
  }

  setInfo(key, value) {
    return Object.assign({}, this.state.info, {
      [key]: value
    })
  }

  onAgeChange(e) {
    const index = e.detail.value
    this.setState({
      info: this.setInfo('age', ages[index])
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

  onCityChange(e) {
    this.setState({
      info: this.setInfo('city', e.detail.value)
    })
  }

  render() {
    const { info, inputPlaceholder } = this.state
    // 年龄
    const age_value = ages.findIndex(item => item === this.dataTrans('age', info['age']))
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
    return (
      <View className="info-basic-edit">
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 'name')}>
          <View className="form-item-label">姓名</View>
          <View className="form-item-info">{this.dataTrans('name', info['name'])}</View>
          <View className="form-item-suffix">
            <Image src={CaretRightPng} />
          </View>
        </View>
        <Picker range={ages} value={age_value} onChange={this.onAgeChange}>
          <View className="form-item">
            <View className="form-item-label">年龄</View>
            <View className="form-item-info">{this.dataTrans('age', info['age'])}</View>
            <View className="form-item-suffix">
              <Image src={CaretRightPng} />
            </View>
          </View>
        </Picker>
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
        <Picker mode="region" onChange={this.onCityChange} value={0} custom-item="无">
          <View className="form-item">
            <View className="form-item-label">所在地</View>
            <View className="form-item-info">{this.dataTrans('city', info['city'])}</View>
            <View className="form-item-suffix">
              <Image src={CaretRightPng} />
            </View>
          </View>
        </Picker>
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 'school')}>
          <View className="form-item-label">院校</View>
          <View className="form-item-info">{this.dataTrans('school', info['school'])}</View>
          <View className="form-item-suffix">
            <Image src={CaretRightPng} />
          </View>
        </View>
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 'exp')}>
          <View className="form-item-label">经验</View>
          <View className="form-item-info">{this.dataTrans('exp', info['exp'])}</View>
          <View className="form-item-suffix">
            <Image src={CaretRightPng} />
          </View>
        </View>
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 'specialities')}>
          <View className="form-item-label">特长</View>
          <View className="form-item-info">{this.dataTrans('specialities', info['specialities'])}</View>
          <View className="form-item-suffix">
            <Image src={CaretRightPng} />
          </View>
        </View>
        <View className="form-item flex-start">
          <View className="form-item-label">介绍</View>
          <View className="form-item-info">
            <Textarea
              className="form-item-info-textarea"
              value={this.dataTrans('intro', info['intro'])}
              style={{ position: 'unset' }}
            />
          </View>
          <View className="form-item-suffix" />
        </View>
        <View className="btn-group">
          <View onClick={this.confirm} className="confirm button">
            完成
          </View>
          <View onClick={this.cancel} className="cancel button">
            取消
          </View>
        </View>
        <QfModal style={`display: ${this.state.modalVisible ? 'block' : 'none'}`}>
          <View className="modal-inner">
            <View className="body">
              <Input placeholder={inputPlaceholder} value={this.state.inputValue} onInput={this.inputChange} />
            </View>
            <View className="footer">
              <View className="button confirm" onClick={this.modalConfirm}>
                确定
              </View>
              <View className="button cancel" onClick={this.modalCancel}>
                取消
              </View>
            </View>
          </View>
        </QfModal>
      </View>
    )
  }
}
