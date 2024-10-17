// 7. 整数反转  中等

/**
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 *
 * 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
 *
 * 假设环境不允许存储 64 位整数（有符号或无符号）。
 *
 *
 * 示例 1：
 *
 * 输入：x = 123
 * 输出：321
 *
 *
 * 示例 2：
 * 输入：x = -123
 * 输出：-321
 *
 *
 * 示例 3：
 * 输入：x = 120
 * 输出：21
 *
 *
 * 示例 4：
 * 输入：x = 0
 * 输出：0
 *
 *
 * 提示：
 *
 * -231 <= x <= 231 - 1
 */

function reverse(x) {
    // 定义 32 位有符号整数的范围
    const MAX_INT = 2 ** 31 - 1; // 2147483647
    const MIN_INT = -(2 ** 31);  // -2147483648

    let result = 0;
    let num = Math.abs(x);

    while (num !== 0) {
        let digit = num % 10;
        num = Math.floor(num / 10);

        // 检查是否溢出
        if (result > (MAX_INT - digit) / 10) {
            return 0;
        }

        result = result * 10 + digit;
    }

    return x < 0 ? -result : result;
}

// 示例使用
console.log(reverse(123));    // 输出: 321
console.log(reverse(-123));   // 输出: -321
console.log(reverse(120));    // 输出: 21
console.log(reverse(0));      // 输出: 0
console.log(reverse(1534236469)); // 输出: 0 (反转后溢出)






/**
 * @param {number} x - 输入的32位有符号整数
 * @return {number} - 反转后的整数，如果溢出则返回0
 */
function reverse2(x) {
    // 定义32位有符号整数的范围
    const INT_MAX = 2 ** 31 - 1; // 2147483647
    const INT_MIN = -(2 ** 31);  // -2147483648

    // 记录原整数的符号
    const sign = x < 0 ? -1 : 1;

    // 转换为字符串并去除符号
    const reversedStr = Math.abs(x).toString().split('').reverse().join('');

    // 转换回整数并恢复符号
    const reversedNum = sign * parseInt(reversedStr, 10);

    // 检查是否溢出
    if (reversedNum < INT_MIN || reversedNum > INT_MAX) {
        return 0;
    }

    return reversedNum;
}

// 测试用例
const testCases = [
    { input: 123, expected: 321 },
    { input: -123, expected: -321 },
    { input: 120, expected: 21 },
    { input: 0, expected: 0 },
    { input: 1534236469, expected: 0 }, // 溢出
    { input: -2147483648, expected: 0 }, // 溢出
];

testCases.forEach(({ input, expected }, index) => {
    const result = reverse2(input);
    console.log(`测试用例 ${index + 1}: 输入 = ${input}, 期望 = ${expected}, 得到 = ${result}`);
});

