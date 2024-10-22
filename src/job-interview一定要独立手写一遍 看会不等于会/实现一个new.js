function customNew(constructor, ...args) {
  // 1. 创建一个新的空对象
  const obj = {};

  // 2. 设置新对象的原型指向构造函数的 prototype 属性
  Object.setPrototypeOf(obj, constructor.prototype);

  // 3. 将构造函数内部的 this 绑定到这个新对象
  // 4. 执行构造函数代码，为新对象添加属性
  const result = constructor.apply(obj, args);

  // 5. 返回新对象（如果构造函数没有显式返回其他对象）
  // 如果构造函数返回了一个对象，那么返回这个对象
  // 否则，返回创建的 obj 对象
  return result instanceof Object ? result : obj;
}
