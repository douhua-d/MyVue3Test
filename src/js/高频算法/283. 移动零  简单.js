/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 *
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 *
 *
 *
 * 示例 1:
 *
 * 输入: nums = [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 */


function moveZeroes(nums) {
  let nonZeroIndex = 0;

  // 遍历数组，将非零元素移到前面
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex] = nums[i];
      nonZeroIndex++;
    }
  }

  // 将剩余的位置填充为零
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
}

// 示例
let nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
console.log(nums); // 输出: [1, 3, 12, 0, 0]


/**
 * 移除零元素：
 *
 * 使用 splice(i, 1) 方法移除当前位置的零元素。splice 方法会修改原数组，将从索引 i 开始的一个元素删除，并返回被删除的元素组成的数组。
 * 末尾补零：
 *
 * 使用 nums.push(0) 将一个 0 添加到数组的末尾。这样做可以保持非零元素的相对顺序，并将所有 0 移动到末尾。
 * 调整循环索引和长度：
 *
 * 因为使用了 splice 删除了一个元素，为了避免跳过一个元素，需要将索引 i 减一，并且将 len 也减一，以保持正确的循环范围。
 * @param nums
 * @returns {*}
 * 
 * 
 * 问题与改进：
 * 效率问题：这种方法每次遇到零元素时，会触发 splice 和 push 操作，导致数组的频繁修改，时间复杂度为 O(n^2)，不够高效。
 * 不符合原地操作要求：题目要求在不复制数组的情况下原地操作，但这种方法实际上修改了原数组，因为 splice 方法会直接改变数组
 */
var moveZeroes = function(nums) {
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
      i--;
      len--;
    }
  }
  return nums;
};