import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import update from 'immutability-helper'
import './index.styl'

export default class InfoPhotoEdit extends Component {
  config = {
    navigationBarTitleText: '相册编辑'
  }

  state = {
    isEdit: false,
    selected: [],
    imgs: [
      {
        id: 1,
        src: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
      },
      {
        id: 2,
        src: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
      },
      {
        id: 3,
        src: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
      },
      {
        id: 4,
        src: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
      },
      {
        id: 5,
        src: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
      },
      {
        id: 6,
        src: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
      },
      {
        id: 7,
        src: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
      },
      {
        id: 8,
        src: 'http://t2.hddhhn.com/uploads/tu/20150402/220ZQ614-0.jpg'
      }
    ]
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  delete() {
    console.log('delete')
  }

  complete() {
    console.log('complete')
  }

  upload() {
    console.log('upload')
  }

  itemClick(id, isSelected) {
    if (!this.state.isEdit) return
    if (isSelected) {
      const index = this.state.selected.findIndex(item => item === id)
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
            $push: [id]
          }
        })
      )
    }
  }

  editPhoto(id) {
    this.setState(
      update(this.state, {
        isEdit: {
          $set: true
        },
        selected: {
          $push: [id]
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
            const isSelected = selected.indexOf(item.id) !== -1
            return (
              <View
                key={key}
                className="item"
                style={{ backgroundImage: `url("${item.src}")` }}
                onLongPress={this.editPhoto.bind(this, item.id)}
                onClick={this.itemClick.bind(this, item.id, isSelected)}
              >
                {isEdit &&
                  (isSelected ? <View className="checked" /> : <View className="uncheck" />)}
              </View>
            )
          })}
          {imgs.length < 9 && (
            <View className="uploader" onClick={this.upload}>
              +
            </View>
          )}
        </View>
        {isEdit &&
          selected.length > 0 && (
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
