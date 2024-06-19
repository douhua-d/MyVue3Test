console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
  // return Promise.resolve();
  return Promise.reject();
}).then(() => {
  console.log('promise2');
}).catch(err => {
  console.log(err);
});

console.log('script end');

// 输出：  script start 、script end 、promise1 、promise2、setTimeout

// 宏任务：
// console.log('setTimeout');

// 微任务：
//  console.log('promise1');
//  promise2
