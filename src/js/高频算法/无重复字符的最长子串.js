// 力扣运行是错误的？？？
function lengthLongestStr(s) {
  const len = s.length;
  if (len === 0) return 0;
  let maxLength = 0;
  let i = 0, j = 0;
  const set = new Set();
  for (let i; i < len; i++) {
    if (!set.has([s[i]])) {
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

// 力扣运行是 对的 记忆使用这版吧
function longestStr(s) {
  let len = s.length;
  if (len < 2) {
    return len;
  }
  let maxLen = 0;
  let left = 0, right = 0;
  let set = new Set();
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
}

// 力扣运行是对的
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
