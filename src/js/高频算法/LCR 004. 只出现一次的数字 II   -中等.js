// LCR 004. 只出现一次的数字 II   -中等
/**
 * 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [2,2,3,2]
 * 输出：3
 * 示例 2：
 *
 * 输入：nums = [0,1,0,1,0,1,100]
 * 输出：100
 */

const singleNumber = (nums) => {
    const count = new Map();
    for (let num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }

    for (let item of count.entries()) {
        const [key, val] = item;
        if (val === 1) {
            return key;
        }
    }
};