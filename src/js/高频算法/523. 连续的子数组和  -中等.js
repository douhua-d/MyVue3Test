// 523. 连续的子数组和  中等

/**
 * 给你一个整数数组 nums 和一个整数 k ，如果 nums 有一个 好的子数组 返回 true ，否则返回 false：
 *
 * 一个 好的子数组 是：
 *
 * 长度 至少为 2 ，且
 * 子数组元素总和为 k 的倍数。
 * 注意：
 *
 * 子数组 是数组中 连续 的部分。
 * 如果存在一个整数 n ，令整数 x 符合 x = n * k ，则称 x 是 k 的一个倍数。0 始终 视为 k 的一个倍数。
 *
 *
 * 示例 1：
 *
 * 输入：nums = [23,2,4,6,7], k = 6
 * 输出：true
 * 解释：[2,4] 是一个大小为 2 的子数组，并且和为 6 。
 * 示例 2：
 *
 * 输入：nums = [23,2,6,4,7], k = 6
 * 输出：true
 * 解释：[23, 2, 6, 4, 7] 是大小为 5 的子数组，并且和为 42 。
 * 42 是 6 的倍数，因为 42 = 7 * 6 且 7 是一个整数。
 */

/**
 * 解题思路
 * 前缀和概念：
 *
 * 计算数组的前缀和，即从数组开始到当前位置的元素和。
 * 如果两个前缀和对 k 取模得到相同的结果，说明这两个位置之间的子数组的和是 k 的倍数。
 * 利用哈希表：
 *
 * 使用哈希表来存储前缀和对 k 取模的结果以及对应的下标。
 * 如果两个前缀和对 k 取模的结果相同但是它们的下标之差大于等于 2，说明存在一个子数组满足题目条件。
 * 
 * 
 * 步骤：
 *
 * 初始化一个哈希表 modMap，存放前缀和对 k 取模的结果和对应的下标。
 * 初始化 sum 为 0 表示前缀和的累积和。
 * 遍历数组，累加得到 sum，并计算 currentMod 为 sum % k。
 * 如果 currentMod 为负数，则加上 k 使其变为正数（因为负数取模结果可能为负）。
 * 如果 currentMod 已经在 modMap 中存在，且它的下标与当前下标的差值大于等于 2，则找到一个满足条件的子数组，返回 true。
 * 否则，将 currentMod 和当前下标存入 modMap。
 * 返回结果：
 *
 * 如果遍历结束都没有找到满足条件的子数组，返回 false。

 */

// 示例分析
// 示例 1
// 对于数组 [23, 2, 4, 6, 7] 和 k = 6：
// 
// sum_0 = 23 % 6 = 5
// sum_1 = (23 + 2) % 6 = 1
// sum_2 = (23 + 2 + 4) % 6 = 5
// sum_3 = (23 + 2 + 4 + 6) % 6 = 5
// sum_4 = (23 + 2 + 4 + 6 + 7) % 6 = 0
// 注意，sum_0、sum_2 和 sum_3 对 6 取模结果都是 5。sum_0 和 sum_2 表示从位置 1 到 2 的子数组 [2, 4] 的和是 6 的倍数。


/**
 * 更详细的解释
 * 原始结果：-7 % 3 = -1
 * 加上模数：-1 + 3 = 2
 * 再次取模：2 % 3 = 2
 * 这个修正确保了结果 2 是在范围 [0, 3) 内，这是一个非负数。
 * 
 * function mod(a, b) {
 *     return ((a % b) + b) % b;
 * }
 *
 * console.log(mod(-7, 3)); // 输出：2
 * console.log(mod(7, -3)); // 输出：1
 * console.log(mod(7, 3)); // 输出：1
 * console.log(mod(-7, -3)); // 输出：-1
 * 
 * 
 * @param nums
 * @param k
 * @returns {boolean}
 */

function checkSubarraySum(nums, k) {
  const n = nums.length;
  if (n < 2) return false;

  let modMap = new Map();
  modMap.set(0, -1); // 初始化，表示前缀和为0的位置是-1

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    let currentMod = sum % k;

    if (currentMod < 0) {
      currentMod += k; // 负数取模的修正
    }

    if (modMap.has(currentMod)) {
      let prevIndex = modMap.get(currentMod);
      if (i - prevIndex >= 2) {
        return true;
      }
    } else {
      modMap.set(currentMod, i);
    }
  }

  return false;
}

// 示例
console.log(checkSubarraySum([23, 2, 4, 6, 7], 6)); // 输出: true，因为[2, 4]是6的倍数
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6)); // 输出: true，因为[23, 2, 6, 4]是6的倍数
console.log(checkSubarraySum([23, 2, 6, 4, 7], 13)); // 输出: false，没有长度至少为2的子数组使得和为13的倍数
