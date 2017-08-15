const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [path.join(__dirname, 'index.js')],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Overlay Bug'
    })
  ],
  devServer: {
    contentBase: false,
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/',
    https: true,
    hot: true,
    hotOnly: true
  },
  output: {
    filename: '[name].js',
    path: '/'
  },
  performance: {
    // hints: false
    hints: "warning"
  }  
}