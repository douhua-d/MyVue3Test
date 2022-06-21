//https://blog.csdn.net/qq_30216191/article/details/81056765

function longestCommonPrefix(strs) {
  let firstStr = strs[0];
  let res = "";
  if (!strs.length) {
    return res;
  }
  for (let i = 0; i < firstStr.length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (firstStr[i] !== strs[j][i]) {
        return res;
      }
    }
    res += firstStr[i];
  }
  return res;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["java", "javascript", "json"]));
