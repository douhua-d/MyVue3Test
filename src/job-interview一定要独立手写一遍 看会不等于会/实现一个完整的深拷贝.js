// 实现完整的深拷贝


// https://interview.poetries.top/docs/base/improve.html#_21-%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D

// 手工实现一个浅拷贝
// 浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝。
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// Reflect.ownKeys 方法返回一个由目标对象自身的属性键组成的数组。它的返回值等同于 Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。
/**
 * 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 Reflect.ownKeys 方法；
 * 当参数为 Date、RegExp 类型，则直接生成一个新的实例返回；
 * 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性，以及对应的特性，顺便结合 Object.create 方法创建一个新对象，并继承传入原对象的原型链；
 * 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 Map 和 weakMap 的关键区别，这里要用 weakMap），作为检测循环引用很有帮助，如果存在循环，则引用直接返回 WeakMap 存储的值
 * 如果你在考虑到循环引用的问题之后，还能用 WeakMap 来很好地解决，并且向面试官解释这样做的目的，那么你所展示的代码，以及你对问题思考的全面性，在面试官眼中应该算是合格的了
 */

// Object.getOwnPropertyNames() 静态方法返回一个数组，其包含给定对象中所有自有属性（包括不可枚举属性，但不包括使用 symbol 值作为名称的属性）。

const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    return new Date(obj)       // 日期对象直接返回一个新的日期对象
  }

  if (obj.constructor === RegExp){
    return new RegExp(obj)     //正则对象直接返回一个新的正则对象
  }

  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let allDesc = Object.getOwnPropertyDescriptors(obj)

  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  // 把cloneObj原型复制到obj上
  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
  }
  return cloneObj
}
