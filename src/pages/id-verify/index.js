import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import update from 'immutability-helper'
import './index.styl'
import { USER_MODEL_INFO, IMAGE_URL } from '../../lib/constants'
import { api_info_edit, api_info, api_get_uploads } from '../../api'
import { delayToExec, showToast, getUploadResAbsAddress, promisifyUpload } from '../../lib/utils'

export default class IdVerify extends Component {
  state = {
    info: {
      idVerify: {
        isPass: undefined,
        realName: '',
        idcard: '',
        positive: '',
        negative: ''
      }
    },
    changed: {
      positive: false,
      negative: false
    }
  }

  config = {
    navigationBarTitleText: '实名认证'
  }
  componentDidMount() {
    const info = Taro.getStorageSync(USER_MODEL_INFO)
    this.setState({ info })
  }

  submit() {
    const { realName, idcard, positive, negative } = this.state.info.idVerify
    if (!realName || !idcard || !positive || !negative) {
      showToast('请填写必填字段', 'none')
      return
    }
    let { changed } = this.state
    Promise.all([changed.positive ? promisifyUpload(positive) : Promise.resolve(), changed.negative ? promisifyUpload(negative) : Promise.resolve()]).then(res => {
      res[0] && (this.state.info.idVerify.positive = res[0].data)
      res[1] && (this.state.info.idVerify.negative = res[1].data)
      this.edit()
    })
  }

  edit() {
    const { id, idVerify } = this.state.info
    Taro.showLoading()
    api_info_edit({
      id,
      idVerify
    }).then(res => {
      if (res.success) {
        api_info(id).then(res => {
          if (res.success) {
            Taro.hideLoading()
            showToast('保存成功')
            Taro.setStorageSync(USER_MODEL_INFO, res.data)
            delayToExec(Taro.navigateBack)
          }
        })
      }
    })
  }

  handleChange(key, e) {
    this.setState({
      info: update(this.state.info, {
        idVerify: {
          [key]: {
            $set: e.target.value
          }
        }
      })
    })
  }

  selectImg(key) {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setState({
          info: update(this.state.info, {
            idVerify: {
              [key]: {
                $set: res.tempFilePaths[0]
              }
            }
          }),
          changed: update(this.state.changed, {
            [key]: {
              $set: true
            }
          })
        })
      }
    })
  }

  render() {
    const { info } = this.state
    return (
      <View className="page-id-verify">
        <View>
          <View className="form-item">
            <View className="form-item-label">真实姓名</View>
            <Input
              className="form-item-info"
              value={info.idVerify.realName}
              onInput={this.handleChange.bind(this, 'realName')}
            />
            <View className="form-item-suffix" />
          </View>
          <View className="form-item">
            <View className="form-item-label">身份证号</View>
            <Input
              className="form-item-info"
              value={info.idVerify.idcard}
              onInput={this.handleChange.bind(this, 'idcard')}
            />
            <View className="form-item-suffix" />
          </View>
        </View>
        <View className="uploader-wrapper">
          <View className="label">上传身份证</View>
          <Image
            className="uploader"
            src={info.idVerify.positive}
            style="margin-bottom: 10px"
            onClick={this.selectImg.bind(this, 'positive')}
          />
          <Image
            className="uploader"
            src={info.idVerify.negative}
            onClick={this.selectImg.bind(this, 'negative')}
          />
        </View>
        <View className="button" onClick={this.submit}>
          提交认证
        </View>
      </View>
    )
  }
}
