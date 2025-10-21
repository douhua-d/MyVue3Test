//https://www.jianshu.com/p/90b6280dd1b6
//https://blog.csdn.net/lianjiuxiao/article/details/116260070

//  实现  promise.all
/**
 * 特点：
 *
 * 接收一个可迭代对象（通常是数组），其中的每一项可以是：
 *
 * 一个 Promise；
 *
 * 或一个普通值（会被自动包成 Promise.resolve()）。
 *
 * 并行执行所有 Promise；
 *
 * 当：
 *
 * 全部 fulfilled → 返回一个新的 Promise，状态为 fulfilled，结果是一个数组；
 *
 * 任意一个 rejected → 返回的 Promise 立即 rejected，错误就是那个错误；
 *
 * 空数组 → 立即 resolved 为 []。
 * @param iterator
 * @returns {Promise<unknown> | Promise}
 *
 *
 * 🧠 二、手写实现思路
 *
 * Promise.all 接收一个可迭代对象（比如数组）；
 *
 * 创建一个结果数组 results；
 *
 * 计数器 count 记录完成了多少个 Promise；
 *
 * 遍历输入的每一项：
 *
 * 如果不是 Promise，用 Promise.resolve() 包装；
 *
 * 监听 .then()，拿到结果放到对应位置；
 *
 * 每成功一个，计数 +1；
 *
 * 当计数 === 输入长度时，说明全部完成，resolve(results)；
 * 如果任意一个失败，reject(reason)。
 */
Promise.myAll = function(iterator) {
  let count = 0;
  let len = iterator.length;
  let res = [];
  return new Promise((resolve, reject) => {
    for (let i in iterator) {
      Promise.resolve(iterator[i]).then(val => {
        count++;
        res[i] = val;
        if (count === len) {
          resolve(res);
        }
      }).catch(e => {
        reject(e);
      });
    }
  });
};

Promise.myRace = function(iterator) {
  return new Promise((resolve, reject) => {
    for (let item of iterator) {
      Promise.resolve(item).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    }
  });
};