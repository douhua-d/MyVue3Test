// 300. 最长递增子序列  中等
/**
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 *
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的
 * 子序列
 * 。
 *
 *
 * 示例 1：
 *
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 * 示例 2：
 *
 * 输入：nums = [0,1,0,3,2,3]
 * 输出：4
 * 示例 3：
 *
 * 输入：nums = [7,7,7,7,7,7,7]
 * 输出：1
 */

function lengthOfLIS (nums) {
    if (nums.length === 0) return 0; // 如果数组为空，返回0

    const dp = new Array(nums.length).fill(1); // 初始化dp数组，所有元素都设为1

    for (let i = 1; i < nums.length; i++) { // 从第二个元素开始遍历
        for (let j = 0; j < i; j++) { // 遍历i之前的所有元素
            if (nums[j] < nums[i]) { // 如果nums[j]小于nums[i]，说明可以形成递增子序列
                dp[i] = Math.max(dp[i], dp[j] + 1); // 更新dp[i]的值
            }
        }
    }

    return Math.max(...dp); // 返回dp数组中的最大值
}

// 测试用例
const nums1 = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums1)); // 输出: 4

const nums2 = [0, 1, 0, 3, 2, 3];
console.log(lengthOfLIS(nums2)); // 输出: 4

const nums3 = [7, 7, 7, 7, 7, 7, 7];
console.log(lengthOfLIS(nums3)); // 输出: 1

const nums4 = [10, 20, 10, 30, 40, 50];
console.log(lengthOfLIS(nums4)); // 输出: 5
