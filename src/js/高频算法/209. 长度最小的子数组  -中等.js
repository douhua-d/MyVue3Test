// 209. 长度最小的子数组  -中等

/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 *
 * 找出该数组中满足其总和大于等于 target 的长度最小的
 * 子数组
 *  [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 * 示例 2：
 *
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 * 示例 3：
 *
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 */


function minSubArrayLen(target, nums) {
  let n = nums.length;
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < n; right++) {
    sum += nums[right];

    // todo 需要遍历所有的，不停地记录最小值，直到最后
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

// 示例 1
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 输出：2

// 示例 2
console.log(minSubArrayLen(4, [1, 4, 4])); // 输出：1

// 示例 3
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); // 输出：0

