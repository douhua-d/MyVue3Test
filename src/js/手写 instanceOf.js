/**
 * 平常我们判断一个变量的类型会使用typeof运算符，但是引用类型并不适用，
 * 除了函数对象会返回function外，其他都返回object。
 * 我们想要知道一个对象的具体类型，就需要使用到instanceof
 * **/

let fn = function() {
};
let arr = [];
// fn instanceof Function; // true
// arr instanceof Array; // true
// fn instanceof Object; // true
// arr instanceof Object; // true

// instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
/**
 // 也就是说instanceof操作符左边是一个对象，右边是一个构造函数，在左边对象的原型链上查找，
 // 直到找到右边构造函数的prototype属性就返回true，或者查找到顶层null
 // （也就是Object.prototype.__proto__），就返回false。
 // 我们模拟实现一下：
 */

// https://juejin.cn/post/6844903749345886216  原型对象


// function myInstanceOf(obj, Constructor) {
//   const leftP = Object.getPrototypeOf(obj);
//   const rightP = Constructor.prototype;
//   if (leftP === null) {
//     return false;
//   }
//   if (leftP === rightP) {
//     return true;
//   }
//   return myInstanceOf(obj.__proto__, Constructor);
// }
//
// console.log(myInstanceOf(fn, Function));
// console.log(myInstanceOf(arr, Array));


function myInstanceof(left, right) {
  // 由于instance要检测的是某对象，需要有一个前置判断条件
  //基本数据类型直接返回false
  if(typeof left !== 'object' || left === null) return false;

  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}

console.log('test', myInstanceof(null, Array)) // false
console.log('test', myInstanceof([], Array)) // true
console.log('test', myInstanceof('', Array)) // false
console.log('test', myInstanceof({}, Object)) // true
