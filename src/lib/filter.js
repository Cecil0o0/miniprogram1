export default {
  expType(idx) {
    if (idx !== +idx) return 'expType参数错误'
    return ['', '电影'][idx]
  }
}