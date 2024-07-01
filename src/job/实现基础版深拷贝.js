/**
 * 面试简版
 * @param object
 * @returns {*[]|{}}
 */

function deepClone1(obj) {
  // 如果是 值类型 或 null，则直接return
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 定义结果对象
  let copy = {};

  // 如果对象是数组，则定义结果数组
  if (Array.isArray(obj)) {
    copy = [];
  }

  // 遍历对象的key
  for (let key in obj) {
    // 如果key是对象的自有属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用深拷贝方法
      copy[key] = deepClone(obj[key]);
    }
  }

  return copy;
}

console.log(deepClone1({ a: "WET", v: { c: 100 } }));


// 实现基础版深拷贝
function deepCopy(object) {
  if (typeof object !== "object" || !object) return;
  const newObj = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObj[key] = typeof object[key] ? deepCopy(object[key]) : object[key];
    }
  }
  return newObj;
}


// 在JavaScript中实现一个深拷贝函数可以通过递归的方式处理对象和数组，
// 确保所有嵌套的数据结构都被完全复制，而不是仅仅复制引用。下面是一个常见的深拷贝实现方法：
function deepClone(obj, hash = new WeakMap()) {
  // 如果obj为null，或者不是对象或数组，直接返回
  if (obj == null || typeof obj !== "object") return obj;

  // 如果已经是处理过的对象，直接返回缓存结果避免循环引用
  if (hash.has(obj)) return hash.get(obj);

  let cloneObj;
  // 判断是数组还是对象
  if (Array.isArray(obj)) {
    cloneObj = [];
  } else {
    cloneObj = {};
  }

  // 存储当前层的克隆结果
  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) { // 只处理自身的属性，不处理原型链上的属性
      // 递归处理每一项
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return cloneObj;
}

