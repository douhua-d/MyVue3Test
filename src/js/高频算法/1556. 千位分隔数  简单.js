/**
 * 1556. 千位分隔数
 * 简单
 *
 * 提示
 * 给你一个整数 n，请你每隔三位添加点（即 "." 符号）作为千位分隔符，并将结果以字符串格式返回。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 987
 * 输出："987"
 * 示例 2：
 *
 * 输入：n = 1234
 * 输出："1.234"
 * 示例 3：
 *
 * 输入：n = 123456789
 * 输出："123.456.789"
 */

// 将整数 n 转换为字符串。
// 从字符串末尾开始，每隔三位插入一个点号（"."）。
// 注意处理负数情况，以及不需要插入点号的情况（例如三位数以下的整数）。

function dealNumber(num) {
  let arr = num.toString().split("").map(Number).reverse();
  let strArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      strArr.push(".");
    }
    strArr.push(arr[i]);
  }

  return strArr.reverse().join("");
}
