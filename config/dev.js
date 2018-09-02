/* eslint-disable-next-line */
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    URL_PREFIX: '"http://localhost:3000"'
  },
  weapp: {},
  h5: {
    devServer: {
      port: 9000
    },
    https: true
  }
}
