/**
 * 要判断一个整数是否是回文数，可以将其转换为字符串，然后检查字符串是否是回文。
 * 以下是一个用 JavaScript 实现的解决方案：
 * @param x
 */

function isPalindrome(x) {
  // 如果 x 是负数，则不可能是回文数
  if (x < 0) {
    return false;
  }

  // 将整数转换为字符串
  const str = x.toString();

  // 使用两个指针从字符串的两端向中间移动
  let left = 0;
  let right = str.length - 1;

  // 比较字符串的左边和右边的字符
  while (left < right) {
    if (str[left] !== str[right]) {
      return false; // 如果有不相同的字符，则不是回文数
    }
    left++;
    right--;
  }

  return true; // 如果所有字符都相同，则是回文数
}

// 测试
console.log(isPalindrome(121)); // 输出: true
console.log(isPalindrome(-121)); // 输出: false
console.log(isPalindrome(10)); // 输出: false
console.log(isPalindrome(12321)); // 输出: true
