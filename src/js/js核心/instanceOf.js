/**
 instanceof的实现
 instanceof 是用来判断A是否为B的实例，表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false。
 instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
 不能检测基本数据类型，在原型链上的结果未必准确，不能检测null,undefined
 实现：遍历左边变量的原型链，直到找到右边变量的 prototype，如果没有找到，返回 false
 * */

//https://mp.weixin.qq.com/s/OS7gTvJ2gAVCZBvU-1cAqA
function myInstanceOf(left, right) {
  let proto = Object.getPrototypeOf(left);
  let prototype = right.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function myInstanceof2(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if (typeof left !== "object" || left === null) return false;
  // getPrototypeOf是Object对象自带的API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;//找到相同原型对象，返回true
    proto = Object.getPrototypeof(proto);
  }
}
