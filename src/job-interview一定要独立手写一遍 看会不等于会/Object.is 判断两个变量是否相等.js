//  Object.is 判断两个变量是否相等

/**
 * Object.is() 不能用于直接判断 对象 或 数组 的内容是否相等。
 * 它主要用于比较 基本数据类型（如 number, string, boolean）以及处理特殊情况（如 NaN 和 +0 / -0）。
 * 对于 对象 和 数组，Object.is() 比较的是它们的 引用，而不是内容。
 * 因此，如果两个对象或数组具有相同的内容，但它们是 不同的引用，Object.is() 会返回 false。
 */

const isEqual = (a, b) => {
  // 基本类型的比较，直接使用 Object.is
  if (Object.is(a, b)) return true;

  // 如果一个是对象，一个不是对象，直接返回 false
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  // 如果是数组，递归比较每个元素
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => isEqual(item, b[index]));
  }

  // 如果是对象，递归比较每个属性
  if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every(key => isEqual(a[key], b[key]));
  }

  // 默认返回 false
  return false;
};


// 基本数据类型
console.log(isEqual(5, 5));  // true
console.log(isEqual('hello', 'hello'));  // true
console.log(isEqual(NaN, NaN));  // true
console.log(isEqual(+0, -0));  // false

// 数组比较
console.log(isEqual([1, 2, 3], [1, 2, 3]));  // true
console.log(isEqual([1, 2], [1, 2, 3]));  // false
console.log(isEqual([1, [2, 3]], [1, [2, 3]]));  // true
console.log(isEqual([1, [2, 3]], [1, [2, 4]]));  // false

// 对象比较
console.log(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }));  // true
console.log(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 }));  // false
console.log(isEqual({ a: { b: 2 } }, { a: { b: 2 } }));  // true
console.log(isEqual({ a: { b: 2 } }, { a: { b: 3 } }));  // false

// 特殊情况
console.log(isEqual(null, undefined));  // false
console.log(isEqual(null, null));  // true
console.log(isEqual({ a: null }, { a: null }));  // true

