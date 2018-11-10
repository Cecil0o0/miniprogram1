import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import update from 'immutability-helper'
import './index.styl'
import { USER_MODEL_INFO } from '../../lib/constants'
import { uploadFiles, getUploadResAbsAddress, delayToExec, showToast } from '../../lib/utils'
import { api_info_edit, api_info } from '../../api'

export default class InfoPhotoEdit extends Component {
  state = {
    isEdit: false,
    selected: [],
    imgs: [],
    type: 1
  }

  componentWillMount() {
    // 1为poster
    // 2为photo
    this.state.type = this.$router.params.type || 1
    Taro.setNavigationBarTitle({
      title: this.state.type === '1' ? '海报编辑' : '相册编辑'
    })
  }

  getAttr() {
    return this.state.type === '1' ? 'posters' : 'photos'
  }

  componentDidMount(params) {
    let info = Taro.getStorageSync(USER_MODEL_INFO)
    this.setState({
      imgs: info[this.getAttr()]
    })
  }

  delete() {
    let deleteIndexes = this.state.selected.map(item => ([this.state.imgs.findIndex(img => img.id === item), 1]))
    this.setState({
      imgs: update(this.state.imgs, {
        $splice: deleteIndexes
      }),
      selected: [],
      isEdit: false
    })
  }

  complete() {
    // 非常复杂的上传操作
    let info = Taro.getStorageSync(USER_MODEL_INFO)
    let uploadedFiles = this.state.imgs.filter(item => item.type === 'new')
    Taro.showLoading('正在上传')
    uploadFiles(uploadedFiles.map(item => item.src)).then(res => {
      const indexes = res.map((resItem, index) => {
        return this.state.imgs.findIndex(item => item.src === uploadedFiles[index].src)
      })
      let obj = {}
      indexes.forEach((item, index) => {
        obj[item] = {
          $set: {
            src: res[index].data
          }
        }
      })
      this.setState({
        imgs: update(this.state.imgs, obj)
      }, () => {
        Taro.showLoading('正在保存')
        // 保存信息
        api_info_edit({
          id: info.id,
          [this.getAttr()]: this.state.imgs
        }).then(res => {
          const info = Taro.getStorageSync(USER_MODEL_INFO)
          Taro.setStorageSync(USER_MODEL_INFO, Object.assign(info, {[this.getAttr()]: this.state.imgs}))
          showToast('保存成功')
          delayToExec(Taro.navigateBack)
        })
      })
    })
  }

  add() {
    wx.chooseImage({
      count: 9 - this.state.imgs.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setState({
          imgs: update(this.state.imgs, {
            $push: tempFilePaths.map(item => ({
              type: 'new',
              src: item
            }))
          })
        })
      }
    })
  }

  itemClick(src, isSelected) {
    if (!this.state.isEdit) return
    if (isSelected) {
      const index = this.state.selected.findIndex(item => item === src)
      this.setState(
        update(this.state, {
          selected: {
            $splice: [[index, 1]]
          }
        })
      )
    } else {
      this.setState(
        update(this.state, {
          selected: {
            $push: [src]
          }
        })
      )
    }
  }

  editPhoto(src) {
    this.setState(
      update(this.state, {
        isEdit: {
          $set: true
        },
        selected: {
          $push: [src]
        }
      })
    )
  }

  render() {
    const { imgs, isEdit, selected } = this.state
    return (
      <View className="photo-edit">
        <View className="header">长按图片编辑</View>
        <View className="img-wrapper">
          {imgs.map((item, key) => {
            const isSelected = selected.indexOf(item.src) !== -1
            return (
              <View
                key={key}
                className="item"
                style={{ backgroundImage: `url("${item.src}")` }}
                onLongPress={this.editPhoto.bind(this, item.src)}
                onClick={this.itemClick.bind(this, item.src, isSelected)}
              >
                {isEdit &&
                  (isSelected ? <View className="checked" /> : <View className="uncheck" />)}
              </View>
            )
          })}
          {imgs.length < 9 && (
            <View className="uploader" onClick={this.add}>
              +
            </View>
          )}
        </View>
        {isEdit && (
            <View className="cancelBtn" onClick={this.delete}>
              删除选中照片
            </View>
          )}
        <View className="confirmBtn" onClick={this.complete}>
          完成
        </View>
      </View>
    )
  }
}
