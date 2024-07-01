// 总结
// Loader：专注于将文件从一种格式转换为另一种格式，主要作用于单个文件层面。配置时通过 module.rules 指定。
// Plugin：扩展 Webpack 的功能，在构建过程的各个阶段执行自定义操作。配置时通过 plugins 指定。
// 两者共同作用，使 Webpack 成为一个强大且灵活的模块打包工具。


/**
 * Loader
 * 功能
 * Loader 用于转换模块的源代码。它们使得 Webpack 可以处理非 JavaScript 文件（如 CSS、图片、字体、TypeScript、SASS 等），并将它们转换为可以直接在项目中使用的模块。
 *
 * 用途
 * 预处理文件：如将 TypeScript 转换为 JavaScript，将 SCSS 转换为 CSS。
 * 转换文件：如将 ES6+ 代码转换为 ES5，或者将 JSX 转换为 JavaScript。
 * 加载资源：如将图片文件转换为 base64 格式的字符串或打包到输出目录。
 * 工作原理
 * Loader 是普通的 JavaScript 函数，接受源文件内容作为输入，返回转换后的内容。它们是链式调用的，可以串联多个 loader 对文件进行逐步处理。
 *
 * 常见的 Loader
 * babel-loader: 使用 Babel 转换 ES6+ 代码为 ES5。
 * ts-loader: 将 TypeScript 转换为 JavaScript。
 * css-loader: 处理 CSS 文件中的 @import 和 url()。
 * style-loader: 将 CSS 注入到 DOM 中。
 * sass-loader: 将 SASS/SCSS 转换为 CSS。
 * file-loader: 将文件复制到输出目录，并返回其 URL。
 * url-loader: 类似于 file-loader，但可以将小文件转换为 base64 内联字符串。
 * vue-loader: 处理 .vue 文件。
 */

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  }
};


/**
 * Plugin
 * 功能
 * Plugin 用于扩展 Webpack 的功能。它们可以在编译过程的不同阶段对输出结果进行自定义处理，从而实现更广泛的功能，如打包优化、资源管理、环境变量注入等。
 *
 * 用途
 * 资源管理：如清理输出目录，提取 CSS 文件。
 * 编译优化：如压缩 JavaScript 和 CSS 文件。
 * 环境变量：如注入环境变量到代码中。
 * 构建过程中的事件钩子：如在编译前、编译后执行特定操作。
 * 工作原理
 * Plugin 是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 Webpack Compiler 调用，并将 compiler 对象作为参数传入。Plugin 可以通过 compiler 对象挂载到 Webpack 的各个钩子上，从而在构建的不同阶段执行自定义操作。
 *
 * 常见的 Plugin
 * CleanWebpackPlugin: 清理输出目录。
 * HtmlWebpackPlugin: 生成 HTML 文件，并自动引入打包后的资源。
 * MiniCssExtractPlugin: 将 CSS 提取为独立的文件。
 * DefinePlugin: 注入环境变量。
 * UglifyJsPlugin: 压缩 JavaScript 代码。
 * OptimizeCSSAssetsPlugin: 压缩 CSS 代码。
 * CopyWebpackPlugin: 复制文件到输出目录。
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};

