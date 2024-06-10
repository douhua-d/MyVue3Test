// 设计一个sum函数，使其满足一下要求

// sum(1,2).sumOf()  // 返回 3
// sum(1,2)(3).sumOf()  // 返回 6
// sum(1)(2,3,4).sumOf()  // 返回 10
// sum(1,2)(3,4,5).sumOf()  // 返回 15

/**
 * 需要利用 JavaScript 中的闭包和函数链式调用的特性
 * 函数柯里化
 *
 * 函数链式调用
 *
 * 返回 innerSum 本身，以支持链式调用。
 *
 * sumOf 方法：
 * 定义在 innerSum 函数上，用于返回计算出的总和。
 */

function sum(...args) {
  let total = args.reduce((sum, curr) => sum + curr);

  function innerSum(...args2) {
    total += args2.reduce((sum, curr) => sum + curr);
    return innerSum;
  }

  innerSum.sumOf = () => total;
  return innerSum;
}


// 示例测试
console.log(sum(1, 2).sumOf());         // 返回 3
console.log(sum(1, 2)(3).sumOf());      // 返回 6
console.log(sum(1)(2, 3, 4).sumOf());   // 返回 10
console.log(sum(1, 2)(3, 4, 5).sumOf()); // 返回 15