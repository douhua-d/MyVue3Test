/**
 * 415. 字符串相加
 * 简单
 *
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 *
 * 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 * 
 * 示例 1：
 *
 * 输入：num1 = "11", num2 = "123"
 * 输出："134"
 * 示例 2：
 *
 * 输入：num1 = "456", num2 = "77"
 * 输出："533"
 */


// let str = "124";
// for (let i = 0 ; i < str.length; i++){
//   console.log(str[i],typeof str[i] );  // 字符串 
//   console.log(str[i] - '0', typeof  (str[i] - '0'));  // 拿到数字了
// }


function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  let result = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    let digit1 = i >= 0 ? Number(num1[i]) : 0;
    let digit2 = j >= 0 ? Number(num2[j]) : 0;
    let sum = digit1 + digit2 + carry;

    result.push(sum % 10);
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  return result.reverse().join("");
}

// 示例
console.log(addStrings("123", "456")); // 输出: "579"
console.log(addStrings("11", "123"));  // 输出: "134"
console.log(addStrings("456", "77"));  // 输出: "533"
console.log(addStrings("0", "0"));     // 输出: "0"

/**
 * while 判断条件
 * javascript
 * 复制代码
 * 
 * while (i >= 0 || j >= 0 || carry > 0)
 * 这个判断条件确保在以下几种情况下继续循环：
 *
 * i >= 0：表示 num1 还有未处理的数字。
 * j >= 0：表示 num2 还有未处理的数字。
 * carry > 0：表示在前一次的加法中产生了进位，需要在本次循环中处理。
 * 只要满足其中任意一个条件，就继续循环。这保证了即使两个数字的长度不同，或者在最后一位相加后仍有进位，也能正确地处理。
 */


/**
 * 下标越界为 0
 * javascript
 * 
 * let digit1 = i >= 0 ? Number(num1[i]) : 0;
 * let digit2 = j >= 0 ? Number(num2[j]) : 0;
 * 在处理两个字符串表示的大整数时，长度可能不同，比如 num1 是 "123"，num2 是 "4567"。当 i 或 j 下标越界时（即超出了字符串的长度范围），我们需要将缺失的位置视为 0，这样可以简化加法逻辑。以下是详细解释：
 *
 * i >= 0：如果 i 仍在 num1 的有效范围内，num1[i] 是一个有效的数字，将其转换为 Number。
 * 如果 i 越界（即 i < 0），说明 num1 已经处理完毕，此时缺失的位置视为 0。
 * j >= 0：类似地，如果 j 仍在 num2 的有效范围内，num2[j] 是一个有效的数字，将其转换为 Number。
 * 如果 j 越界（即 j < 0），说明 num2 已经处理完毕，此时缺失的位置视为 0。
 */


// 处理进位和当前位的值：
// 
// sum % 10 取出当前位的值（即个位数），并将其添加到结果数组 result 中。
// carry = Math.floor(sum / 10) 计算进位（如果当前位的和大于等于 10，carry 为 1，否则为 0）。




