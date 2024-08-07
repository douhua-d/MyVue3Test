/**
 * vue2的computed缓存的是什么是计算后的值还是依赖的值？
 *
 * 在 Vue 2 中，computed 属性缓存的是计算后的值，而不是依赖的值
 *
 *
 * 在 Vue 2 中，computed 属性缓存的是计算后的值，而不是依赖的值。
 *
 * 当你定义一个 computed 属性时，Vue 会根据依赖的属性（即 computed 属性内部使用的那些响应式数据）来计算这个 computed 属性的值，并将其缓存起来。只有当这些依赖的属性发生变化时，Vue 才会重新计算 computed 属性的值，并更新缓存。
 *
 * 这样做的好处是，如果你的 computed 属性依赖的值没有
 *
 * new Vue({
 *   data: {
 *     a: 1,
 *     b: 2
 *   },
 *   computed: {
 *     sum() {
 *       return this.a + this.b;
 *     }
 *   }
 * });
 */

// 如果a变为2 b变为1，总的和其实没变的这种情况会重新计算计算属性吗？页面会重新渲染吗?
// 会重新计算 ，结算的结果值前后没有变化，所以页面不会重新渲染

// 所以是页面不会重新渲染但是计算属性会重新计算  --是的 我在vue2中具体试过了！！！！！
/**
 * 计算属性重新计算：当依赖的响应式数据发生变化时，即使计算属性的前后值没有变化，Vue 仍然会重新计算这个计算属性的值。这是因为 Vue 需要确保计算属性的值始终是最新的，并且在重新计算时会重新追踪依赖关系。
 *
 * 页面不会重新渲染：即使计算属性重新计算了，但如果计算属性的前后值没有变化，Vue 的响应式系统会检测到这一点，并不会触发依赖该计算属性的 DOM 更新。因此，页面不会重新渲染。
 *
 * 这种机制确保了性能优化，避免了不必要的 DOM 更新，同时也保证了数据的一致性和准确性
 */
