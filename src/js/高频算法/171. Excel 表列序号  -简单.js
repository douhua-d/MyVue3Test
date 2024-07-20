// 171. Excel 表列序号  简单
/**
 * 给你一个字符串 columnTitle ，表示 Excel 表格中的列名称。返回 该列名称对应的列序号 。
 *
 * 例如：
 *
 * A -> 1
 * B -> 2
 * C -> 3
 * ...
 * Z -> 26
 * AA -> 27
 * AB -> 28
 * ...
 *
 *
 * 示例 1:
 *
 * 输入: columnTitle = "A"
 * 输出: 1
 * 示例 2:
 *
 * 输入: columnTitle = "AB"
 * 输出: 28
 * 示例 3:
 *
 * 输入: columnTitle = "ZY"
 * 输出: 701
 */

/**
 * 将 Excel 列名称转换为对应的列序号
 * @param {string} columnTitle - Excel 列名称
 * @returns {number} - 对应的列序号
 */



// 解释：
// 
// let result = 0;：初始化 result 变量，用于存储列序号的计算结果。
// for (let i = 0; i < columnTitle.length; i++)：遍历列名称中的每一个字符。
// columnTitle.charCodeAt(i) - 'A'.charCodeAt(0) + 1：计算当前字符在 1-26 范围内的值。charCodeAt(i) 方法获取字符的 Unicode 编码值，'A'.charCodeAt(0) 获取字符 'A' 的 Unicode 编码值，通过减法计算当前字符的值。
// result = result * 26 + charValue;：更新 result 值，将之前的结果乘以 26（以处理位数进位），并加上当前字符的值。
// return result;：返回最终的列序号。


function titleToNumber (columnTitle) {
    let result = 0; // 用于存储最终的列序号

    // 遍历列名称中的每一个字符
    for (let i = 0; i < columnTitle.length; i++) {
        // 获取当前字符的 ASCII 码，并计算其在 1-26 范围内的值
        const charValue = columnTitle.charCodeAt(i) - 'A'.charCodeAt(0) + 1;

        // 更新结果值，将之前的结果乘以 26，并加上当前字符的值
        result = result * 26 + charValue;
    }

    return result; // 返回最终计算得到的列序号
}

// 示例
console.log(titleToNumber('A'));  // 输出: 1
console.log(titleToNumber('AB')); // 输出: 28
console.log(titleToNumber('ZY')); // 输出: 701

console.log('a'.charCodeAt(0));  // 97
console.log('b'.charCodeAt(0));  // 98

console.log('A'.charCodeAt(0));  // 65
console.log('B'.charCodeAt(0));  // 66
