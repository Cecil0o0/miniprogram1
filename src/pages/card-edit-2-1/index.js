import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'

export default class CardEdit21 extends Component {

  config = {
    navigationBarTitleText: '模卡制作'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-edit-2-1'>
        <View className="basic-info">

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

