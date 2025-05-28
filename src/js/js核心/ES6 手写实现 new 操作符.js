// ES6 手写实现 new 操作符

function myNew(Constructor, ...args) {
  // 检查 Constructor 是否为函数
  if (typeof Constructor !== 'function') {
    throw new TypeError(`${Constructor} is not a constructor`);
  }

  // 创建新对象，并将其原型指向构造函数的 prototype
  const instance = Object.create(Constructor.prototype);

  // 调用构造函数，并将 this 绑定到新创建的对象
  const result = Constructor.apply(instance, args);

  // 判断构造函数的返回值
  const isObject = result && (typeof result === 'object' || typeof result === 'function');

  return isObject ? result : instance;
}


// 为什么箭头函数不能作为构造函数？
// 这是因为箭头函数设计上的几个特点：
// 箭头函数没有自己的 this 绑定，它的 this 是词法作用域的，从外部环境继承
// 箭头函数不能通过 call()、apply() 或 bind() 方法改变 this 指向
// 箭头函数没有 prototype 属性，而这是构造函数创建实例所必需的
// 箭头函数不能作为生成器函数（不能使用 yield 关键字）
// 由于这些特性，JavaScript 引擎禁止使用 new 调用箭头函数。