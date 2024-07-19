const async1 = async () => {
  console.log("async1 start");
  const result = await new Promise(resolve => {
    console.log("promise1");
    resolve("resolved value");
  });
  console.log("async1 end");
  return result;
};

console.log("script start");
async1().then(res => console.log(res));
console.log("script end");

// 正解
// script start
// async1 start
// promise1
// script end
// async1 end
// resolved value

/**
 * 具体步骤
 * script start 立即输出。
 * 调用 async1，输出 async1 start。
 * 创建并执行 new Promise(...)，输出 promise1 并立即解决 Promise，但解决回调进入微任务队列。
 * script end 立即输出。
 * 当前宏任务完成，事件循环处理微任务队列，恢复 async1 的执行。
 * async1 恢复执行，输出 async1 end。
 * async1 返回的 Promise 解决，.then(res => console.log(res)) 被执行，输出 resolved value。
 * 因此，即使 Promise 被立即解决，await 后的代码会在下一轮事件循环的微任务阶段执行，而不是立即执行。
 */