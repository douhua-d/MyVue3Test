/**
 * 在浏览器加载和解析网页时，HTML、CSS 和 JavaScript 文件的下载和执行顺序有一定的规律和逻辑。了解这个过程对于优化网页性能和确保正确的渲染和交互非常重要。
 *
 * ### 1. HTML 文件的下载和解析
 *
 * 浏览器首先下载并解析 HTML 文件。从上到下逐行解析 HTML 内容，构建 DOM 树（Document Object Model）。
 *
 * ### 2. CSS 文件的下载和解析
 *
 * 当浏览器解析到 `<link>` 标签时，会开始下载指定的 CSS 文件。CSS 文件下载和解析的过程如下：
 *
 * - **下载顺序**：CSS 文件是并行下载的，不会阻塞 HTML 文件的解析，但会阻塞后续 DOM 元素的渲染，因为浏览器需要等待 CSS 解析完成后才能正确渲染页面。
 * - **解析顺序**：CSS 文件解析完毕后，浏览器会构建 CSSOM 树（CSS Object Model），并与 DOM 树合并生成渲染树。
 *
 * ```html
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <link rel="stylesheet" href="styles.css"> <!-- 下载和解析 CSS 文件 -->
 * </head>
 * <body>
 *   <h1>Hello, World!</h1>
 * </body>
 * </html>
 * ```
 *
 * ### 3. JavaScript 文件的下载和执行
 *
 * JavaScript 文件的下载和执行顺序更加复杂，因为它们会直接影响 DOM 的构建和页面的渲染。
 *
 * #### 默认情况下的顺序
 *
 * - **阻塞行为**：当浏览器遇到 `<script>` 标签时，会停止解析 HTML，开始下载并执行 JavaScript 文件。执行完毕后，继续解析 HTML。
 * - **阻塞渲染**：如果 JavaScript 修改了 DOM 或者依赖于 DOM 元素，那么浏览器必须等待 JavaScript 执行完毕后才能继续渲染这些元素。
 *
 * ```html
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <link rel="stylesheet" href="styles.css">
 *   <script src="script.js"></script> <!-- 阻塞 HTML 解析 -->
 * </head>
 * <body>
 *   <h1>Hello, World!</h1>
 * </body>
 * </html>
 * ```
 *
 * #### 异步和延迟执行
 *
 * 为了优化加载性能，可以使用 `async` 和 `defer` 属性来控制 JavaScript 文件的下载和执行顺序：
 *
 * - **async**：JavaScript 文件异步下载并立即执行，下载过程不会阻塞 HTML 解析，但执行会阻塞 HTML 解析。适用于独立的脚本文件，不依赖于其他脚本或 DOM 元素。
 *
 * ```html
 * <script src="script.js" async></script>
 * ```
 *
 * - **defer**：JavaScript 文件异步下载并在 HTML 解析完成后执行，不会阻塞 HTML 解析和渲染。适用于需要在整个文档解析完成后执行的脚本。
 *
 * ```html
 * <script src="script.js" defer></script>
 * ```
 *
 * ### 4. 资源的优先级和并行下载
 *
 * 现代浏览器对资源的下载有一定的并行限制，通常一个域名下并行下载的资源数量限制在 6-8 个文件。同时，浏览器会优先下载 CSS 文件以尽快完成页面的渲染，并优先解析 `defer` 脚本，以减少对页面的阻塞。
 *
 * ### 为什么这样的顺序？
 *
 * - **CSS 优先下载和解析**：CSS 文件必须在渲染之前完成解析，以确保正确的样式应用。如果样式未加载完成，浏览器可能会出现闪烁或重新渲染的情况。
 * - **JavaScript 阻塞解析**：默认情况下，JavaScript 文件可能会修改 DOM 或依赖 DOM 元素，因此浏览器必须在执行 JavaScript 之前停止解析 HTML，确保 JavaScript 能够正确操作 DOM。
 *
 * ### 总结
 *
 * 1. 浏览器首先下载并解析 HTML 文件，构建 DOM 树。
 * 2. 遇到 `<link>` 标签时，浏览器开始下载 CSS 文件，并阻塞渲染直到 CSS 解析完成。
 * 3. 遇到 `<script>` 标签时，浏览器停止解析 HTML，开始下载并执行 JavaScript 文件。
 * 4. 使用 `async` 和 `defer` 属性可以优化 JavaScript 文件的下载和执行顺序，减少对 HTML 解析和页面渲染的阻塞。
 *
 * 通过理解和利用这些机制，可以优化网页的加载性能，提高用户体验。
 */