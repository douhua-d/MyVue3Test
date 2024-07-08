/**
 * /**
 *  * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 *  *
 *  * 请必须使用时间复杂度为 O(log n) 的算法。
 *  *
 *  *
 *  *
 *  * 示例 1:
 *  *
 *  * 输入: nums = [1,3,5,6], target = 5
 *  * 输出: 2
 *  * 示例 2:
 *  *
 *  * 输入: nums = [1,3,5,6], target = 2
 *  * 输出: 1
 *  * 示例 3:
 *  *
 *  * 输入: nums = [1,3,5,6], target = 7
 *  * 输出
 */

// 要实现这个功能，可以使用二分查找算法。二分查找算法的时间复杂度为 O(log n)，非常适合这个需求。
/**
 * 在排序数组中找到目标值的索引，如果不存在则返回应插入的位置
 * @param {number[]} nums - 排序数组
 * @param {number} target - 目标值
 * @return {number} - 目标值的索引或插入位置
 */
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

// 示例测试
console.log(searchInsert([1, 3, 5, 6], 5)); // 输出: 2
console.log(searchInsert([1, 3, 5, 6], 2)); // 输出: 1
console.log(searchInsert([1, 3, 5, 6], 7)); // 输出: 4
console.log(searchInsert([1, 3, 5, 6], 0)); // 输出: 0
