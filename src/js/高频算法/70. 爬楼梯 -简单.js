// 70. 爬楼梯  简单

// 为什么需要 n + 1 的长度： ?
// 
// 因为我们需要考虑从第 0 阶开始到第 n 阶的所有方法数，所以我们需要一个长度为 n + 1 的数组来存储这些值。
// 例如，对于 n = 5，我们需要一个数组 dp[0], dp[1], dp[2], dp[3], dp[4], dp[5]，总共 6 个元素（索引从 0 到 5）。


/**
 * @param {number} n - 需要爬的楼梯阶数
 * @return {number} - 返回不同的方法数
 */
function climbStairs(n) {
  // 边界情况，如果 n 为 1 或 2，直接返回 n
  if (n <= 2) {
    return n;
  }

  // 初始化 dp 数组
  let dp = new Array(n + 1);
  dp[1] = 1; // 到达第 1 阶的方法数为 1
  dp[2] = 2; // 到达第 2 阶的方法数为 2

  // 填充 dp 数组，从第 3 阶开始
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // 当前阶的方法数等于前一阶和前两阶的方法数之和
  }

  // 返回到达第 n 阶的方法数
  return dp[n];
}

// 示例使用
const n = 5;
console.log(climbStairs(n)); // 输出 8
