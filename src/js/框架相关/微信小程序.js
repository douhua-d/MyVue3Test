/**
 * 小程序与普通网页开发的区别
 * 小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。
 * 这一区别导致了前端开发非常熟悉的一些库，例如 jQuery、 Zepto 等，在小程序中是无法运行的。
 * 同时 JSCore 的环境同 NodeJS 环境也是不尽相同，所以一些 NPM 的包在小程序中也是无法运行的。
 */

// 渲染层和逻辑层
// 首先，我们来简单了解下小程序的运行环境。小程序的运行环境分成渲染层和逻辑层，其中 WXML 模板和 WXSS 样式工作在 【渲染层】，
// JS 脚本工作在逻辑层。

// 在原生微信小程序的 JS 中，不能直接操作 DOM 元素。
// 这是因为微信小程序的架构设计不同于传统的 Web 应用。下面是原因和微信小程序的架构设计解释。
/**
 * 微信小程序的架构设计
 * 微信小程序采用了一种与传统 Web 不同的双线程模型，主要分为逻辑层和视图层：
 *
 * 逻辑层（App Service）：
 *
 * 逻辑层运行在 JavaScriptCore 中，负责处理数据、业务逻辑和网络请求等。
 * 逻辑层没有直接的 DOM API，因为它与视图层是分离的。
 * 视图层（View）：
 *
 * 视图层运行在 WebView 中，负责渲染页面。
 * 视图层使用 WXML 和 WXSS 来描述页面结构和样式，类似于 HTML 和 CSS。
 * 数据传递
 * 逻辑层和视图层之间通过数据传递和事件机制进行通信：
 *
 * setData 方法：逻辑层通过 setData 方法将数据传递给视图层，视图层根据数据更新页面。
 * 事件：用户在视图层上的交互会通过事件传递到逻辑层，逻辑层处理这些事件并可能通过 setData 更新视图。
 */

// 为什么不能直接操作 DOM
/**
 * 由于逻辑层和视图层分离，逻辑层没有直接访问 DOM 的能力。
 * 微信小程序的设计意图是让开发者专注于数据和逻辑，通过数据驱动视图的更新，而不是直接操作 DOM 元素。这种设计有几个优点：
 *
 * 性能：数据和视图分离可以更高效地更新视图，避免频繁的 DOM 操作带来的性能问题。
 * 安全性：限制对 DOM 的直接操作可以增强安全性，避免一些潜在的跨站脚本攻击（XSS）。
 * 开发体验：开发者可以专注于数据和业务逻辑，不需要处理复杂的 DOM 操作。
 * 替代方案
 * 虽然不能直接操作 DOM，但微信小程序提供了丰富的组件和 API，可以满足大多数需求。以下是一些替代方案：
 * 使用 WXML 和 WXSS：
 *
 * 通过 WXML 定义页面结构。
 * 通过 WXSS 定义页面样式。
 * 使用 setData 更新视图：
 *
 * 使用 setData 方法将逻辑层的数据传递到视图层，触发视图更新。
 */


// 即使使用 UniApp 等框架，由于微信小程序的运行环境限制，仍然不能直接操作 DOM。这是因为：
// 
// 双线程架构：逻辑层和视图层分离，逻辑层无法直接访问视图层的 DOM。
// 性能和安全考虑：避免频繁的 DOM 操作带来的性能开销和潜在的安全风险。