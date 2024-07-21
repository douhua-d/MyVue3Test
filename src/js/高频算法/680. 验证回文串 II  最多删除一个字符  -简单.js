// 680. 验证回文串 II

/**
 * 给你一个字符串 s，最多 可以从中删除一个字符。
 *
 * 请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "aba"
 * 输出：true
 * 示例 2：
 *
 * 输入：s = "abca"
 * 输出：true
 * 解释：你可以删除字符 'c' 。
 * 示例 3：
 *
 * 输入：s = "abc"
 * 输出：false
 */

let validPalindrome = (s) => {
    let left = 0;
    let right = s.length - 1;

    let isValid = (s, left, right) => {
        while (left <= right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    };

    while (left <= right) {
        if (s[left] !== s[right]) {
            return isValid(s, left + 1, right) || isValid(s, left, right - 1);
        }
        left++;
        right--;
    }
    return true;
};