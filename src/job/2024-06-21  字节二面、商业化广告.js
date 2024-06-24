/**
 * 数组查找
 * 
 * 实现一个ts函数，findClosest
 * 该函数接受两个参数：一个升序排列的整数数组arr 和 一个目标整数 target
 * 函数的目标是找到数组中与target最接近的整数，并返回这个整数
 * 如果存在多个与target等距离的整数，返回数组中第一个出现的
 */

// 面试的时候  二分查找 都没写出来， 临界条件卡死了，死循环了都

/**
 * 找到与目标整数最接近的整数
 * @param {number[]} arr - 升序排列的整数数组
 * @param {number} target - 目标整数
 * @returns {number} - 数组中与目标整数最接近的整数
 */
function findClosest(arr, target) {
  if (arr.length === 0) {
    throw new Error("数组不能为空");
  }

  let closest = arr[0];
  let minDiff = Math.abs(arr[0] - target);

  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - target);

    if (diff < minDiff) {
      minDiff = diff;
      closest = arr[i];
    } else if (diff === minDiff) {
      // 如果差值相同，第一个出现的最接近整数已经在 closest 中
      continue;
    }
  }

  return closest;
}

// 测试用例
const arr1 = [1, 2, 4, 5, 6, 8, 9];
const target1 = 7;
console.log(findClosest(arr1, target1)); // 输出: 6

const arr2 = [1, 2, 4, 5, 6, 8, 9];
const target2 = 5;
console.log(findClosest(arr2, target2)); // 输出: 5

const arr3 = [1, 3, 3, 4];
const target3 = 2;
console.log(findClosest(arr3, target3)); // 输出: 1
