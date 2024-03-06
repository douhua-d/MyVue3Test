//https://juejin.cn/post/6889250555035090951
//https://www.cnblogs.com/cxdong/p/11429445.html
//https://segmentfault.com/a/1190000018265172

// 函数调用栈、函数柯里化 
// https://blog.csdn.net/nickroprak/article/details/123376576


//判断当前函数传入的参数是否大于或等于fn需要参数的数量，如果是，直接执行fn
// 如果传入参数数量不够，返回一个闭包，暂存传入的参数，并重新返回currying函数

//函数柯里化
function currying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...args2) => currying(fn, ...args, ...args2);
  }
}

//菲波那切数列
function Fibonacci(n) {
  if (n < 2) {
    return n;
  }
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

//函数柯里化
function curry(fn) {
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function() {
        return curriedFn(...args.concat(Array.from(arguments)));
      };
    }
    return curry(...args);
  };
}

