// https://www.cnblogs.com/echolun/p/12178655.html


// Function.prototype.myBind = function(context) {
//   if (typeof this !== "function") {
//     throw new Error("error");
//   }
//   let _this = this;
//   let args = [...arguments].slice(1);
//   return function bound() {
//     if (this instanceof bound) {
//       return new _this(...args, ...arguments);
//     }
//     return _this.apply(context, args.concat(arguments));
//   };
// };

Function.prototype.myBind = function(context, ...args1) {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  let fn = this;
  return function bound(...args2) {
    if (this instanceof bound) {
      return new fn(...args1, ...args2);
    }
    return fn.apply(context, [...args2, ...args2]);
  };
};


// 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

// 实现一个 call
Function.prototype.myCall = function(context) {
  context = context || window;
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};


// 实现一个apply
Function.prototype.myApply = function(context = window, ...args) {
  let key = Symbol("key"); // 在context上加一个唯一值不影响context上的属性
  context[key] = this;
  let result = context[key](...args);
  delete context[key]; // 不删除会导致context属性越来越多
  return result;
};
