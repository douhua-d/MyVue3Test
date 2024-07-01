//首屏优化（First Screen Optimization）是指优化网页在用户首次加载时的速度和性能，以便尽快显示页面内容，提升用户体验。以下是一些常见的首屏优化方法：
// 
// ### 1. 资源压缩与合并
// 
// #### 压缩
// - **压缩 HTML、CSS 和 JavaScript**：使用工具如 `html-minifier`、`cssnano` 和 `Terser` 来压缩代码，减少文件大小。
// - **图像压缩**：使用工具如 `ImageOptim`、`TinyPNG` 或 `imagemin` 来压缩图像文件，减少其大小。
// 
// #### 合并
// - **合并 CSS 和 JavaScript 文件**：减少 HTTP 请求的数量。可以通过 Webpack 或 Gulp 等构建工具来实现文件合并。
// 
// ### 2. 资源加载优化
// 
// #### 延迟加载
// - **延迟加载非关键 CSS 和 JavaScript**：使用 `async` 或 `defer` 属性来异步加载非关键脚本，避免阻塞渲染。
// - **懒加载图片和视频**：使用 `loading="lazy"` 属性或 JavaScript 库（如 `lazysizes`）来懒加载图像和视频。
// 
// #### 预加载和预获取
// - **预加载关键资源**：使用 `<link rel="preload">` 标签来预加载关键资源（如字体、CSS 和 JavaScript）。
// - **预获取资源**：使用 `<link rel="prefetch">` 标签来预获取未来可能需要的资源。
// 
// ### 3. 代码分割
// 
// - **代码分割**：使用 Webpack 等工具进行代码分割，将应用程序分割成更小的代码块。只加载当前页面需要的代码，避免一次性加载整个应用。
// - **按需加载**：通过动态 `import()` 语法实现按需加载模块。
// 
// ### 4. 优化关键渲染路径
// 
// - **优化 CSS 和 JavaScript 的位置**：将关键 CSS 放在 `<head>` 中，将非关键 JavaScript 放在 `<body>` 底部或使用 `async` 和 `defer` 属性。
// - **减少关键资源的大小和数量**：尽量减少首屏渲染所需的 CSS 和 JavaScript 资源。
// 
// ### 5. 服务端优化
// 
// - **使用 HTTP/2**：启用 HTTP/2 以实现多路复用和头部压缩，提高资源加载速度。
// - **启用 Gzip 或 Brotli 压缩**：通过服务器配置启用 Gzip 或 Brotli 压缩，减少传输数据量。
// - **服务端渲染（SSR）**：对于单页应用（SPA），使用服务端渲染技术（如 Next.js、Nuxt.js）将首屏内容预先渲染在服务器上，提高首屏加载速度。
// 
// ### 6. 缓存与 CDN
// 
// - **使用缓存**：设置合理的缓存策略，利用浏览器缓存来减少重复请求。使用 `Cache-Control` 和 `ETag` 头部。
// - **使用 CDN**：将静态资源托管在内容分发网络（CDN）上，利用其全球分布的节点加速资源加载。
// 
// ### 7. 优化字体加载
// 
// - **使用字体显示策略**：使用 `font-display` CSS 属性（如 `font-display: swap;`）来控制字体加载时的行为，避免文字不可见。
// - **减少字体种类和权重**：仅加载首屏需要的字体种类和权重，减少字体文件大小。
// 
// ### 8. 减少重排和重绘
// 
// - **最小化重排和重绘**：减少或避免导致重排（Reflow）和重绘（Repaint）的操作，使用 CSS 动画代替 JavaScript 动画，避免频繁的 DOM 操作。
// 
// ### 示例配置
// 
// 以下是一个基于 Webpack 的简单示例配置，展示了如何进行资源压缩、代码分割和懒加载：
// 

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name].[hash].[ext]",
              outputPath: "images"
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ]
};

// 通过以上方法，可以显著优化网页的首屏加载速度，提高用户体验。