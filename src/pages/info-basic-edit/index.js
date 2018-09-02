import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import cn from 'classnames'
import QfModal from '../../components/modal'
import './index.styl'

export default class InfoBasicEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {
        name: '某某某',
        age: 20,
        height: 168,
        weight: 45,
        bwh: [45, 48, 52],
        city: '北京市',
        school: '北京电影学院',
        exp: '三年平面模特',
        specialities: ['唱歌', '跳舞', '书法'],
        intro:
          '坚持不一定会胜利，放弃不一定是认输，人生有很多时候需要的不仅仅是执着，更是回眸一笑的洒脱，加油！'
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
      inputPlaceholder: ''
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
    console.log(this.state.inputValue)
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
      modalVisible: true
    })
  }

  dataTrans(key, value) {
    let i = value
    if (key === 'specialities') {
      i = value.join(' ')
    } else if (key === 'bwh') {
      i = value.join('/')
    }
    return i
  }

  render() {
    const { info, label, inputPlaceholder } = this.state
    const keys = Object.keys(info)
    return (
      <View className="info-basic-edit">
        {keys.map((key, index) => {
          const l = label[key]
          const k = key
          const i = this.dataTrans(key, info[key])
          return (
            <block key={index}>
              <View
                className={cn('form-item', {
                  'no-border': ['weight', 'city'].indexOf(key) !== -1,
                  'flex-start': ['intro'].indexOf(key) !== -1
                })}
                onClick={this.onClickFormItem.bind(this, k)}
              >
                <View className="form-item-label">{l}</View>
                <View className="form-item-info">{i}</View>
                <View className="form-item-suffix" />
              </View>
              {['weight', 'city'].indexOf(key) !== -1 && <View className="divider" />}
            </block>
          )
        })}
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
              <Input
                placeholder={inputPlaceholder}
                value={this.state.inputValue}
                onInput={this.inputChange}
              />
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
