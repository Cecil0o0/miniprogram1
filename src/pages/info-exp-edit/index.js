import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker, Textarea, Image } from '@tarojs/components'
import update from 'immutability-helper'
import './index.styl'
import CaretRightPng from '../../images/caret_right.png'
import { experiences_types as types } from '../../helper/types'
import RabbishPng from '../../images/rabbish.png'
import { api_info_edit } from '../../api'
import { showToast, delayToExec } from '../../lib/utils'
import { USER_MODEL_INFO } from '../../lib/constants'

export default class ExpEdit extends Component {
  state = {
    experiences: [],
    other: ''
  }

  componentDidMount() {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.info = info
    this.setState({
      experiences: info.actingExperience.list,
      other: info.actingExperience.other
    })
  }

  onDateChange(index, e) {
    const val = e.detail.value
    this.setState(update(this.state, {
      experiences: {
        [index]: {
          year: {
            $set: val
          }
        }
      }
    }))
  }

  deleteExp(idx) {
    this.setState(update(this.state, {
      experiences: {
        $splice: [[idx, 1]]
      }
    }))
  }

  onTypeChange(index, e) {
    const idx = e.detail.value
    const type = types[idx]
    this.setState(update(this.state, {
      experiences: {
        [index]: {
          type: {
            $set: type
          }
        }
      }
    }))
  }

  handleChange = (key, idx, e) => {
    const val = e.target.value
    this.setState({
      experiences: update(this.state.experiences, {
        [idx]: {
          [key]: {
            $set: val
          }
        }
      })
    })
  }

  handleOtherChange = (e) => {
    this.setState({
      other: e.target.value
    })
  }

  handleAdd = () => {
    this.setState(update(this.state, {
      experiences: {
        $push: [{
          year: 2018,
          name: '',
          type: '',
          director: '',
          character: '',
          coActor: ''
        }]
      }
    }))
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

  complete() {
    const { experiences, other } = this.state
    let actingExperience = {
      list: experiences,
      other
    }
    api_info_edit({
      id: this.info.id,
      actingExperience
    }).then(res => {
      if (res.success) {
        showToast('保存成功')
        delayToExec(() => Taro.navigateBack())
        Taro.setStorageSync(USER_MODEL_INFO, Object.assign(this.info, {
          actingExperience
        }))
      }
    })
  }

  config = {
    navigationBarTitleText: '演艺经历编辑'
  }

  render() {
    const { experiences } = this.state
    return (
      <View className="page-exp-edit">
        {experiences.map((item, idx) => {
          const { year, name, type, director, character, coActor } = item
          return (
            <View className="exp-wrapper" key={idx}>
              <View className="close-wrapper">
                <View className="close-btn" onClick={this.deleteExp.bind(this, idx)}>
                  <Image src={RabbishPng} />
                </View>
                <Picker mode="date" fields="year" start="1970-01-01" end="2019-01-01" value={year} onChange={this.onDateChange.bind(this, idx)}>
                  <View className="form-item year">
                    <View className="form-item-label">{year}年</View>
                    <View className="form-item-info">选择年份</View>
                    <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
                  </View>
                </Picker>
              </View>
              <View className="form-item">
                <View className="form-item-label">影片名称</View>
                <Input value={name} className="form-item-info" onInput={this.handleChange.bind(this, 'name', idx)} />
                <View className="form-item-suffix"></View>
              </View>
              <Picker range={types} value={name} onChange={this.onTypeChange.bind(this, idx)}>
              <View className="form-item">
                <View className="form-item-label">类型</View>
                <View className="form-item-info">{type}</View>
                <View className="form-item-suffix"><Image src={CaretRightPng}></Image></View>
              </View>
              </Picker>
              <View className="form-item">
                <View className="form-item-label">导演</View>
                <Input value={director} className="form-item-info" onInput={this.handleChange.bind(this, 'director', idx)} />
                <View className="form-item-suffix"></View>
              </View>
              <View className="form-item">
                <View className="form-item-label">饰演角色</View>
                <Input value={character} className="form-item-info" onInput={this.handleChange.bind(this, 'character', idx)} />
                <View className="form-item-suffix"></View>
              </View>
              <View className="form-item">
                <View className="form-item-label">合作演员</View>
                <Input value={coActor} className="form-item-info" onInput={this.handleChange.bind(this, 'coActor', idx)} />
                <View className="form-item-suffix"></View>
              </View>
            </View>
          )
        })}
        <View className="add-wrapper">
          <View className="button add-exp" onClick={this.handleAdd}><View>+</View>增加经历</View>
        </View>
        <View className="other-exp">
          <View className="form-item">
            <View className="form-item-label">其他介绍</View>
            <View className="form-item-info"></View>
            <View className="form-item-suffix" />
          </View>
          <Textarea value={this.state.other} onInput={this.handleOtherChange} />
          <View className="divider-horizontal" />
        </View>
        <View className="bottom-btn button" onClick={this.complete}>完成</View>
      </View>
    )
  }
}
