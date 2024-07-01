/**
 * 示例 1:
 *
 * 输入: nums = [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 *      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 */

function jump(nums) {
  let jumps = 0;         // 记录总共的跳跃次数
  let current_end = 0;   // 当前跳跃的最远位置
  let farthest = 0;      // 能到达的最远位置

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]); // 更新能到达的最远位置

    // 当达到当前跳跃的最远位置时，需要进行一次新的跳跃
    if (i === current_end) {
      jumps++;                   // 增加跳跃计数
      current_end = farthest;    // 更新当前跳跃的最远位置

      // 提前结束循环，如果已经可以到达或超过最后一个位置
      if (current_end >= nums.length - 1) {
        break;
      }
    }
  }

  return jumps;
}

// 测试用例
console.log(jump([2, 3, 1, 1, 4])); // 输出: 2
console.log(jump([2, 3, 0, 1, 4])); // 输出: 2



// 通义千问

var jump = function (nums) {
  let step = 0;       // 当前步数
  let maxReach = 0;   // 当前能到达的最远距离
  let end = 0;        // 当前步能到达的最远边界

  for (let i = 0; i < nums.length - 1; i++) { // 不包括最后一个位置，因为到达了最后一个位置就结束了
    maxReach = Math.max(maxReach, i + nums[i]); // 计算从当前位置开始能跳的最远距离

    if (i === end) { // 如果到达了当前步的最远边界
      step++; // 增加一步
      end = maxReach; // 更新最远边界为当前能到达的最远距离
    }
  }

  return step; // 返回最小跳跃次数
};