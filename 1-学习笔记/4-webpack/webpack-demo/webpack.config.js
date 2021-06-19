const path = require('path')   ////导入node.js中专门操作路径的模块
//导入生成预览页面的擦火箭，得到一个构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({   //创建插件的实例对象
  template: './src/index.html',    //指定要用到的模板文件
  filename: 'index.html'   //指定生成的文件的名称，该文件存在于内存中，在目录中不显示
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development', //mode用来指定构建模式
  entry: path.join(__dirname, './src/index.js'),  //打包入口文件的路径
  output: {
    path: path.join(__dirname, './dist'),  //输出文件的的存放路径
    filename: 'bundle.js',  //输出文件的名称
    
  },
  plugins: [    //plugins 数组是 webpack 打包期间会用到的一些插件列表
     htmlPlugin,
     new VueLoaderPlugin(),
    ],      

  //所有第三方文件模块的匹配规则
  module: {
    rules: [
      { 
        test: /\.css|\.less|\.scss$/, 
        use: ['style-loader', 'css-loader','postcss-loader','less-loader','sass-loader'] 
      },
      
      // { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // { test: /\.scss$/, use: ['style-loader', 'css-loader','postcss-loader', 'sass-loader'] },
      {
        test: /\.jpg|gif|png|bmp|tf|eot|svg|woff|woff2$/,
        use: 'url-loader?limit=16940'
      },
      {
        test: /\.js$/,
        use: 'babel-loader', exclude: /node_modules/
      },
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      }
    ],
  }
}