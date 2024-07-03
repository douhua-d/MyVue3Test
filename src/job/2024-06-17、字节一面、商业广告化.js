// 事件循环输出结果
// 并发请求池处理
// 算法 模板字符串换行、多个空格

// 事件循环输出结果

// script start 、 async1 start  、async2、 ❎【async1 end 、promise1、script end 】  这部分错了 -主要是涉及到的await这块 ！！！、promise2 、setTimeout
// 宏任务 setTimeout
// 微任务  async1 end 、promise2

// 正确 ✅ script start 、 async1 start  、async2、promise1、script end、async1 end、promise2 、setTimeout



//  script start  async1 start   async2   promise1  script end   async1 end   promise2 setTimeout

// setTimeout
// async1 end   promise2

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
});

async1();

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});

console.log("script end");