// 手写 bind的实现， 并调用
function myBind(context, ...args) {
  let fn = this;
  return function bound(...args2) {
    if (this instanceof bound) {
      return fn(...args, ...args2);
    }
    return fn.apply(context, [...args, ...args2]);
  };
}


// 手写防抖

// 此种类型不是立即执行的
function debounce(fn, time) {
  let timer = null;
  return function(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

// 立即执行一次的 防抖函数
function debounce(fn, time, flag = false) {
  let timer = null;
  return function(...args) {
    timer && clearTimeout(timer);
    if (!timer && flag) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

// 节流
// 时间戳实现  第一次事件肯定触发，最后一次不会触发
function throttle(fn, time) {
  let previous = 0;
  return function(...args) {
    if (Date.now() - previous > time) {
      previous = Date.now();
      fn.apply(this, args);
    }
  };
}

function myInstanceOf(left, right) {
  let proto = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) {
      return true;
    } else {
      proto = proto.__proto__;
    }
  }
}