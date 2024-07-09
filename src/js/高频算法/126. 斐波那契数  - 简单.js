// LCR 126. 斐波那契数
// 简单
// 相关标签
// 相关企业
// 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。
// 该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
// 
// F(0) = 0，F(1) = 1
// F(n) = F(n - 1) + F(n - 2)，其中 n > 1
// 给定 n ，请计算 F(n) 。

// 答案需要取模 1e9+7(1000000007) ，如计算初始结果为：1000000008，请返回 1。


// 方法一：递归     时间复杂度高 O 2的n次 指数级

function fib(n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

// 示例
console.log(fib(10)); // 输出: 55

// 力扣通过 需要取模
function fib(n, memo = {}) {
  const MOD = 1000000007;
  if (n <= 1) {
    return n;
  }
  if (memo[n]) {
    return memo[n];
  }
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n] % MOD;
}
