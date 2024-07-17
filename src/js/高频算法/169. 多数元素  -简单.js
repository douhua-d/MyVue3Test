// 169. 多数元素  简单

/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 *
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [3,2,3]
 * 输出：3
 * 示例 2：
 *
 * 输入：nums = [2,2,1,1,1,2,2]
 * 输出：2
 */

// 方法一：哈希表计数
function majorityElement(nums) {
  // 创建一个对象来记录每个元素的出现次数
  const counts = {};
  // 遍历数组中的每个元素
  for (const num of nums) {
    // 如果元素在counts对象中不存在，则初始化为0，然后增加计数
    counts[num] = (counts[num] || 0) + 1;
    // 如果当前元素的计数大于数组长度的一半，则返回该元素
    if (counts[num] > nums.length / 2) {
      return num;
    }
  }
}

// 示例
const nums1 = [3, 2, 3];
console.log(majorityElement(nums1)); // 输出: 3

const nums2 = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(nums2)); // 输出: 2

// 方法二：排序法
// 将数组排序，排序后数组中间的元素即为多数元素，因为多数元素的数量超过一半。

function majorityElement(nums) {
  // 对数组进行排序
  nums.sort((a, b) => a - b);
  // 返回排序后中间位置的元素
  return nums[Math.floor(nums.length / 2)];
}

// 示例
const nums1 = [3, 2, 3];
console.log(majorityElement(nums1)); // 输出: 3

const nums2 = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(nums2)); // 输出: 2

