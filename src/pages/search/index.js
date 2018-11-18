import Taro, { Component } from '@tarojs/taro'
import { View, Input, Icon } from '@tarojs/components'
import ModelCard from '../../components/model-card'
import LoadMore from '../../components/loadmore'
import './index.styl'
import { SEARCH_TAGS, SIZE } from '../../lib/constants'
import { api_models_search } from '../../api'
import { debounce } from '../../lib/utils'
import filters from '../../lib/filter'
import update from 'immutability-helper';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '搜索'
  }

  constructor() {
    super(...arguments)
    this.state = {
      tags: [],
      list: [],
      searchText: '',
      page: 1,
      size: SIZE,
      isDone: false
    }
  }

  componentWillMount() {
    Taro.setStorageSync(SEARCH_TAGS, this.state.tags.length ? this.state.tags : ['跳舞', '唱歌', '美女'])
  }

  componentDidMount() {
    const tags = Taro.getStorageSync(SEARCH_TAGS)
    this.setState({
      tags
    })
  }

  onCardClick(id) {
    Taro.navigateTo({
      url: `/pages/resume/index?id=${id}`
    })
  }

  getData() {
    const { searchText, page, size, list } = this.state
    api_models_search(searchText.trim(), page, size).then(res => {
      if (res.success) {
        let updateState = {
          list: update(page === 1 ? [] : list, {
            $push: res.data.map(item => filters.modelCardDataFilter(item, 'hot'))
          }),
          page: page + 1,
          isDone: page === 1 ? false : res.data.length < size
        }
        this.setState(updateState)
      }
    })
  }

  onConfirm = () => {
    this.getData()
  }

  debouncer = debounce(this.onConfirm, 300)

  onInput(e) {
    this.setState(
      {
        searchText: e.target.value,
        page: 1
      },
      this.debouncer
    )
  }

  onTagClick(tag) {
    this.setState(
      {
        searchText: tag,
        page: 1
      },
      this.onConfirm
    )
  }

  onReachBottom() {
    this.state.isDone || this.getData()
  }

  render() {
    const { searchText, list, tags } = this.state
    return (
      <View className="search">
        <View className="search_input">
          <Input focus={true} placeholder="请输入你想要的内容" value={searchText} onInput={this.onInput.bind(this)} />
          <Icon size="19" type="search" />
        </View>
        {!list.length && (
          <View className="help-wrapper">
            {tags.map((tag, key) => {
              return (
                <View key={key} onClick={this.onTagClick.bind(this, tag)}>
                  {tag}
                </View>
              )
            })}
          </View>
        )}
        <View className="models-wrapper">
          {list.map((model, index) => {
            return (
              <ModelCard className="model" model={model} key={index} onClick={this.onCardClick.bind(this, model.id)} />
            )
          })}
        </View>
        {!isDone && list.length > 0 && <LoadMore />}
      </View>
    )
  }
}
