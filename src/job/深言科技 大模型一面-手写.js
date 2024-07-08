/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 *
 * 请必须使用时间复杂度为 O(log n) 的算法。
 *
 *
 *
 * 示例 1:
 *
 * 输入: nums = [1,3,5,6], target = 5
 * 输出: 2
 * 示例 2:
 *
 * 输入: nums = [1,3,5,6], target = 2
 * 输出: 1
 * 示例 3:
 *
 * 输入: nums = [1,3,5,6], target = 7
 * 输出: 4
 */


// todo 好好看题， 这时间复杂度不是O(log n) 的算法。 应该用二分查找
function findTarget(arr, target) {
  let closetIndex = 0;
  let minDiff = Math.abs(arr[closetIndex] - target);
  if (arr[closetIndex] === target) {
    return closetIndex;
  }
  for (let i = 1; i < arr.length; i++) {
    let diff = Math.abs(arr[i] - target);
    if (diff < minDiff) {
      closetIndex = i;
    } else if (diff === 0) {
      return i;
    }
  }

  return closetIndex + 1;

}

console.log(findTarget([1, 3, 5, 6], 2)); // 输出: 1

function searchTarget(arr, target) {
  let left = 0;
  let right = target.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}