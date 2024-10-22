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

// 找到与目标整数最接近的整数
function findClosest(arr, target) {
  let closet = arr[0];
  let minDiff = Math.abs(closet - target);
  for (let i = 1; i < arr.length; i++) {
    let diff = Math.abs(arr[i] - target);
    if (diff < minDiff) {
      minDiff = diff;
      closet = arr[i];
    } else if (diff === minDiff) {
      continue;
    }
  }
  return closet;
}

// 测试用例
const arr1 = [1, 2, 4, 5, 6, 8, 9];
const target1 = 7;
console.log(findClosest(arr1, target1)); // 输出: 6

// 写一个  二分查找
function search(arr, target, start, end) {
  let targetIndex = -1;
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === target) {
    targetIndex = mid;
    return targetIndex;
  }

  if (start >= end) {
    return targetIndex;
  }

  if (arr[mid] < target) {
    return search(arr, target, mid + 1, end);
  } else {
    return search(arr, target, left, mid - 1);
  }
}

function rotateArr(nums, k) {
  let len = nums.length;
  let newArr = new Array(len);
  for (let i = 0; i < len; i++) {
    newArr[(i + k) % len] = nums[i];
  }
  for (let i = 0; i < len; i++) {
    nums[i] = newArr[i];
  }
  return nums;
}

// 实现基础版深拷贝 

function emit(type, ...args) {
  if (!this.events[type]) return;
  this.events[type] = this.events[type].filter(item => {
    const { fn, isOnce } = item;
    fn(...args);
    if (isOnce) return false;
    return true;
  });
}

// 手写一个防抖
function debounce(fn, delay, flag) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    if (flag && !timer) {
      fn.apply(this.args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 手写一个节流
function throttle(fn, delay) {
  let previous = 0;
  return function(...args) {
    if (Date.now() - previous > delay) {
      previous = Date.now();
      fn.apply(this, args);
    }
  };
}

function throttle(fn, time) {
  let timer;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        fn.apply(this, args);
      }, time);
    }
  };
}

let timeoutId = setTimeout(() => {
  console.log("This is a delayed message.");
}, 3000);

// 取消定时器
clearTimeout(timeoutId);

// timeoutId 仍然是一个数字，但不再关联任何活动的定时器
console.log(1111, timeoutId); // 输出的是数字，比如 1


// 手写一个快速排序
function quickSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }

  let flag = arr[0];
  let left = [];
  let right = [];
  for (let i = 0; i < len; i++) {
    let val = len[i];
    if (val < flag) {
      left.push(val);
    } else {
      right.push(val);
    }
  }
  return quickSort(left).concat(flag, quickSort(right));
}


// 实现一个 选择排序

function selectSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return len;
  }
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

// 数组扁平化
function flatten(arr) {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}

// 实现基本的对象的深拷贝
function deepClone(data) {
  if (data === null || typeof data !== "object") return data;
  let copy = {};
  if (Array.isArray(data)) {
    copy = [];
  }

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      copy[key] = deepClone(data[key]);
    }
  }

  return copy;
}

// 实现一个bind
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

// 实现一个  instanceOf
function myInstanceOf(left, right) {
  if (left === null || typeof left !== "object") return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (!proto) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
