const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path:path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: 'dist/',    // url添加dist路径(因为index.html通过HtmlWebpackPlugin插件生成在dist文件中，所以资源不需要加dist路径)
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',   //图片小于limit会生成base64图片，大于limit会生成图片文件在dist目录下
            options: {
              limit: 8192,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },

  resolve:{
    // alias: 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  plugins:[
    new webpack.BannerPlugin('侃侃的webpack学习demo\n'+ new Date()),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new UglifyjsWebpackPlugin()
  ],

  devServer: {
    contentBase: './dist',
    inline: true,

  }
}