// 介绍一下MVVM ，分别对应组件的啥

// 面试官说 vm  是 vue实例?????
// 在 Vue.js 中，VM（ViewModel）指的就是 Vue 实例。Vue 实例是 Vue 应用的核心部分，它管理数据、业务逻辑和与视图的绑定。Vue 实例包含了组件的所有选项和方法，并通过响应式系统将数据和视图联系起来。
/**
 * 这样，Vue 实例（VM）在 MVVM 模式中充当了 ViewModel 的角色。
 */

// chatGPT  说的

// Model：由 data 选项定义的 newTodo 和 todos 数组。
// View：由模板部分 <template> 定义的 HTML 结构，使用 Vue 指令（如 v-model、v-for）将数据绑定到视图。
// ViewModel：由组件的 JavaScript 部分（data 和 methods）定义，处理数据和业务逻辑，并通过数据绑定将数据传递给视图。