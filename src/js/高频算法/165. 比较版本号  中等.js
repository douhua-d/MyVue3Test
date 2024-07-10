/**
 * 165. 比较版本号
 * 中等
 * 相关标签
 * 相关企业
 * 提示
 * 给你两个 版本号字符串 version1 和 version2 ，请你比较它们。版本号由被点 '.' 分开的修订号组成。修订号的值 是它 转换为整数 并忽略前导零。
 *
 * 比较版本号时，请按 从左到右的顺序 依次比较它们的修订号。如果其中一个版本字符串的修订号较少，则将缺失的修订号视为 0。
 *
 * 返回规则如下：
 *
 * 如果 version1 < version2 返回 -1，
 * 如果 version1 > version2 返回 1，
 * 除此之外返回 0。
 */

// 为了比较两个版本号，我们需要按从左到右的顺序逐个修订号进行比较。
// 如果两个版本字符串的修订号数量不同，我们将缺失的修订号视为0


function compareVersion(version1, version2) {
  // 将版本号字符串按 '.' 分割成数组
  const v1Parts = version1.split(".");
  const v2Parts = version2.split(".");

  // 获取最长的修订号长度
  const maxLength = Math.max(v1Parts.length, v2Parts.length);

  // 逐个修订号进行比较
  for (let i = 0; i < maxLength; i++) {
    // 如果修订号不存在，则视为 0
    const num1 = i < v1Parts.length ? parseInt(v1Parts[i], 10) : 0;
    const num2 = i < v2Parts.length ? parseInt(v2Parts[i], 10) : 0;

    // 比较当前修订号
    if (num1 < num2) {
      return -1;
    } else if (num1 > num2) {
      return 1;
    }
  }

  // 如果所有修订号都相同，返回 0
  return 0;
}

// 示例
console.log(compareVersion("1.01", "1.001")); // 输出: 0
console.log(compareVersion("1.0", "1.0.0"));  // 输出: 0
console.log(compareVersion("0.1", "1.1"));    // 输出: -1
console.log(compareVersion("1.0.1", "1"));    // 输出: 1
console.log(compareVersion("7.5.2.4", "7.5.3")); // 输出: -1
