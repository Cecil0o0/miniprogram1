import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'

export default class CardEdit22 extends Component {
  config = {
    navigationBarTitleText: '模卡制作'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="page-edit-2-2">
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
    )
  }
}
