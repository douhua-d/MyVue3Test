//call 的实现
Function.prototype.myCall = function(context, ...params) {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  let result = context[fn](...params);
  delete context[fn];
  return result;
};

// apply 的实现
Function.prototype.myApply = function(context, params) {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  let result = context[fn](...params);
  delete context[fn];
  return result;
};

// bind 的实现
/**
 * 可以到bind并不是立即执行，而是返回一个新函数，且新函数的this无法再次被修改，我们总结bind的特点：
 *
 * 可以修改函数this指向。
 * bind返回一个绑定了this的新函数boundFcuntion，例子中我们用bound表示。
 * 支持函数柯里化，我们在返回bound函数时已传递了部分参数2，在调用时bound补全了剩余参数。
 * boundFunction的this无法再被修改，使用call、apply也不行。
 * @param context
 * @param args1
 * @returns {(function(...[*]): (*))|*}
 */

//https://www.cnblogs.com/echolun/p/12178655.html
// Function.prototype.myBind = function(context, ...args1) {
//   if (typeof this !== "function") {
//     throw new Error("type error");
//   }
//   let fn = this;
//   return function F(...args2) {
//     if (this instanceof F) {
//       return new fn(...args1, ...args2);
//     }
//     return fn.apply(context, args1.concat(args2));
//   };
//
//   // 维护原型链
//   if (self.prototype) {
//     boundFunction.prototype = Object.create(self.prototype);
//   }
//
//   return boundFunction;
// };

// https://interview.poetries.top/docs/base/handwritten.html#_7-%E5%AE%9E%E7%8E%B0bind%E6%96%B9%E6%B3%95
Function.prototype.myBind = function(context = window, ...args) {
  // context 是 bind 传入的 this
  // args 是 bind 传入的各个参数
  // this表示调用bind的函数
  let self = this; // fn.bind(obj) self就是fn

  //返回了一个函数，...innerArgs为实际调用时传入的参数
  let fBound = function(...innerArgs) {
    //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
    // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true，可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 默认指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply( // 函数执行
      this instanceof fBound ? this : context,
      args.concat(innerArgs) // 拼接参数
    );
  };

  // 如果绑定的是构造函数，那么需要继承构造函数原型属性和方法：保证原函数的原型对象上的属性不丢失
  // 实现继承的方式: 使用Object.create
  fBound.prototype = Object.create(this.prototype);
  return fBound;
};


// 实现一个bind   纯享版
function myBind(context = window, ...args) {
  if (typeof this !== "function") {
    throw new Error("type err");
  }
  let fn = this;
  let bound = function(...args2) {
    return fn.apply(this instanceof bound ? this : context, args.concat(args2));
  };
  bound.prototype = Object.create(fn.prototype);
  return bound;
}
