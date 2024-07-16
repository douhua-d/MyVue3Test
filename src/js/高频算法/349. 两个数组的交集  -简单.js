// 349. 两个数组的交集  简单

/**
 * 给定两个数组 nums1 和 nums2 ，返回 它们的
 * 交集
 *  。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 * 示例 2：
 *
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[9,4]
 */

const intersection = (nums1, nums2) => {
  let res = [];
  for (let val of nums2) {
    if (nums1.includes(val)) {
      res.push(val);
    }
  }
  return [...new Set(res)];
};

function intersection(nums1, nums2) {
  // 使用集合去重
  let set1 = new Set(nums1);
  let set2 = new Set(nums2);

  // 结果数组
  let result = [];

  // 遍历 set1 并检查是否在 set2 中
  for (let num of set1) {
    if (set2.has(num)) {
      result.push(num);
    }
  }

  return result;
}

// 示例使用
let nums1 = [1, 2, 2, 1];
let nums2 = [2, 2];
console.log(intersection(nums1, nums2)); // 输出: [2]

nums1 = [4, 9, 5];
nums2 = [9, 4, 9, 8, 4];
console.log(intersection(nums1, nums2)); // 输出: [9, 4] 或 [4, 9]
