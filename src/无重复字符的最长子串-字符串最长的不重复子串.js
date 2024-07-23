// set
//https://blog.csdn.net/nothing_is_imposible/article/details/108315760

// 利用滑动窗口
// 时间复杂度：O(2n) = O(n)，最坏的情况是 left 和 right 都遍历了一遍字符串
// 空间复杂度：O(n)
let lengthOfLongestSubstring = (s) => {
  let len = s.length;
  if (len <= 1) {
    return len;
  }
  let maxLen = 0;
  let left = 0, right = 0;
  const window = new Set();
  while (right < len) {
    if (!window.has(s[right])) {
      maxLen = Math.max(maxLen, right - left + 1);
      window.add(s[right]);
      right++;
    } else {
      window.delete(s[left]);
      left++;
    }
  }
  return maxLen;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
console.log(lengthOfLongestSubstring(""));


// 无重复字符的最长子串  -bilibili视频讲解
function lengthOfLongestStr(s) {
  const len = s.length;
  if (len == 0) {
    return 0;
  }
  let i = 0, j = 0, maxLength = 0;
  const set = new Set();
  for (i; i < len; i++) {
    if (!set.has(s[i])) {
      set.add(s[i]);
      maxLength = Math.max(maxLength, set.size);
    } else {
      while (set.has(s[i])) {
        set.delete(s[j]);
        j++;
      }
      set.add(s[i]);
    }
  }
  return maxLength;
}