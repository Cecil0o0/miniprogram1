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