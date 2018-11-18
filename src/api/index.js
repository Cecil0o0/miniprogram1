import fetch from '../lib/fetch'
import { SIZE, LOGIN_STATUS } from '../lib/constants'
import Taro from '@tarojs/taro'

/* eslint-disable-next-line */
const prefix = URL_PREFIX + '/v1'

export const api_banners = () => {
  return fetch({
    url: `${prefix}/banners`
  })
}

export const api_info = (id) => {
  return fetch({
    url: `${prefix}/model/${id}`
  })
}

export const api_info_edit = (data) => {
  return fetch({
    url: `${prefix}/model`,
    method: 'PUT',
    data
  })
}

export const api_advice_add = data => {
  return fetch({
    url: `${prefix}/advice`,
    method: 'POST',
    data
  })
}

// 以逗号分割的字符串
export const api_get_uploads = ids => {
  return fetch({
    url: `${prefix}/upload/${ids}`,
    method: 'GET'
  })
}

export const api_login = code => {
  return fetch({
    url: `${prefix}/login`,
    method: 'POST',
    data: { code }
  })
}

export const api_home_models = ({ type = 'hot', page = 1, size = SIZE}) => {
  return fetch({
    url: `${prefix}/model/${type}`,
    data: {
      page,
      size
    }
  })
}

export const api_model_hot = (modelId) => {
  return fetch({
    url: `${prefix}/hf/hot`,
    data: {
      modelId
    }
  })
}

// 关注
export const api_user_attention = ({ modelId }) => {
  const userId = Taro.getStorageSync(LOGIN_STATUS).id
  return fetch({
    url: `${prefix}/hf/addAttention`,
    method: 'POST',
    data: {
      modelId,
      userId
    }
  })
}

// 取消关注
export const api_user_remove_attention = (modelId) => {
  const userId = Taro.getStorageSync(LOGIN_STATUS).id
  return fetch({
    url: `${prefix}/hf/removeAttention`,
    method: 'POST',
    data: {
      modelId,
      userId
    }
  })
}

export const api_user_if_follow = (modelId) => {
  const userId = Taro.getStorageSync(LOGIN_STATUS).id
  return fetch({
    url: `${prefix}/hf/getIfAttention?userId=${userId}&modelId=${modelId}`,
  })
}

export const api_get_partical_models = (ids) => {
  return fetch({
    url: `${prefix}/models`,
    method: 'POST',
    data: {
      ids
    }
  })
}

export const api_models_search = (text, page, size = SIZE) => {
  return fetch({
    url: `${prefix}/search/models?text=${text}&page=${page}&size=${size}`
  })
}