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

function throttle(fn, time) {
  let pre = 0;
  return function(...args) {
    if (Date.now() - pre > time) {
      fn(args);
      pre = Date.now();
    }
  };
}

function myNew(){}