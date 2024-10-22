// 70. 爬楼梯  简单

// 为什么需要 n + 1 的长度： ?
// 
// 因为我们需要考虑从第 0 阶开始到第 n 阶的所有方法数，所以我们需要一个长度为 n + 1 的数组来存储这些值。
// 例如，对于 n = 5，我们需要一个数组 dp[0], dp[1], dp[2], dp[3], dp[4], dp[5]，总共 6 个元素（索引从 0 到 5）。

/**
     * 在爬楼梯问题中，问题的本质是求有多少种不同的方法可以爬到第 n 级台阶。每次你可以选择爬 1 级或 2 级台阶。

    为了更好地理解为什么数组需要长度为 n + 1，让我们逐步分析：

    1. 动态规划的思想
    这个问题可以通过动态规划来解决。设 dp[i] 表示爬到第 i 级台阶的方法总数。
    为了计算 dp[i]，你需要知道爬到第 i-1 级和爬到第 i-2 级的方法数，因为你可以从 i-1 级走一步到达 i 级，或者从 i-2 级走两步到达 i 级。
    
    因此，状态转移方程为：
        dp[i] = dp[i-1] + dp[i-2]



    🍊 为什么需要长度为 n + 1 的数组 
    为了更直观地理解这一点，让我们通过一个具体的例子来说明。

    例子：n = 3

    假设我们有 3 级台阶，编号为 1, 2, 3。为了计算 dp[3]，我们需要知道 dp[2] 和 dp[1]。同样，为了计算 dp[2]，我们需要知道 dp[1] 和 dp[0]。

    因此，我们需要一个数组来存储从第 0 级（地面）到第 3 级台阶的所有 dp 值。

    索引 i	说明
    dp[0]	在地面（第 0 级）的方法数
    dp[1]	爬到第 1 级的方法数
    dp[2]	爬到第 2 级的方法数
    dp[3]	爬到第 3 级的方法数
    总共有 n + 1 = 4 个状态需要存储。因此，数组的长度必须是 n + 1。


 */
/**
* 爬楼梯问题
* @param {number} n - 台阶的总数
* @return {number} - 爬到第 n 级台阶的方法总数
*/
function climbStairs(n) {
  // 如果只有 0 级或 1 级台阶，只有一种方法
  if (n === 0 || n === 1) {
    return 1;
  }

  // 创建一个长度为 n + 1 的数组，用于存储每一级台阶的方法数
  const dp = new Array(n + 1);

  // 初始化第 0 级和第 1 级台阶的方法数
  dp[0] = 1; // 在地面的方法数
  dp[1] = 1; // 爬到第 1 级的方法数

  // 从第 2 级开始计算每一级台阶的方法数
  for (let i = 2; i <= n; i++) {
    // 每一级台阶的方法数等于前两级台阶的方法数之和
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  // 返回第 n 级台阶的方法数
  return dp[n];
}

// 示例使用
const totalStairs = 5;
console.log(`爬到第 ${totalStairs} 级台阶的方法总数是：${climbStairs(totalStairs)}`);
// 输出: 爬到第 5 级台阶的方法总数是：8











//  优化 🍒
// 优化空间复杂度
// 上述方法使用了一个长度为 n + 1 的数组，空间复杂度为 O(n)。实际上，我们只需要记录前两级台阶的方法数，因此可以优化空间复杂度至 O(1)。

/**
 * 优化后的爬楼梯问题，空间复杂度 O(1)
 * @param {number} n - 台阶的总数
 * @return {number} - 爬到第 n 级台阶的方法总数
 */
function climbStairsOptimized(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  // 初始化前两级台阶的方法数
  let first = 1; // dp[0]
  let second = 1; // dp[1]
  let current = 0;

  // 迭代计算每一级台阶的方法数
  for (let i = 2; i <= n; i++) {
    current = first + second; // dp[i] = dp[i-1] + dp[i-2]
    first = second; // 更新 dp[i-2] 为 dp[i-1]
    second = current; // 更新 dp[i-1] 为 dp[i]
  }

  return current;
}

// 示例使用
const totalStairsOptimized = 5;
console.log(`优化后，爬到第 ${totalStairsOptimized} 级台阶的方法总数是：${climbStairsOptimized(totalStairsOptimized)}`);
// 输出: 优化后，爬到第 5 级台阶的方法总数是：8



















// ---------------------------------------------------------------------------------
/**
 * @param {number} n - 需要爬的楼梯阶数
 * @return {number} - 返回不同的方法数
 */
function climbStairs2(n) {
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
// console.log(climbStairs2(n)); // 输出 8


// console.log(Array(3)) // [empty x 3]
// console.log(Array(3, 4, 1)) // [3, 4]
