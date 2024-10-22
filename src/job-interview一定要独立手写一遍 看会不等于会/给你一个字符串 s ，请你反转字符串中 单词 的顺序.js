/**
 * 给你一个字符串 s ，请你反转字符串中 单词 的顺序。
 *
 * 单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
 *
 * 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
 *
 * 注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "the sky is blue"
 * 输出："blue is sky the"
 * 示例 2：
 *
 * 输入：s = "  hello world  "
 * 输出："world hello"
 * 解释：反转后的字符串中不能存在前导空格和尾随空格。
 */


// 用原生js实现

function reverseWords(s) {
  // 初始化一个结果数组来存储单词
  let result = [];
  let word = "";

  // 遍历字符串
  for (let i = 0; i < s.length; i++) {
    let char = s[i];

    // 如果字符不是空格，添加到当前单词
    if (char !== " ") {
      word += char;
    } else if (word) {
      // 如果当前字符是空格且当前单词不为空，将单词添加到结果数组
      result.push(word);
      word = "";
    }
  }

  // 最后一个单词添加到结果数组
  if (word) {
    result.push(word);
  }

  // 反转结果数组中的单词顺序并用单个空格连接
  return result.reverse().join(" ");
}

// 示例测试
console.log(reverseWords("the sky is blue")); // 输出："blue is sky the"
console.log(reverseWords("  hello world  ")); // 输出："world hello"
console.log(reverseWords("a good   example")); // 输出："example good a"