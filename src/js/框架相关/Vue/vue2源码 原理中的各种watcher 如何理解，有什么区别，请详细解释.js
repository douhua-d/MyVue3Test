/**
 * 在 Vue 2 中，watcher 是 Vue 响应式系统的核心概念之一。watcher 实际上是一种观察者，用于观察某个数据的变化，并在数据变化时触发相应的回调。
 * Vue 2 中有几种不同类型的 watcher，每种都有特定的用途和工作原理。
 */

// Vue 2 中的三种主要 watcher
// 渲染 watcher（Render Watcher）
// 计算属性 watcher（Computed Watcher）
// 用户 watcher（User Watcher）


//1. 渲染 watcher（Render Watcher）
// 渲染 watcher 是最常见的 watcher，它在组件实例化时被创建，用于追踪组件的渲染函数。每当组件的响应式数据变化时，渲染 watcher 会重新计算渲染函数，从而触发组件的重新渲染。
// 
// 创建：在每个 Vue 实例的初始化过程中，会为该实例创建一个渲染 watcher。
// 作用：当依赖的数据变化时，触发组件的重新渲染

// 工作原理
// watcher 依赖于 Vue 的响应式系统，通过 Dep（依赖收集器）和 Observer（数据观察者）实现。以下是 watcher 工作的基本流程：
// 
// 依赖收集：
// 
// 当 watcher 依赖的数据被读取时，触发数据的 getter 方法。
// getter 方法会调用 Dep 的 depend 方法，将当前的 watcher 添加到依赖列表中。
// 触发更新：
// 
// 当依赖的数据发生变化时，触发数据的 setter 方法。
// setter 方法会调用 Dep 的 notify 方法，通知所有依赖该数据的 watcher 进行更新。
// 更新处理：
// 
// watcher 在收到更新通知后，会执行相应的回调函数，如重新渲染组件或重新计算计算属性的值。


/**
 * watch 的原理 
 * https://blog.csdn.net/tq26556570/article/details/107615147
 */

// Vue的watcher分成了computed-watcher、user-watcher、render-watcher三个类型
// computed-watcher是解析用户定义的计算属性computed时会产生的watcher
// 模板编译时，给属性添加的watcher会自动绑定一个视图响应式更新的方法，就是render-watcher
// 而这里的watcher是用户自定义的侦听器，所以定义为   user-watcher
options.user = true
// 侦听器实际上就是实例化的一个订阅者Watcher
// 只不过回调函数时用户自定义的handler
const watcher = new Watcher(vm, expOrFn, cb, options);

// 执行顺序时computed-watcher->user-watcher->render-watcher