/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1：
 *
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 *
 * 示例 2：
 *
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 */

//https://blog.csdn.net/qq_30216191/article/details/81056765

function longestCommonPrefix(strs) {
  let firstStr = strs[0];
  let res = "";
  if (!strs.length) {
    return res;
  }
  for (let i = 0; i < firstStr.length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (firstStr[i] !== strs[j][i]) {
        return res;
      }
    }
    res += firstStr[i];
  }
  return res;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["java", "javascript", "json"]));
