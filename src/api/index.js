import fetch from '../lib/fetch'

/* eslint-disable-next-line */
const prefix = URL_PREFIX
const version = '/v1'

export const home = {
  getSwipers: fetch({
    url: `${prefix}${version}/home/swipers`
  })
}

export const info = {}
