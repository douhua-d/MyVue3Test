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



