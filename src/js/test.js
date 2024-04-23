function iteratorGenerator(list) {
  let index = 0;
  let len = list.length;
  return {
    next() {
      let done = index >= len;
      let value = !done ? list[index++] : undefined;
      return { done, value };
    }
  };
}

let iterator = iteratorGenerator(["1号选手", "2号选手", "3号选手"]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let curr = arr[i];
    while (j >= 0 && arr[j] > curr) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = curr;
  }
  return arr;
}

function _render(vNode) {
  if (typeof vNode === "number") {
    vNode = String(vNode);
  }
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }
  const dom = document.createElement(vNode.tag);
  if (vNode.attrs) {
    Object.keys(vNode.attrs).forEach(key => {
      dom.setAttribute(key, vNode.attrs[key]);
    });
  }

  vNode.children.forEach(child => dom.appendChild(_render(child)));
  return dom;
}

// 合并区间
var merge = function(intervals) {
  if (intervals.length < 2) {
    return intervals;
  }
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [];
  let curr = intervals[0];
  for (interval of intervals) {
    if (interval[0] <= curr[1]) {
      curr[1] = Math.max(curr[1], interval[1]);
    } else {
      res.push(curr);
      curr = interval;
    }
  }
  if (curr.length > 0) {
    res.push(curr);
  }
  return res;
};

// 反转数组 
var rotate = function(nums, k) {
  const len = nums.length;
  const newArr = new Array(len);
  for (let i = 0; i < len; i++) {
    newArr[(i + k) % len] = nums[i];
  }
  for (let i = 0; i < len; i++) {
    nums[i] = newArr[i];
  }
  return nums;
};

// 除自身意外的数组乘积
var productExceptSelf = function(nums) {
  const result = new Array(nums.length).fill(1);
  let product = 1;  // 假当给定的数组左边界外有一个隐形的 1 ，1乘任何数还是它本身

  // 从左到右一次 记录到目前这个下标数字左边数到它的乘积
  for (let i = 0; i < nums.length; i++) {
    result[i] = result[i] * product;
    product = product * nums[i];
  }

  product = 1;

  // 再从右到左一次 记录到目前这个下标数字左边数到它的乘积
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] = result[i] * product;
    product = product * nums[i];
  }
  return result;
};

function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (arr[j] < arr[minIndex]) ;
      minIndex = j;
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
  return arr;
}

var getIntersectionNode = function(headA, headB) {
  const visited = new Set();
  let temp = headA;
  while (temp !== null) {
    visited.add(temp);
    temp = temp.next;
  }
  temp = headB;
  while (temp !== null) {
    if (visited.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
};

// 反转链表
var reverseList = function(head) {
  let pre = null;
  let curr = head;
  while (curr !== null) {
    let next = curr.next;
    curr.next = pre;
    pre = curr;
    curr = next;
  }
  return pre;
};

var isPalindrome = function(head) {
  const vals = [];

  while (head !== null) {
    vals.push(head.val);
    head = head.next;
  }
  let i = 0, j = vals.length - 1;
  for (i, j; i < j; i++, j--) {
    if (vals[i] === vals[j])
      return true;
  }
  return false;
};

var detectCycle = function(head) {
  if (head === null) return null;
  let slow = head;
  let fast = head;
  let isCycle = fasle;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      isCycle = true;
      break;
    }
  }
  if (!isCycle) return null;
  fast = head;
  while (fast !== slow) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
};

var search = function(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
};

function solve(root) {
  let stack = [], result = [];
  if (!root) return [];
  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (node == null) continue;
    result.push(node.name);
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  return result;
}


// 并发控制
function limit(count, array, iterateFunc) {
  const tasks = [];
  const doingTasks = [];
  let i = 0;
  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve();
    }
    const task = Promise.resolve().then(() => iterateFunc(array[i++]));
    tasks.push(task);
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(task), 1));
    doingTasks.push(doing);
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve();
    return res.then(enqueue);
  };
  return enqueue().then(() => Promise.all(tasks));
}

const timeout = i => new Promise(resolve => setTimeout(() => {
  resolve(i);
}, i));


// 实现防抖
// 不是立即执行的
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 可以控制是否立即执行
function debounce2(fn, delay, flag = false) {
  let timer = null;
  return function(...args) {
    if (flag && !timer) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}


// 实现节流
function throttle(fn, delay) {
  let previous = 0;
  return function(...args) {
    if (Date.now() - previous > delay) {
      previous = Date.now();
      fn.apply(this, args);
    }
  };
}

function throttle2(fn, delay) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        fn.apply(this, args);
      }, delay);
    }
  };
}

function throttle3(fn, delay) {
  let previous = 0;
  let timer = null;
  return function(...args) {
    if (Date.now() - previous > delay) {
      previous = Date.now();
      clearTimeout(timer);
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}

// 无重复字符的最长子串   
function lengthLongestStr(s) {
  const len = s.length;
  if (len === 0) return 0;
  let maxLength = 0;
  let i = 0, j = 0;
  const set = new Set();
  for (let i; i < len; i++) {
    if (!set.has([s[i]])) {
      set.add(s[i]);
      maxLength = Math.max(maxLength, set.size);
    } else {
      while (set.has(s[i])) {
        set.delete(s[j]);
        j++;
      }
      set.add(s[i]);
    }
  }
  return maxLength;
}

// 实现每隔一秒打印1234
for (let i = 1; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

// 判断括号字符是否有效  
function isValid(s) {
  if (s.length % 2 === 1) {
    return false;
  }
  const regObj = {
    "(": ")",
    "{": "}",
    "[": "]"
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
      stack.push(s[i]);
    } else {
      if (regObj[stack.pop()] !== s[i]) {
        return false;
      }
    }
  }

  if (stack.length > 0) return false;
  return true;
}

console.log(123, isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));

// 实现  promise.all

Promise.myAll = function(iterator) {
  let count = 0;
  let len = iterator.length;
  let res = [];
  return new Promise((resolve, reject) => {
    for (let i in iterator) {
      Promise.resolve(iterator[i]).then((val) => {
        count++;
        res[i] = val;
        if (count === len) {
          resolve(res);
        }
      }).catch(e => {
        reject(e);
      });
    }
  });


};

// let arr1 = [1, 2, 3];
// for (let i in arr1) {
//   console.log("for in 数组", i);  // 0 1 2
// }


// 查找数组公共前缀
function longestCommonStr(strs) {
  const firstStr = strs[0];
  let res = "";
  if (!strs.length) {
    return false;
  }
  for (let i = 0; i < firstStr.length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (firstStr[i] !== strs[j][i]) {
        return res;
      }
    }
    res += firstStr[i];
  }
  return res;
}

// console.log(longestCommonPrefix(["flower", "flow", "flight"]));
// console.log(longestCommonPrefix(["java", "javascript", "json"]));


// 实现发布订阅者模式
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, fn) {
    if (this.events[type]) {
      this.events[type].push(fn);
    } else {
      this.events[type] = [fn];
    }
  }

  off(type, fn) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(item => item !== fn);
  }

  once(type, fn) {
    function func() {
      fn();
      this.off(type, fn);
    }

    this.on(type, func);
  }

  emit(type, ...args) {
    this.events[type] && this.events[type].forEach(fn => {
      fn(...args);
    });
  }
}

// 将虚拟dom转化为真实dom
function render(vnode) {
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  if (typeof vnode === "string") {
    return document.createTextNode(vNode);
  }
  const dom = document.createElement(vNode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      let value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  if (vnode.children) {
    vnode.children.forEach(child => dom.appendChild(_render(child)));
  }
  return dom;
}

let io = new IntersectionObserver(callback, option);