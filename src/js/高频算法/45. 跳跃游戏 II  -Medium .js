/**
 * 示例 1:
 *
 * 输入: nums = [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 *      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 * 
 * 
 * 贪心算法解释
    贪心算法通过在每一步都选择当前能够到达的最远位置，从而确保总跳跃次数最少。具体步骤如下：

    初始化：

    jumps：记录跳跃的次数。
    currentEnd：当前跳跃范围的结束位置。
    farthest：在当前跳跃范围内可以到达的最远位置。


    复杂度分析
      时间复杂度： O(n)，其中 n 是数组的长度。我们只需遍历数组一次。
      空间复杂度： O(1)，只使用了常数级别的额外空间。


      为什么不遍历到最后一个元素？
          目标是到达最后一个位置：

          我们的目标是从数组的第一个元素跳跃到最后一个元素。实际上，一旦我们确定可以从某个位置跳跃到最后一个位置或更远，就不需要再从最后一个位置继续跳跃。
          无需从最后一个位置再跳跃：

          最后一个位置是我们的终点，不需要从那里再进行跳跃。因此，遍历到倒数第二个位置即可，因为我们需要从这些位置中找到跳跃到最后一个位置的路径。
          避免不必要的计算：

          如果我们遍历到最后一个位置，会导致多余的计算，因为在达到最后一个位置后，我们已经完成了任务，不需要进一步处理

          具体示例分析
            以 nums = [2, 3, 1, 1, 4] 为例：

            索引 0：

            可以跳跃到索引 1 或 2（因为 nums[0] = 2）。
            索引 1：

            可以跳跃到索引 2、3 或 4（因为 nums[1] = 3）。
            索引 2 和 索引 3：

            虽然这些位置也可以进行跳跃，但在这个例子中，从索引 1 跳跃到索引 4 就已经达到了终点。
            索引 4：

            这是最后一个位置，不需要再跳跃。
            因此，遍历到索引 3（即 nums.length - 2）时，已经足够确定最小跳跃次数。
 */

function jump(nums) {
  let jumps = 0;         // 记录总共的跳跃次数
  let current_end = 0;   //   // 当前跳跃范围的结束位置
  let farthest = 0;      // 当前跳跃范围内可以到达的最远位置

  //  循环会遍历到数组的倒数第二个元素
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