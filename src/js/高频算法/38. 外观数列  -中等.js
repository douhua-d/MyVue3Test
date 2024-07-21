// 38. 外观数列  -中等
/**
 *
 * 相关标签
 * 相关企业
 * 提示
 * 「外观数列」是一个数位字符串序列，由递归公式定义：
 *
 * countAndSay(1) = "1"
 * countAndSay(n) 是 countAndSay(n-1) 的行程长度编码。
 *
 *
 * 行程长度编码（RLE）是一种字符串压缩方法，其工作原理是通过将连续相同字符（重复两次或更多次）替换为字符重复次数（运行长度）和字符的串联。例如，要压缩字符串 "3322251" ，我们将 "33" 用 "23" 替换，将 "222" 用 "32" 替换，将 "5" 用 "15" 替换并将 "1" 用 "11" 替换。因此压缩后字符串变为 "23321511"。
 *
 * 给定一个整数 n ，返回 外观数列 的第 n 个元素。
 *
 * 示例 1：
 *
 * 输入：n = 4
 *
 * 输出："1211"
 *
 * 解释：
 *
 * countAndSay(1) = "1"
 *
 * countAndSay(2) = "1" 的行程长度编码 = "11"
 *
 * countAndSay(3) = "11" 的行程长度编码 = "21"
 *
 * countAndSay(4) = "21" 的行程长度编码 = "1211"
 */

/**
 * 生成外观数列的第 n 项
 * @param {number} n - 要生成的外观数列的项数
 * @return {string} - 外观数列的第 n 项
 */
function countAndSay (n) {
    // 基本情况，如果 n 是 1，直接返回 "1"
    if (n === 1) return '1';

    // 递归地获取前一项的外观数列
    const prevSeq = countAndSay(n - 1);

    // 初始化结果字符串和计数器
    let result = '';
    let count = 1;

    // 遍历前一项的外观数列字符串
    for (let i = 0; i < prevSeq.length; i++) {
        // 如果当前字符与下一个字符相同，增加计数器
        if (i + 1 < prevSeq.length && prevSeq[i] === prevSeq[i + 1]) {
            count++;
        } else {
            // 如果当前字符与下一个字符不同或已到字符串末尾
            // 将计数器和字符追加到结果字符串中
            result += count.toString() + prevSeq[i];
            // 重置计数器
            count = 1;
        }
    }

    // 返回生成的结果字符串
    return result;
}

// 测试示例
console.log(countAndSay(4)); // 输出: "1211"

