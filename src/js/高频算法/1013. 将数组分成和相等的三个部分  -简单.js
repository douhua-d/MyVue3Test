// 1013. 将数组分成和相等的三个部分  -简单
/**
 * 给你一个整数数组 arr，只有可以将其划分为三个和相等的 非空 部分时才返回 true，否则返回 false。
 *
 * 形式上，如果可以找出索引 i + 1 < j 且满足 (arr[0] + arr[1] + ... + arr[i] == arr[i + 1] + arr[i + 2] + ... + arr[j - 1] == arr[j] + arr[j + 1] + ... + arr[arr.length - 1]) 就可以将数组三等分。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [0,2,1,-6,6,-7,9,1,2,0,1]
 * 输出：true
 * 解释：0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1
 * 示例 2：
 *
 * 输入：arr = [0,2,1,-6,6,7,9,-1,2,0,1]
 * 输出：false
 * 示例 3：
 *
 * 输入：arr = [3,3,6,5,-2,2,5,1,-9,4]
 * 输出：true
 * 解释：3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4
 */


/**
 * 判断是否可以将数组分成和相等的三个部分
 * @param {number[]} arr - 输入的整数数组
 * @returns {boolean} - 是否可以将数组分成和相等的三个部分
 */
function canThreePartsEqualSum (arr) {
    const totalSum = arr.reduce((a, b) => a + b, 0);

    // 如果总和不能被 3 整除，则不可能分成三个和相等的部分
    if (totalSum % 3 !== 0) return false;

    const targetSum = totalSum / 3;
    let currentSum = 0;
    let count = 0;

    for (const num of arr) {
        currentSum += num;
        if (currentSum === targetSum) {
            currentSum = 0;
            count++;
        }
    }

    // 要找到恰好三个相等的部分
    return count >= 3;
}

// 示例
console.log(canThreePartsEqualSum([0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1])); // 输出: true
console.log(canThreePartsEqualSum([0, 2, 1, -6, 6, 7, 9, -1, 2, 0, 1])); // 输出: false
console.log(canThreePartsEqualSum([3, 3, 6, 5, -2, 2, 5, 1, -9, 4])); // 输出: true
