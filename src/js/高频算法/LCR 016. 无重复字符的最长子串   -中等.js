// LCR 016. 无重复字符的最长子串   -中等

//  todo 记忆这版吧  力扣正确的
var lengthOfLongestSubstring = function (s) {
  let len = s.length;
  if (len < 2) {
    return len;
  }
  let left = 0, right = 0;
  let set = new Set();
  let maxLen = 0;
  while (right < len) {
    if (!set.has(s[right])) {
      set.add(s[right]);
      right++;
      maxLen = Math.max(maxLen, set.size);
    } else {
      while (set.has(s[right])) {
        set.delete(s[left]);
        left++;
      }
    }
  }
  return maxLen;
};