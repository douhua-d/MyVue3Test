//  script start    async1 start    async2  script end  promise1  async1 end  promise2 setTimeout

// setTimeout
// promise1 (promise2)  async1 end  promise2

console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise1");
}).then(() => {
  console.log("promise2");
});

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

async1();

console.log("script end");

//  打印输出 -错误❌：  script start、 async1 start 、async2、script end、promise1、【promise2、async1 end】 这两个反了，这块有问题、setTimeout

//  打印输出 -正确✅： script start、async1 start 、async2、script end、promise1、async1 end、promise2、setTimeout

// 宏任务队列
// () => {
//   console.log("setTimeout");
// }

//  微任务队列
//  promise1  
//  async1 end
//  promise2
