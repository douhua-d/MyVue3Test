// Promise.allSettled 是一个用于处理多个并发异步操作的方法。
// 与 Promise.all 不同的是，Promise.allSettled 
// 会等待所有的 Promise 都已被处理（不论是成功还是失败），然后返回一个包含每个 Promise 结果的数组。

/**
 * 使用原生的Promise.allSettled
 * @param promises
 * @returns {Promise<unknown> | Promise}
 */

// const promise1 = Promise.resolve(42);
// const promise2 = Promise.reject("Error");
// const promise3 = Promise.resolve("Hello");

// Promise.allSettled([promise1, promise2, promise3])
//   .then(results => {
//     results.forEach((result, index) => {
//       console.log(`Promise ${index + 1}:`, result);
//     });
//   });


/**
 * 自己手写一个
 * @param promises
 * @returns {Promise<unknown> | Promise}
 */
function allSettled(promises) {
  return new Promise((resolve) => {
    let results = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: "fulfilled", value };
        })
        .catch(reason => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

// 使用示例
const promise1 = Promise.resolve(42);
const promise2 = Promise.reject("Error");
const promise3 = Promise.resolve("Hello");

allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach((result, index) => {
      console.log(`Promise ${index + 1}:`, result);
    });
  });
