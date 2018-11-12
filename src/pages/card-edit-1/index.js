import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'
import CaretRightPng from '../../images/caret_right.png'
import modelcard1Png from '../../images/modelcard1.png'
import modelcard2Png from '../../images/modelcard2.png'

export default class CardEdit1 extends Component {

  config = {
    navigationBarTitleText: '模卡信息填写'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onClickFormItem(type) {
    let count = type === 1 ? 9 : type === 2 ? 6 : type === 3 ? 9 : 1
    Taro.chooseImage({
      count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length === count) {
          Taro.setStorageSync(type + '$card-edit-photos', tempFilePaths)
          Taro.navigateTo({
            url: `/pages/card-edit-3/index?type=${type}`
          })
        } else {
          Taro.showModal({
            title: '温馨提示',
            content: '请提供模特卡需求的图片数量，在进行下一步。',
            showCancel: false,
            confirmText: '知道啦'
          })
        }
      },
      fail (e) {
        console.log(e)
      }
    })
  }

  render () {
    return (
      <View className='page-card-edit-1'>
        <View className="demo-wrapper" onClick={this.onClickFormItem.bind(this, 1)}>
          <View className="label">模卡一</View>
          <Image src={modelcard1Png} className="demo1" />
        </View>
        {/* <View className="demo-wrapper" onClick={this.onClickFormItem.bind(this, 2)}>
          <View className="label">模卡二</View>
          <View className="demo2">
            <View className="basic-info">
              <View className="name">某某某</View>
              <View className="content">
                <View className="label">身高|HEIGHT</View>
                <View className="value">167cm</View>
                <View className="label">体重|WEIGHT</View>
                <View className="value">45kg</View>
                <View className="label">胸围|BUST</View>
                <View className="value">88</View>
                <View className="label">腰围|WAIST</View>
                <View className="value">88</View>
                <View className="label">臀围|HIPS</View>
                <View className="value">88</View>
                <View className="label">鞋码|SHOES</View>
                <View className="value">34</View>
              </View>
              <View className="qrcode">二维码</View>
            </View>
            <View className="imgs-wrapper">
              <View className="img1">
                <Image src="" />
              </View>
              <View className="img2">
                <Image src="" />
              </View>
              <View className="img3">
                <Image src="" />
              </View>
              <View className="img4">
                <Image src="" />
              </View>
              <View className="img5">
                <Image src="" />
              </View>
              <View className="img6">
                <Image src="" />
              </View>
            </View>
          </View>
        </View> */}
        <View className="demo-wrapper" onClick={this.onClickFormItem.bind(this, 2)}>
          <View className="label">模卡二</View>
          <Image src={modelcard2Png} className="demo2" />
        </View>
      </View>
    )
  }
}

