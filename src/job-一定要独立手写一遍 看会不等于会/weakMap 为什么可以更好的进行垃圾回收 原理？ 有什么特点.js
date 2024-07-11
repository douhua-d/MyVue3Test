// `WeakMap` 是一种特殊的 JavaScript Map，它允许对象类型的键，并且不会阻止键被垃圾回收。这使得 `WeakMap` 在某些场景下更适合内存管理和垃圾回收。以下是 `WeakMap` 可以更好地进行垃圾回收的原理及其特点：
// 
// ## `WeakMap` 进行更好垃圾回收的原理
// 
// 1. **弱引用**
//    - `WeakMap` 中的键是弱引用（weak reference）。弱引用意味着键不计入引用计数，因此垃圾回收器可以在没有其他强引用（strong reference）的情况下回收这些对象。
//    - 当一个对象作为 `WeakMap` 的键时，如果没有其他地方引用该对象，垃圾回收器会自动回收该对象及其在 `WeakMap` 中的关联值。
// 
// 2. **无阻止垃圾回收**
//    - 与普通的 `Map` 不同，`WeakMap` 中的键不会阻止垃圾回收器回收它们。
//    - 普通的 `Map` 中的键是强引用，只要 `Map` 存在，键所指向的对象就不会被回收。而 `WeakMap` 中的键可以在不再被引用时自动回收，从而避免内存泄露。
// 
// ## `WeakMap` 的特点
// 
// 1. **键必须是对象**
//    - `WeakMap` 的键只能是对象类型（Object），不能是基本数据类型（如 `Number`、`String` 等）。这是因为弱引用只能应用于对象。
// 
// 2. **不可迭代**
//    - `WeakMap` 不可迭代，无法通过遍历获取其键值对。这是因为键是弱引用，可能随时被回收，不适合进行遍历操作。
// 
// 3. **无 `size` 属性**
//    - `WeakMap` 没有 `size` 属性，因为键值对可能会动态变化，随时被垃圾回收器回收。
// 
// 4. **API 与 `Map` 类似**
//    - `WeakMap` 提供的方法与 `Map` 类似，如 `set`、`get`、`has` 和 `delete`，但由于其弱引用特性，使用场景有所不同。
// 
// ## 使用场景
// 
// 1. **缓存**
//    - `WeakMap` 常用于缓存一些与对象关联的数据。例如，缓存DOM节点相关的数据，当DOM节点被移除时，其缓存数据也会自动被回收。
// 
// 2. **存储私有数据**
//    - `WeakMap` 可以用来存储对象的私有数据，使其不暴露在外部，同时确保对象被回收时，相关数据也会被回收。
// 
// 3. **对象元数据**
//    - `WeakMap` 可以用于存储与对象相关的元数据，而不影响对象的垃圾回收。
// 
// ```javascript
// let wm = new WeakMap();
// let obj = { name: "John" };
// 
// wm.set(obj, "some value");
// 
// console.log(wm.get(obj)); // 输出 "some value"
// 
// // 删除对 obj 的引用
// obj = null;
// 
// // 由于 WeakMap 中的键是弱引用，垃圾回收器会自动回收 obj 及其关联的值
// ```
// 
// 通过弱引用机制，`WeakMap` 可以在特定场景下更有效地管理内存，避免不必要的内存泄露，使垃圾回收更加高效。


/**
 * 强引用 和 弱引用
 *
 *
 */

let wm = new WeakMap();
let obj = { name: "Alice" };

wm.set(obj, "some value"); // wm 中对 obj 的引用是弱引用

obj = null; // 删除对 obj 的强引用

// 此时，如果没有其他强引用指向 { name: "Alice" }，垃圾回收器会回收该对象及其在 WeakMap 中的关联值。
// 在上述例子中，当 obj 被设置为 null 后，WeakMap 中对该对象的引用不会阻止它被回收。


// 主要区别总结
// 引用类型：
// 
// 强引用：默认的引用类型，阻止垃圾回收。
// 弱引用：不会阻止垃圾回收。
// 内存管理：
// 
// 强引用：对象有强引用时不会被回收，可能导致内存泄漏。
// 弱引用：对象只有弱引用时可以被回收，有助于避免内存泄漏。
// 使用场景：
// 
// 强引用：普通变量、对象属性等。
// 弱引用：缓存、弱引用数据结构（如 WeakMap、WeakSet）等。

console.log("100".toString());


let set = new Set();

set.add(1);
set.add(2);
set.add(1);
set.add({ name: 1 });
set.add({ name: 2 });
set.add({ name: 1 });  // 对象会重复添加的， 会任务是不同给的对象   // todo tips

// console.log(set.entries());

for (let item of set.entries()) {
  console.log(item[0]);
}
