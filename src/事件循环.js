setTimeout(function() {
  console.log("1");
}, 0);

async function async1() {
  console.log("2");
  const data = await async2();
  console.log("3");
  return data;
}

async function async2() {
  return new Promise((resolve) => {
    console.log("4");
    resolve("async2的结果");
  }).then((data) => {
    console.log("5");
    return data;
  });
}

async1().then((data) => {
  console.log("6");
  console.log(data);
});
new Promise(function(resolve) {
  console.log("7");
  //   resolve()
}).then(function() {
  console.log("8");
});
/**
 * 输出结果：247536 async2的结果 1
 * 注意！我在最后一个 Promise 埋了个坑 我没有调用 resolve 方法
 * 这个是在面试美团的时候遇到了 当时自己没看清楚 以为都是一样的套路
 * 最后面试官说不对 找了半天才发现是这个坑 哈哈
 * */

// 宏任务 1
// 微任务 5 3 6 "async2的结果"


// 执行栈输出
// 2,4,7