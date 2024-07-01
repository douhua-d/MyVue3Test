/**
 * 在前端部署后，浏览器可能会缓存旧版本的文件，从而导致用户无法看到最新的更新。
 * 以下是一些常见的方法来解决这个问题：
 */

// 1. 文件名哈希（Cache Busting）
// 通过在文件名中添加哈希值来强制浏览器下载最新的文件。这通常在构建过程中自动完成。
// 
// 使用 Webpack 进行哈希处理
module.exports = {
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  }
  // 其他配置
};
// 这样生成的文件名将包含一个基于文件内容的哈希值，例如 main.1a2b3c4d.js。
// 当文件内容改变时，哈希值也会改变，浏览器将下载新文件。
// 由于哈希值变化后文件名也会变化，浏览器将其视为一个新的 URL。例如：
// 
// 原始文件名：main.1a2b3c4d.js
// 更新后文件名：main.2b3c4d5e.js
// 尽管两者的基本文件名是相同的，但因为哈希值不同，浏览器认为这是两个不同的文件，因此在请求 main.2b3c4d5e.js 时，缓存中不存在这个文件，于是浏览器会下载新的文件。
/**
 * Webpack 插件的应用
 * 在实际应用中，我们通常会使用一些 Webpack 插件来自动管理这些哈希文件名和 HTML 文件的引用。
 * 例如，HtmlWebpackPlugin 插件可以帮助我们自动更新 HTML 文件中引用的资源路径：
 * const HtmlWebpackPlugin = require('html-webpack-plugin');
 *
 * module.exports = {
 *   // ...其他配置
 *   plugins: [
 *     new HtmlWebpackPlugin({
 *       template: './src/index.html'
 *     })
 *   ]
 * };
 * @type {string}
 */



// 2. 使用 Service Workers
// Service Workers 可以控制缓存策略，确保用户始终获得最新的文件。


// 3. 版本号查询参数
// 在静态文件请求中添加版本号查询参数，每次更新时改变版本号。
// 
// HTML 文件
// <link rel="stylesheet" href="/styles.css?v=1.0.1">
// <script src="/main.js?v=1.0.1"></script>
// 每次部署时更新版本号 v=1.0.1，浏览器将认为这是一个新请求并重新下载文件。



// 4. HTTP 头部缓存控制
// 通过设置适当的 HTTP 头部来控制缓存行为。
// 
// 设置 Cache-Control 头部
// 在服务器配置中，设置 Cache-Control 头部，例如使用 nginx：
// location / {
//   add_header Cache-Control "no-cache, no-store, must-revalidate";
//   try_files $uri $uri/ /index.html;
// }


// 5. 清理缓存策略
// 在特定情况下，可以强制用户清理缓存或重新加载页面，例如在检测到新版本时。
// 
// 检测新版本并提示用户
const version = '1.0.1';
const storedVersion = localStorage.getItem('appVersion');

if (storedVersion !== version) {
  localStorage.setItem('appVersion', version);
  window.location.reload(true); // 强制刷新页面，清理缓存
}


