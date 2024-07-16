// 剑指 offer 42 连续子数组的最大和
//  动态规划

/**
 * 解题思路
 * 动态规划是解决该问题的有效方法，其核心思想是定义一个状态数组 dp，其中 dp[i] 表示以第 i 个元素结尾的连续子数组的最大和。
 * 通过遍历数组，不断更新状态，最终得到整个数组中连续子数组的最大和。
 *
 *
 * 具体步骤如下：
 *
 * 定义状态：
 *
 * dp[i] 表示以第 i 个元素结尾的连续子数组的最大和。
 * 状态转移方程：
 *
 * 当 i=0 时，dp[0] = nums[0]（以第一个元素结尾的连续子数组的最大和就是它本身）。
 * 当 i>0 时，dp[i] = max(dp[i-1] + nums[i], nums[i])（当前元素自成一段或者加入前面的子数组）。
 * 最终结果：
 *
 * 最终要求的结果是所有 dp[i] 中的最大值，即 max(dp[0], dp[1], ..., dp[n-1])，其中 n 是数组的长度。
 *
 *
 */

function maxSubArray(nums) {
  if (!nums || nums.length === 0) return 0;

  // 初始化动态规划数组和最大和的变量
  let dp = [];
  dp[0] = nums[0];
  let maxSum = nums[0];

  // 遍历数组，更新状态数组和最大和
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    maxSum = Math.max(maxSum, dp[i]);
  }

  return maxSum;
}

// 示例
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 输出: 6
