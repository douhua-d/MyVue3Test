/**
 * 输入：["h","e","l","l","o"]
 * 输出：["o","l","l","e","h"]
 */

function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}

console.log(reverseString(["h", "e", "l", "l", "o"]));


// todo 这是错误的 是因为字符串在 JavaScript 中是不可变的。这意味着你不能直接修改字符串中的字符。你需要将字符串转换为数组，然后对数组进行操作，最后再将数组转换回字符串
function reverseStr(s) {
  let arr = s.split("");
  console.log({ arr });
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr.join("");
}

console.log("reverseStr===", reverseStr("hello"));

console.log("hello world".split("").reverse().join(""));