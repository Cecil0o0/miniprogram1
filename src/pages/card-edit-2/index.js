import Taro, { Component } from '@tarojs/taro'
import { View, Image, Picker, Input, Canvas } from '@tarojs/components'
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
  { name: '白', value: 'white' },
  { name: '浅灰', value: '#d1d3db'}
]

export default class CardEdit2 extends Component {
  constructor() {
    super(...arguments)
    this.type = +this.$router.params.type || 3
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
    switch(this.type) {
      case 1:
        this.state.canvasSize = {
          width: 4050 / 2,
          height: 2447 / 2
        }
        break
      case 2:
        this.state.canvasSize = {
          width: 4056 / 2,
          height: 1717 / 2
        }
        break
      case 3:
        this.state.canvasSize = {
          width: 2502,
          height: 1079
        }
        break
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

  generateModelCard = (type) => {
    const { name, height, weight, bwh, shoeSize, bgcolor } = this.state.info
    const { canvasSize } = this.state
    const ctx = Taro.createCanvasContext('canvas')
    const imgs = Taro.getStorageSync(`${type}$card-edit-photos`)
    // Taro.showLoading({
    //   title: '正在生成模卡',
    //   mask: true
    // })

    let fnName = ''
    switch(type) {
      case 1:
        fnName = 'drawTypeone'
        break
      case 2:
        fnName = 'drawTypetwo'
        break
      case 3:
        fnName = 'drawTypethree'
        break
    }

    this[fnName](ctx, name, height, weight, bwh, shoeSize, bgcolor, imgs)

    ctx.draw(false, () => {
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: canvasSize.width,
        height: canvasSize.height,
        destWidth: canvasSize.width * 2,
        destHeight: canvasSize.height * 2,
        canvasId: 'canvas',
        success: (res) => {
          Taro.showLoading({
            title: '正在保存模卡',
            mask: true
          })
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            complete: () => {
              Taro.hideLoading()
              Taro.showToast({
                title: '已保存至相册',
                duration: 1000
              })
              var timer = setTimeout(() => {
                Taro.navigateBack({
                  delta: 3
                })
                Taro.switchTab({
                  url: '/pages/index/index'
                })
                clearTimeout(timer)
              }, 1000)
            }
          })
        },
        fail: (e) => {
          console.log(e)
        }
      })
    })
  }

  drawTypeone(ctx, name, height, weight, bwh, shoeSize, bgcolor, imgs) {
    const { canvasSize } = this.state
    // 背景
    ctx.setFillStyle(bgcolor.value)
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    const scale = 0.5
    ctx.setTransform(scale, 0, 0, scale, 0, 0)
    ctx.setFontSize(213)
    ctx.setFillStyle('#000')
    ctx.setTextAlign('left')
    ctx.setTextBaseline('top')
    ctx.fillText(name, 249, 185)
    ctx.setFontSize(80)
    ctx.fillText(`HEIGHT:${height}CM  WEIGHT:${weight}KG`, 249, 563)
    ctx.fillText(`BUST:${bwh[0]}  WAIST:${bwh[1]}  HIPS:${bwh[2]}  SHOES:${shoeSize}`, 249, 700)
    // 二维码
    ctx.fillRect(1660, 112, 546, 546)
    // 图片1
    imgs[0] && ctx.drawImage(imgs[0], 230, 900, 475, 710)
    imgs[1] && ctx.drawImage(imgs[1], 741, 900, 475, 710)
    imgs[2] && ctx.drawImage(imgs[2], 1252, 900, 475, 710)
    imgs[3] && ctx.drawImage(imgs[3], 1765, 900, 475, 710)
    imgs[4] && ctx.drawImage(imgs[4], 230, 1646, 475, 710)
    imgs[5] && ctx.drawImage(imgs[5], 741, 1646, 475, 710)
    imgs[6] && ctx.drawImage(imgs[6], 1252, 1646, 475, 710)
    imgs[7] && ctx.drawImage(imgs[7], 1765, 1646, 475, 710)
    imgs[8] && ctx.drawImage(imgs[8], 2418, 0, 1632, 2442)
  }

  drawTypetwo(ctx, name, height, weight, bwh, shoeSize, bgcolor, imgs) {
    const { canvasSize } = this.state
    // 背景
    ctx.setFillStyle(bgcolor.value)
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    const scale = 0.5
    ctx.setTransform(scale, 0, 0, scale, 0, 0)
    ctx.setFontSize(86)
    ctx.setFillStyle('#000')
    ctx.fillRect(102, 76, 16, 85)
    ctx.fillText(name, 137, 150)
    ctx.setFontSize(57)
    ctx.fillText('身高|HEIGHT', 90, 267)
    ctx.fillText(`${height}cm`, 93, 355)
    ctx.fillText('体重|WEIGHT', 89, 426)
    ctx.fillText(`${weight}cm`, 89, 507)
    ctx.fillText('胸围|BUST', 89, 580)
    ctx.fillText(`${bwh[0]}`, 91, 669)
    ctx.fillText('腰围|WAIST', 89, 741)
    ctx.fillText(`${bwh[1]}`, 91, 826)
    ctx.fillText('臀围|HIPS', 89, 899)
    ctx.fillText(`${bwh[2]}`, 91, 982)
    ctx.fillText('鞋码|SHOES', 89, 1053)
    ctx.fillText(shoeSize, 92, 1139)
    // 二维码
    ctx.fillRect(59, 1272, 434, 434)
    // 图片1
    imgs[0] && ctx.drawImage(imgs[0], 558, 11, 1158, 1695)
    imgs[1] && ctx.drawImage(imgs[1], 1721, 11, 579, 846)
    imgs[2] && ctx.drawImage(imgs[2], 2304, 11, 579, 846)
    imgs[3] && ctx.drawImage(imgs[3], 1721, 860, 579, 846)
    imgs[4] && ctx.drawImage(imgs[4], 2304, 860, 579, 846)
    imgs[5] && ctx.drawImage(imgs[5], 2888, 11, 1158, 1695)
  }

  drawTypethree(ctx, name, height, weight, bwh, shoeSize, bgcolor, imgs) {
    const { canvasSize } = this.state
    // 背景
    ctx.setFillStyle(bgcolor.value)
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    ctx.setFontSize(60)
    ctx.setFillStyle('#000')
    ctx.setTextAlign('left')
    ctx.setTextBaseline('top')
    ctx.fillRect(807, 110, 225, 6)
    ctx.fillText(name, 831, 24)
    ctx.setFontSize(40)
    ctx.setTextAlign('center')
    ctx.fillText('身高|HEIGHT', 925, 115)
    ctx.fillText(`${height}cm`, 925, 176)
    ctx.fillText('体重|WEIGHT', 925, 226)
    ctx.fillText(`${weight}cm`, 925, 283)
    ctx.fillText('胸围|BUST', 925, 334)
    ctx.fillText(`${bwh[0]}`, 925, 396)
    ctx.fillText('腰围|WAIST', 925, 447)
    ctx.fillText(`${bwh[1]}`, 925, 506)
    ctx.fillText('臀围|HIPS', 925, 557)
    ctx.fillText(`${bwh[2]}`, 925, 615)
    ctx.fillText('鞋码|SHOES', 925, 665)
    ctx.fillText(shoeSize, 925, 725)
    // 二维码
    ctx.fillRect(760, 771, 301, 301)
    // 图片1
    imgs[0] && ctx.drawImage(imgs[0], 1075, 6, 348, 349)
    imgs[1] && ctx.drawImage(imgs[1], 1433, 6, 348, 349)
    imgs[2] && ctx.drawImage(imgs[2], 1791, 6, 348, 349)
    imgs[3] && ctx.drawImage(imgs[3], 2149, 6, 348, 349)
    imgs[0] && ctx.drawImage(imgs[0], 1075, 365, 348, 349)
    imgs[1] && ctx.drawImage(imgs[1], 1433, 365, 348, 349)
    imgs[2] && ctx.drawImage(imgs[2], 1791, 365, 348, 349)
    imgs[3] && ctx.drawImage(imgs[3], 2149, 365, 348, 349)
    imgs[0] && ctx.drawImage(imgs[0], 1075, 724, 348, 349)
    imgs[1] && ctx.drawImage(imgs[1], 1433, 724, 348, 349)
    imgs[2] && ctx.drawImage(imgs[2], 1791, 724, 348, 349)
    imgs[3] && ctx.drawImage(imgs[3], 2149, 724, 348, 349)
    imgs[5] && ctx.drawImage(imgs[5], 6, 6, 740, 1067)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  confirm() {
    this.generateModelCard(this.type)
  }

  cancel() {
    Taro.navigateBack()
  }

  setInfo(key, value) {
    return Object.assign({}, this.state.info, {
      [key]: value
    })
  }

  onNameChange(e) {
    const value = e.detail.value
    this.setState({
      info: this.setInfo('name', value)
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
    const { info, canvasSize } = this.state
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
    const currBgcolor = info['bgcolor'].value
    const bgcolor_value = bgcolors.findIndex(item => item.value === currBgcolor)
    return (
      <View className="page-edit-2">
        <View className="form-item" onClick={this.onClickFormItem.bind(this, 'name')}>
          <View className="form-item-label">姓名</View>
          <View className="form-item-info">
            <Input value={this.dataTrans('name', info['name'])} onChange={this.onNameChange} />
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
        {/* <View className="form-item" onClick={this.onClickFormItem.bind(this, 'qrcode')}>
          <View className="form-item-label">二维码展示</View>
          <View className="form-item-info"></View>
          <View className="form-item-suffix">
            <Image src={CaretRightPng} />
          </View>
        </View> */}
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
        <Canvas canvasId="canvas" style={`width:${canvasSize.width}px; height: ${canvasSize.height}px;position:fixed;left:3000rpx;`} />
      </View>
    )
  }
}
