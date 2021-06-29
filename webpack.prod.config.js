const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { merge } = require('webpack-merge')
const common = require('./webpack.config')
const pages = require('./pages')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              publicPath: (url, resourcePath, context) => {
                if(/cssbg-/.test(resourcePath)) {
                  return `../img/${url}`;
                }
                return `img/${url}`;
              },
              options: {
                name: '[name].[ext]',
              },
            }
          }
        ]
      },
      {
        //This is a regex of file extensions for fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'css/fonts',
              publicPath: 'fonts'
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ...pages.map((page) => {
      return new HtmlWebpackPlugin({
        chunks: [page.entryName],
        inject: false,
        filename: page.htmlFile,
        template: page.htmlTemplate,
        minify: false
      })
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./"
  },
})