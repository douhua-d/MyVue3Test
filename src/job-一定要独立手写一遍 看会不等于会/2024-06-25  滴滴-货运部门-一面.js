// 事件循环

/**
 * 在 JavaScript 的事件循环中，await 的作用是暂停 async 函数的执行，等待 Promise 解决（resolve），然后再恢复执行 async 函数。
 *
 * await 后面的代码会在 Promise 解决后加入微任务队列（microtask queue）。
 * @returns {Promise<void>}
 */
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  new Promise(function(resolve) {
    console.log("promise1");
    resolve();
  }).then((function() {
    console.log("promise2");
  }));
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
  console.log("promise3");
  resolve();
}).then(function() {
  console.log("promise4");
});

console.log("script end");


// 打印： script start 、async1 start 、promise1 、promise3 、script end 、promise2 、async1 end 、promise4、setTimeout

// 宏任务： setTimeout

// 微任务： promise2 、async1 end 、promise4



// 手写发布订阅这模式
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, fn, isOnce = false) {
    if (this.events[type]) {
      this.events[type].push({ fn, isOnce });
    } else {
      this.events[type] = [{ fn, isOnce }];
    }
  }

  once(type, fn) {
    this.on(type, fn, true);
  }

  emit(type, ...args) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(item => {
      const { fn, isOnce } = item;
      fn(...args);
      if (isOnce) return false;
      return true;
    });
  }

  off(type, fn) {
    if (!fn) {
      this.events[type] = [];
    } else {
      const fnList = this.events[type];
      if (fnList) {
        this.events[type] = fnList.filter(item => item !== fn);
      }
    }
  }
}



// 手写如何比较两个变量是否相等

function deepEqual(a, b) {
  // 检查是否是基本类型
  if (a === b) return true;

  // 检查是否是 null 或 undefined
  if (a == null || b == null) return a === b;

  // 检查类型是否相同
  if (typeof a !== typeof b) return false;

  // 检查是否是 Date 对象
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // 检查是否是正则表达式
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // 检查是否是对象或数组
  if (typeof a === 'object' && typeof b === 'object') {
    // 检查对象的引用是否相同
    if (a === b) return true;

    // 检查对象的键的数量是否相同
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    // 递归检查每个键的值
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }

  // 其他情况直接返回 false
  return false;
}

// 示例用法
const obj1 = {
  name: 'Alice',
  age: 25,
  hobbies: ['reading', 'traveling'],
  address: {
    city: 'Wonderland',
    postalCode: '12345'
  }
};

const obj2 = {
  name: 'Alice',
  age: 25,
  hobbies: ['reading', 'traveling'],
  address: {
    city: 'Wonderland',
    postalCode: '12345'
  }
};

console.log(deepEqual(obj1, obj2)); // true
console.log(deepEqual(1,'1')); // false
