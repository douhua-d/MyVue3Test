// [{
//   userId:12,
//   timeStanp:124234,
//   action:1/-1
// }]

// 一个日志 成千条，如何统计 直播 最大的同时在线人数

// 面试小姐姐说 你这应该也对 涉及到迭代的思想，但不是最简单的


// Promise.all  实现 有一个错误的会怎样
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise5 = Promise.reject(3);
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
const promise6 = Promise.reject(30);

Promise.all([promise1, promise2, promise5, promise3, promise6]).then((values) => {
  console.log(values);
}).catch(err => {
  console.log(err);
});
// Expected output: Array [3, 42, "foo"]
