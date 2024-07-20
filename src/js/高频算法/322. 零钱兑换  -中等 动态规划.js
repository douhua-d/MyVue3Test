// 322. 零钱兑换  -中等 动态规划

/**
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 *
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 *
 * 你可以认为每种硬币的数量是无限的。
 *
 *
 *
 * 示例 1：
 *
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3
 * 解释：11 = 5 + 5 + 1
 * 示例 2：
 *
 * 输入：coins = [2], amount = 3
 * 输出：-1
 * 示例 3：
 *
 * 输入：coins = [1], amount = 0
 * 输出：0
 */


// 思路
// 我们使用一个一维数组 dp，其中 dp[i] 表示凑成金额 i 所需的最少硬币个数。动态规划的思想是，从小到大计算每个金额所需的最少硬币数，直到达到 amount。
// 
// 步骤
// 初始化：
// 
// 创建一个长度为 amount + 1 的数组 dp，并将所有元素初始化为 Infinity（表示无法凑成该金额）。
// dp[0] = 0，因为凑成金额 0 需要 0 个硬币。
// 填表：
// 
// 对于每个金额 i，我们尝试用每种硬币面额 coin 来更新 dp[i] 的值。
// 如果当前金额 i 大于等于 coin，则更新 dp[i] 为 dp[i - coin] + 1。
// 返回结果：
// 
// 如果 dp[amount] 仍然是 Infinity，则返回 -1；否则返回 dp[amount]。


/**
 * 动态规划核心思想
 * 动态规划的核心思想是利用已知的子问题的解来构造更大问题的解。对于零钱兑换问题，dp[i] 表示凑成金额 i 所需的最少硬币个数。
 *
 * 解释步骤
 * 当前金额 i 大于等于 coin：
 *
 * 我们尝试使用当前硬币 coin 来构成金额 i。
 * 例如，假设我们有硬币面额为 5，当前金额 i 为 11，那么 11 可以由 5 加上 6（即 11 - 5）构成。
 * 更新 dp[i]：
 *
 * 如果我们使用当前硬币 coin，那么凑成金额 i 所需的硬币数可以表示为 dp[i - coin] + 1。
 * dp[i - coin] 表示凑成金额 i - coin 所需的最少硬币数。
 * + 1 表示再加上当前使用的一个 coin。
 * 取最小值：
 *
 * 我们需要找到凑成金额 i 的所有可能的硬币组合中的最小值。
 * 因此，我们将 dp[i] 更新为 Math.min(dp[i], dp[i - coin] + 1)。
 * @param coins
 * @param amount
 * @returns {number|any}
 */

function coinChange (coins, amount) {
    // 创建一个长度为 amount + 1 的数组 dp，并将所有元素初始化为 Infinity
    const dp = Array(amount + 1).fill(Infinity);
    // dp[0] 表示凑成金额 0 所需的最少硬币数，为 0
    dp[0] = 0;

    // 遍历从 1 到 amount 的每个金额
    for (let i = 1; i <= amount; i++) {
        // 对于每个金额，尝试使用每种硬币
        for (const coin of coins) {
            // 如果当前金额大于等于硬币面额
            if (i - coin >= 0) {
                // 更新 dp[i] 为使用当前硬币后的最小硬币数
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // 如果 dp[amount] 仍为 Infinity，说明无法凑成该金额，返回 -1
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// 示例 1
console.log(coinChange([1, 2, 5], 11)); // 输出：3
// 示例 2
console.log(coinChange([2], 3)); // 输出：-1
// 示例 3
console.log(coinChange([1], 0)); // 输出：0
