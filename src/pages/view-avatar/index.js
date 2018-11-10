import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'
import { promisifyUpload, delayToExec, showToast } from '../../lib/utils'
import { USER_MODEL_INFO } from '../../lib/constants'
import { api_info_edit } from '../../api'

export default class ViewAvatar extends Component {
  config = {
    navigationBarTitleText: '更换头像'
  }

  state = {
    info: {
      avatar: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
    }
  }

  componentDidMount() {
    this.setState({
      info: Taro.getStorageSync(USER_MODEL_INFO)
    })
  }

  selectImg() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setState({
          info: Object.assign({}, this.state.info, {
            avatar: res.tempFilePaths[0]
          })
        })
      }
    })
  }

  upload() {
    promisifyUpload(this.state.info.avatar).then(res => {
      const { id, avatar } = this.state.info
      api_info_edit({
        id,
        avatar
      }).then(res => {
        if (res.success) {
          Taro.setStorageSync(USER_MODEL_INFO, this.state.info)
          showToast('保存成功')
          delayToExec(() => Taro.navigateBack())
        }
      })
    })
  }

  cancel() {
    Taro.navigateBack({ delta: 1 })
  }

  render() {
    return (
      <View className="view-avatar">
        <View style={{backgroundImage: `url("${this.state.info.avatar}")`}} className="img" onClick={this.selectImg} />
        <View className="upload-btn" onClick={this.upload}>
          更换头像
        </View>
        <View className="confirm-btn" onClick={this.cancel}>
          取消
        </View>
      </View>
    )
  }
}
