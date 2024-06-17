// ["q","adv","q"]

function count(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    if (obj[val]) {
      obj[val] = obj[val] + 1;
    } else {
      obj[val] = 1;
    }
  }
  return obj;
}

console.log(count(["q", "adv", "q"]));


// 针对以上方法再做一次优化
function count(arr) {
  let obj = {};
  for (let val of arr) {
    if (obj.hasOwnProperty(val)) {
      obj[val]++;
    } else {
      obj[val] = 1;
    }
  }
  return obj;
}


function count(arr) {
  let obj = {};
  for (let val of arr) {
    obj[val] = (obj[val] || 0) + 1;
  }
  return obj;
}

// 定时器实现  第一次事件不会触发，最后一次一定触发
function throttle(fn, time) {
  let timer = null;
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

// 结合版  定时器和时间戳的结合版，也相当于节流和防抖的结合版，第一次和最后一次都会触发
function throttle(fn, time) {
  let previous = 0;
  let timer = null;
  return function(...args) {
    if (Date.now() - previous > time) {
      clearTimeout(timer);
      timer = null;
      previous = Date.now();
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, time);
    }
  };
}

// 实现一个new
function myNew(constructor, ...args) {
  let obj = {};
  Object.setPrototypeOf(obj, constructor.prototype);
  const result = constructor.apply(obj, args);

  return result instanceof Object ? result : obj;
}