import fetch from '../lib/fetch'
import { SIZE } from '../lib/constants'

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

export const api_model_sponsor = (modelId) => {
  return fetch({
    url: `${prefix}/hf/sponsor`,
    data: {
      modelId
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