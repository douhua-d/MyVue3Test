// 剑指 offer 03.数组中重复的数字   -简单

// 方法一：使用哈希表
/**
 * 找到数组中重复的数字
 * @param {number[]} nums - 输入数组
 * @return {number} - 第一个重复的数字
 */
function findRepeatNumber (nums) {
    // 创建一个哈希表来记录出现过的数字
    const seen = new Set();

    // 遍历数组
    for (let num of nums) {
        // 如果数字已经在哈希表中，返回这个数字
        if (seen.has(num)) {
            return num;
        }
        // 否则将数字添加到哈希表中
        seen.add(num);
    }

    // 如果没有找到重复的数字，返回 -1
    return -1;
}

// 测试示例
console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3])); // 输出: 2


// 方法二：原地置换
// 这种方法不需要额外的空间，但会改变输入数组。我们将数字放置到它们应该在的位置上，如果发现某个位置上已经有正确的数字，那么这个数字就是重复的。
/**
 * 找到数组中重复的数字
 * @param {number[]} nums - 输入数组
 * @return {number} - 第一个重复的数字
 */
function findRepeatNumber (nums) {
    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 当当前位置的数字不等于它的索引时
        while (nums[i] !== i) {
            // 如果当前位置的数字和目标位置的数字相同，则找到重复数字
            if (nums[i] === nums[nums[i]]) {
                return nums[i];
            }
            // 否则交换两个数字的位置
            [nums[i], nums[nums[i]]] = [nums[nums[i]], nums[i]];
        }
    }

    // 如果没有找到重复的数字，返回 -1
    return -1;
}

// 测试示例
console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3])); // 输出: 2

