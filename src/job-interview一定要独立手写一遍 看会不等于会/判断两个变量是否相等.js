// 判断两个变量是否相等
const isEqual = (a, b) => {
  // 1. 检查如果两个值是同一个引用（即同一个对象或数组）
  if (a === b) return true;

  // 2. 处理特殊情况：NaN
  if (Number.isNaN(a) && Number.isNaN(b)) return true;

  // 3. 检查其中一个是 null 或 undefined
  if (a == null || b == null) return false;  // 注意：== 用于检查 null 和 undefined

  // 4. 如果类型不同，直接返回 false
  if (typeof a !== typeof b) return false;

  // 5. 处理对象、数组和其他引用类型（递归深度比较）
  if (typeof a === 'object' && typeof b === 'object') {
    // 如果是数组
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((value, index) => isEqual(value, b[index])); // 递归比较数组中的每个元素
    }
    // 如果是普通对象
    if (!Array.isArray(a) && !Array.isArray(b)) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      // 如果对象的属性个数不同
      if (keysA.length !== keysB.length) return false;

      // 递归比较每个键的值
      return keysA.every(key => isEqual(a[key], b[key]));
    }
  }

  // 6. 最终情况：如果没有通过前面的条件，返回 false
  return false;
};

console.log(isEqual(5, 5));                  // true
console.log(isEqual('hello', 'hello'));      // true
console.log(isEqual(NaN, NaN));              // true
console.log(isEqual(5, '5'));                // false
console.log(isEqual([1, 2], [1, 2]));        // true
console.log(isEqual([1, 2], [1, 2, 3]));     // false
console.log(isEqual({ a: 1 }, { a: 1 }));    // true
console.log(isEqual({ a: 1 }, { a: 2 }));    // false
console.log(isEqual(null, undefined));       // false
console.log(isEqual(null, null));            // true
console.log(isEqual(undefined, undefined));  // true
