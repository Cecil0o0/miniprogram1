import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'
import { promisifyUpload, delayToExec, showToast } from '../../lib/utils'
import { USER_MODEL_INFO } from '../../lib/constants'
import { api_info_edit } from '../../api'

export default class ViewPoster extends Component {
  config = {
    navigationBarTitleText: '更换封面图片'
  }

  state = {
    info: {
      cover: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
    }
  }

  componentDidMount() {
    this.setState({
      info: Taro.getStorageSync(USER_MODEL_INFO)
    })
  }

  selectImg = () => {
    return new Promise(resolve => {
      Taro.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.setState({
            info: Object.assign({}, this.state.info, {
              cover: res.tempFilePaths[0]
            })
          }, resolve)
        }
      })
    })
  }

  upload = () => {
    promisifyUpload(this.state.info.cover).then(res => {
      const { id } = this.state.info
      api_info_edit({
        id,
        cover: res.data
      }).then(res => {
        if (res.success) {
          Taro.setStorageSync(USER_MODEL_INFO, this.state.info)
          showToast('保存成功')
          delayToExec(() => Taro.navigateBack())
        }
      })
    })
  }

  selectImgAndUpload() {
    this.selectImg().then(this.upload)
  }

  cancel() {
    Taro.navigateBack({ delta: 1 })
  }

  render() {
    return (
      <View className="view-poster">
        <View style={{ backgroundImage: `url("${this.state.info.cover}")` }} className="img" />
        <View className="btn-wrapper">
          <View className="upload-btn" onClick={this.selectImgAndUpload}>
            更换封面图片
          </View>
          <View className="confirm-btn" onClick={this.cancel}>
            取消
          </View>
        </View>
      </View>
    )
  }
}
