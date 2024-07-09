const flatArr = (arr) => {
  return arr.reduce((pre, item) => {
    return pre.concat(Array.isArray(item) ? flatArr(item) : item);
  }, []);
};

/**
 * [{
 * userId:12,
 * timeStanp:124234,
 * action:1/-1
 * }]
 */

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
const findCommon = (arr) => {
  let res = "";
  let firstStr = arr[0];
  for (let i = 0; i < firstStr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (arr[j][i] !== firstStr[i]) {
        return res;
      }
    }
    res += firstStr[i];
  }
  return res;
};

console.log(findCommon(["flower", "flow", "flight"]));