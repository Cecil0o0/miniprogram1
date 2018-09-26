import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import update from 'immutability-helper'
import './index.styl'

export default class CardEdit22 extends Component {
  constructor() {
    super(...arguments)
    this.type = +this.$router.params.type || 1
    this.state = {
      imgs: Taro.getStorageSync(this.type + '$card-edit-photos') || [],
      currDragIndex: -1,
      startpos: {
        x: 0,
        y: 0
      },
      endpos: {
        x: 0,
        y: 0
      }
    }
    this.selectedToEditId = -1
  }
  config = {
    navigationBarTitleText: '图片编辑'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleTouchStart = (idx, e) => {
    this.setState({
      currDragIndex: idx,
      startpos: {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    })
  }

  handleTouchMove = e => {
    this.setState({
      endpos: {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    })
  }

  handleTouchEnd = e => {
    const idx = this.state.currDragIndex
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientY
    const img = this.state.imgs[idx]
    this.setState({
      currDragIndex: -1,
      startpos: {
        x: 0,
        y: 0
      },
      endpos: {
        x: 0,
        y: 0
      }
    })
    for (let i = 0; i < this.state.imgs.length; i++) {
      if (i === idx) continue
      Taro.createSelectorQuery()
        .select('#node' + i)
        .boundingClientRect(res => {
          if (x <= res.right && x >= res.left && y >= res.top && y <= res.bottom) {
            this.setState(
              update(this.state, {
                imgs: {
                  $splice: [[idx, 1], [i, 0, img]]
                }
              })
            )
          }
        })
        .exec()
    }
  }

  handleClick = (idx) => {
    Taro.setStorageSync('cropper__img', this.state.imgs[idx])
    Taro.navigateTo({
      url: '/pages/wx-cropper/index'
    })
    this.selectedToEditIdx = idx
  }

  componentDidShow = () => {
    let img = Taro.getStorageSync('cropper_complete_url')
    if (img && this.selectedToEditIdx !== -1) {
      let imgsCopy = this.state.imgs
      imgsCopy.splice(this.selectedToEditIdx, 1, img)
      this.setState({
        imgs: imgsCopy
      })
      this.selectedToEditIdx = -1
      Taro.removeStorageSync('cropper_complete_url')
    }
  }

  cancel() {
    Taro.navigateBack()
  }

  confirm() {
    Taro.setStorageSync(this.type + '$card-edit-photos', this.state.imgs)
    Taro.navigateTo({
      url: `/pages/card-edit-2/index?type=${this.type}`
    })
  }

  render() {
    const { currDragIndex, imgs, startpos, endpos } = this.state
    return (
      <View className="page-edit-3" onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
        <View className="wrapper">
          {imgs.map((item, idx) => {
            let translateX = endpos.x > 0 && startpos.x > 0 ? endpos.x - startpos.x : 0
            let translateY = endpos.y > 0 && startpos.y > 0 ? endpos.y - startpos.y : 0
            return (
              <View
                className="item"
                key={idx}
                id={`node${idx}`}
                dataIdx={idx}
                onClick={this.handleClick.bind(this, idx)}
                onTouchStart={this.handleTouchStart.bind(this, idx)}
                style={{ transform: currDragIndex === idx ? `translate(${translateX}px,${translateY}px)` : undefined }}
              >
                <Image src={item} mode="aspectFit" />
              </View>
            )
          })}
        </View>
        <View className="btn-group">
          <View onClick={this.confirm} className="confirm button">
            下一步
          </View>
          <View onClick={this.cancel} className="cancel button">
            返回
          </View>
        </View>
        <View className="help-text">温馨提示：所有图片需进行编辑</View>
      </View>
    )
  }
}
