//  125. 验证回文串  -简单

/**
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
 *
 * 字母和数字都属于字母数字字符。
 *
 * 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入: s = "A man, a plan, a canal: Panama"
 * 输出：true
 * 解释："amanaplanacanalpanama" 是回文串。
 * 示例 2：
 *
 * 输入：s = "race a car"
 * 输出：false
 * 解释："raceacar" 不是回文串。
 * 示例 3：
 *
 * 输入：s = " "
 * 输出：true
 * 解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
 * 由于空字符串正着反着读都一样，所以是回文串。
 */


// 这版力扣运行OK的，记忆这版吧

let isPalindrome = (s) => {
  let str = s.toLowerCase();
  str = str.replace(/[^0-9a-z]/g, "");
  let left = 0;
  let right = str.length - 1;
  while (left <= right) {
    if (str[left] !== str[right]) {
      return false;
    }
    // todo  注意 别忘了条件值的变化啊！！！！！
    left++;
    right--;
  }
  return true;
};


function isPalindrome(s) {
  // todo 不建议直接修改实参
  // 将字符串转换为小写
  s = s.toLowerCase();
  // 使用正则表达式移除所有非字母数字字符
  s = s.replace(/[^a-z0-9]/g, "");

  // 定义两个指针，分别指向字符串的开头和结尾
  let left = 0;
  let right = s.length - 1;

  // 循环检查字符是否对称
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// 示例使用
let s1 = "A man, a plan, a canal: Panama";
console.log(isPalindrome(s1)); // 输出: true

let s2 = "race a car";
console.log(isPalindrome(s2)); // 输出: false

