//  缺失的第一个正数  

// 困难等级

//  给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
// 
// 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

/**
 * 示例 1：
 *
 * 输入：nums = [1,2,0]
 * 输出：3
 * 解释：范围 [1,2] 中的数字都在数组中。
 * 示例 2：
 *
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 * 解释：1 在数组中，但 2 没有。
 * 示例 3：
 *
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 * 解释：最小的正数 1 没有出现。
 */

/**
 * 找出缺失的第一个正整数
 * @param {number[]} nums - 未排序的整数数组
 * @return {number} - 缺失的第一个正整数
 */
function firstMissingPositive(nums) {
  const n = nums.length;

  // 第一步：将不在 [1, n] 范围内的数变成 n+1
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0 || nums[i] > n) {
      nums[i] = n + 1;
    }
  }

  // 第二步：将出现过的数的对应位置标记为负数
  for (let i = 0; i < n; i++) {
    const num = Math.abs(nums[i]);
    if (num > n) continue;
    nums[num - 1] = -Math.abs(nums[num - 1]);
  }

  // 第三步：找到第一个正数的位置
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }

  // 如果都存在，则返回 n+1
  return n + 1;
}

// 示例测试
console.log(firstMissingPositive([1, 2, 0])); // 输出: 3
console.log(firstMissingPositive([3, 4, -1, 1])); // 输出: 2
console.log(firstMissingPositive([7, 8, 9, 11, 12])); // 输出: 1


//第一版  OK的  力扣中运行也是没问题的   todo 用这版吧
function firstMissingPositive(nums) {
  nums = nums.filter(item => item > 0);
  if (nums.length) {
    nums.sort((a, b) => a - b);
    if (nums[0] !== 1) {
      return 1;
    } else {
      for (let i = 0; i < nums.length; i++) {
        if (nums[i + 1] - nums[i] > 1) {
          return nums[i] + 1;
        }
      }
      return nums[nums.length - 1] + 1;
    }
  }
  return 1;
}

// 第二版 优化 不对所有的内容进行排序  使用选择排序  每次找到最小的元素
function firstMissingPositive2(nums) {
  nums = nums.filter(item => item > 0);
  for (let i = 0; i < nums.length; i++) {
    let min = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < min) {
        let c = min;
        min = nums[j];
        nums[j] = c;
      }
    }
    nums[i] = min;
    if (i > 0) {
      if (nums[i] - nums[i - 1] > 1) {
        return nums[i - 1] + 1;
      }
    } else {
      if (min !== 1) {
        return 1;
      }
    }
  }
  return nums.length ? nums.pop() + 1 : 1;
}

console.log(firstMissingPositive2([1, 2, 0]));
console.log(firstMissingPositive2([3, 4, -1, 1]));
console.log(firstMissingPositive2([7, 8, 9, 11, 12]));