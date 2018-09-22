import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'
import CaretRightPng from '../../images/caret_right.png'

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
    Taro.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        Taro.setStorageSync(type + '$card-edit-photos', tempFilePaths)
        Taro.navigateTo({
          url: `/pages/card-edit-3/index?type=${type}`
        })
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
          <View className="demo1">
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
        </View>
        <View className="demo-wrapper" onClick={this.onClickFormItem.bind(this, 1)}>
          <View className="label">模卡二</View>
          <View className="demo1">
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
        </View>
        <View className="demo-wrapper" onClick={this.onClickFormItem.bind(this, 1)}>
          <View className="label">模卡三</View>
          <View className="demo1">
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
        </View>
      </View>
    )
  }
}

