import HeartPng from '../images/heart.png'
import MoneyBagPng from '../images/money_bag.png'

export default {
  modelCardDataFilter: function modelCardDataFilter(srcModelData, type = 'sponsor') {
    return {
      id: srcModelData.id,
      num: type === 'sponsor' ? srcModelData.subscribe : srcModelData.popularity,
      imgSrc: srcModelData.cover,
      name: srcModelData.name,
      height: srcModelData.height,
      weight: srcModelData.weight,
      text: type === 'sponsor' ? '赞助值' : '人气值',
      icon: type === 'sponsor' ? MoneyBagPng : HeartPng
    }
  }
}
