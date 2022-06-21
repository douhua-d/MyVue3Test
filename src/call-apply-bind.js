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
//https://www.cnblogs.com/echolun/p/12178655.html
Function.prototype.myBind = function(context, ...args1) {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  let fn = this;
  return function F(...args2) {
    if (this instanceof F) {
      return new fn(...args1, ...args2);
    }
    return fn.apply(context, args1.concat(args2));
  };
};