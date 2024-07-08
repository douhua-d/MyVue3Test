/**
 * 二分查找函数
 * @param {Array} arr - 已排序的数组
 * @param {number} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回 -1
 */
function binarySearch(arr, target) {
  // 初始化左指针
  let left = 0;

  // 初始化右指针
  let right = arr.length - 1;

  // 循环进行查找，直到左指针超过右指针
  while (left <= right) {
    // 计算中间索引
    const mid = Math.floor((left + right) / 2);

    // 获取中间索引处的值
    const midValue = arr[mid];

    // 检查中间值是否等于目标值
    if (midValue === target) {
      // 找到目标值，返回其索引
      return mid;
    } else if (midValue < target) {
      // 如果中间值小于目标值，则调整左指针，排除左半部分
      left = mid + 1;
    } else {
      // 如果中间值大于目标值，则调整右指针，排除右半部分
      right = mid - 1;
    }
  }

  // 如果未找到目标值，返回 -1
  return -1;
}

// 测试用例
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const targetValue = 7;

const result = binarySearch(sortedArray, targetValue);
console.log(result); // 输出: 6 (目标值 7 在数组中的索引)


function search(arr, target, left, right) {
  let targetIndex = -1;
  let mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return targetIndex;
  }

  if (left >= right) {
    return targetIndex;
  }

  if (arr[mid] < target) {
    return search(arr, target, mid + 1, right);
  } else {
    return search(arr, target, left, mid - 1);
  }
}


function search(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    }
    if (arr[mid] > target) {
      right = mid - 1;
    }
  }
  return targetIndex;
}