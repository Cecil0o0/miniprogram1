import fetch from '../lib/fetch'

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