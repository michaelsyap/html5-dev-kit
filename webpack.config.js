const path = require('path')
const pages = require('./pages')

module.exports = {
	entry: {
    ...pages.reduce((prev, next) => {
      return {
        ...prev,
        [next.entryName]: next.entryScript
      }
    }, {})
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, "src/assets")
    }
  },
}
