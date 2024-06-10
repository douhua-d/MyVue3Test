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


// 如何用js遍历的方法实现？
function reverse(str) {
  let res = "";
  str = str.trim();
  const arr = str.split(/(\s)+/);
  res = arr.reverse().join(" ");
  return res;
}

console.log(reverse("  hello                world  "));


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


/**
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 *
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 * 示例 2：
 *
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 */


