// 数组  watch   computed  key  index   const  let  diff
// css  盒模型  定位
// 手写并发请求控制
// 事件循环输出结果

// 
console.log("start");

setTimeout(() => {
  console.log("timeout1");
  Promise.resolve().then(() => console.log("then2"));
}, 0);

new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("then1");
  setTimeout(() => {
    console.log("timeout2");
  }, 0);
});

console.log("end");

// 打印输出  start   promise1  end  then1  timeout1 then2 timeout2

//  宏任务队列
//  console.log("timeout1");
//   Promise.resolve().then(() => console.log("then2"));

//   setTimeout(() => {
//     console.log(" ");
//   }, 0);


// 微任务队列
// console.log("then1");
//   setTimeout(() => {
//     console.log("timeout2");
//   }, 0);

// Promise.resolve().then(() => console.log("then2"));