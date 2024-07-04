/**
 *  输入：s = "babad"
 *  输出："bab"
 */


//  力扣通过的 
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (s.length < 2) {
    return s;
  }
  let start = 0;
  let maxLength = 1;

  function exbandAroundCenter(left, right) {
    while (left >= 0 && right <= s.length && s[left] == s[right]) {
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    exbandAroundCenter(i - 1, i + 1);
    exbandAroundCenter(i, i + 1);
  }

  return s.substring(start, start + maxLength);
};

console.log(longestPalindrome("babad"));


// 手写了一遍中的 细节错误问题标注
function longestStr(str) {
  // todo  注意- 首先判断临界值
  if (str.length < 2) {
    return str;
  }

  let start = 0;
  let maxLength = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right <= str.length - 1 && str[left] === str[right]) {

      // todo 注意点 需要判断之后才更新赋值啊！！
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        start = left;
      }

      // todo  别总忘修改迭代条件值啊！！
      left--;
      right++;
    }
  }

  for (let i = 0; i < str.length - 1; i++) {
    expandAroundCenter(i - 1, i + 1);
    expandAroundCenter(i, i + 1);
  }

  // todo 注意-结束的索引是加上 长度 + start ！！

  return str.substring(start, start + maxLength);
}


// 如下是 chatGPT 给的
function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0, end = 0;

  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}


// console.log(longestPalindrome("babad"));