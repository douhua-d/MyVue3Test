// 事件循环 没写对   复杂的事件循环
const async1 = async () => {
  console.log("async1");
  setTimeout(() => {
    console.log("timer1");
  }, 2000);
  await new Promise(resolve => {
    console.log("promise1");
  });
  console.log("async1 end");
  return "async1 success";
};
console.log("script start");
async1().then(res => console.log(res));
console.log("script end");
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res));
setTimeout(() => {
  console.log("timer2");
}, 1000);

/**
 * 正确答案
 * script start
 * async1
 * promise1
 * script end
 * 1
 * timer2
 * timer1
 */


/**
 * 在 JavaScript 中，当遇到 await 关键字时，await 表达式会暂停 async 函数的执行，直到 Promise 被解决（resolved）或拒绝（rejected）。
 * 然而，这个暂停并不是立即生效的，而是通过将后续代码放入微任务队列来实现的。
 * 因此，await 后面的代码会在当前的宏任务完成后，微任务队列被清空时执行。
 */

// 打印输出：  
// script start
// async1 
// promise1
// script end

// -async1 end  // todo 这里不会执行的
// -async1 success

// 1
// timer2   // todo  这里的timeOut 有个加入队列的时间，一个一秒 一个两秒
// timer1

// 微任务: promise1  

// 宏任务 :  timer1    timer2


// 第二道手写题 是个查找公共字符串  写对了


// 这段输出为1  为什么？
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res));
/**
 * Promise.resolve(1):
 *
 * 这个创建了一个状态为 fulfilled、值为 1 的 Promise。
 * .then(2):
 *
 * .then() 接受两个函数作为参数：第一个是 onFulfilled 回调，第二个是 onRejected 回调。
 * 这里传递的 2 不是函数，而是一个值。根据 Promise 规范，如果 then 中的参数不是函数，则会被忽略。
 * 因此，这一行等价于 .then(undefined)。
 * .then(Promise.resolve(3)):
 *
 * 再次 .then() 接受一个参数，这次传递的是一个 Promise.resolve(3)。
 * 传递给 .then() 的参数也不是函数，而是一个 Promise 对象。根据规范，如果 then 中的参数不是函数，同样会被忽略。
 * 因此，这一行等价于 .then(undefined)。
 * .catch(4):
 *
 * .catch() 是 .then(undefined, onRejected) 的语法糖，接受一个 onRejected 回调。
 * 这里传递的 4 不是函数，因此也会被忽略。
 * 这一行等价于 .catch(undefined)。
 * .then(res => console.log(res)):
 *
 * 这里传递了一个函数作为 onFulfilled 回调。
 * 由于前面的 Promise.resolve(1) 的状态是 fulfilled，且中间所有的 .then() 和 .catch() 都没有提供有效的处理函数，所以 Promise 的值一直保持为 1。
 * 最终，这个链式调用会传递一个值为 1 的 Promise 到最后的 .then(res => console.log(res)) 回调函数中，输出 1。
 *
 *
 * 总结
 * 传递给 .then() 和 .catch() 的参数如果不是函数，会被忽略。
 * 传递给 .then() 的 Promise.resolve(3) 不是函数，因此被忽略。
 * 因此，最后的 Promise 保持了原始的值 1，并被传递到最终的 .then 回调中，输出结果为 1。
 */

const myPromise = new Promise((resolve, reject) => {
  resolve("Hello, world!");
});

myPromise.then(2) // 非函数，替换为 x => x
  .then(Promise.resolve(3)) // 非函数，替换为 x => x
  .then(res => console.log(res)); // 输出: Hello, world!


// 测试 MyPromise
const myPromise = new MyPromise((resolve, reject) => {
  resolve("Hello, world!");
});

myPromise.then(value => {
  console.log("Step 1:", value); // 输出: Step 1: Hello, world!
  return "Hello again!";
}).then(value => {
  console.log("Step 2:", value); // 输出: Step 2: Hello again!
  return Promise.resolve("Resolved Promise");
}).then(value => {
  console.log("Step 3:", value); // 输出: Step 3: Resolved Promise
});
