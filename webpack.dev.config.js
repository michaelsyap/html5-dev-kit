const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.config')
const pages = require('./pages')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        //This is a regex of file extensions for fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    ...pages.map((page) => {
      return new HtmlWebpackPlugin({
        chunks: [page.entryName],
        inject: false,
        filename: page.htmlFile,
        template: page.htmlTemplate,
      })
    })
  ],
  output: {
    filename: '[name].bundle.js',
    publicPath: '/'
  },
})
