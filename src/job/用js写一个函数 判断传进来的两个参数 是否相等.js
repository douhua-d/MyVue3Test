// 手写深度比较isEqual

/**
 * 思路：深度比较两个对象，就是要深度比较对象的每一个元素。=> 递归
 *
 * 递归退出条件：
 * 被比较的是两个值类型变量，直接用“===”判断
 * 被比较的两个变量之一为null，直接判断另一个元素是否也为null
 *
 * 提前结束递推：
 * 两个变量keys数量不同
 * 传入的两个参数是同一个变量
 * 递推工作：深度比较每一个key
 */

// typeof 运算符对于基本类型的判断是非常有效的，但对于对象和数组等复杂类型，它只能判断是否为 "object"。
function isObject(value) {
  return value !== null && typeof value === "object";
}

console.log(isObject({})); // 输出: true
console.log(isObject([])); // 输出: true
console.log(isObject(null)); // 输出: false
console.log(isObject(42)); // 输出: false

// function isObject(value) {
//   return Object.prototype.toString.call(value) === '[object Object]';
// }
// 
// console.log(isObject({})); // 输出: true
// console.log(isObject([])); // 输出: false
// console.log(isObject(null)); // 输出: false
// console.log(isObject(42)); // 输出: false

// 使用 instanceof 运算符
// function isObject(value) {
//   return value instanceof Object && value.constructor === Object;
// }
// 
// console.log(isObject({})); // 输出: true
// console.log(isObject([])); // 输出: false
// console.log(isObject(null)); // 输出: false
// console.log(isObject(new Date())); // 输出: false
// console.log(isObject(42)); // 输出: false

function isEqual(obj1, obj2) {
  //其中一个为值类型或null
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }

  //判断是否两个参数是同一个变量
  if (obj1 === obj2) {
    return true;
  }

  //判断keys数是否相等
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  //深度比较每一个key
  for (let key in obj1) {
    if (!isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

console.log(111, { q: 1 } === 100);  // false