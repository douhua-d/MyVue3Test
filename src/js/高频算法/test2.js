// 合并两个有序数组
const merge = (nums1, m, nums2, n) => {
  let p = m - 1;
  let q = n - 1;
  let j = m + n - 1;

  while (p >= 0 && q >= 0) {
    if (nums1[p] >= nums2[q]) {
      nums1[j] = nums1[p];
      p--;
    } else {
      nums1[j] = nums2[q];
      q--;
    }
    j--;
  }

  while (q > 0) {
    nums1[j] = nums2[q];
    q--;
    j--;
  }
  return nums1;

};

// // 示例
// let nums1 = [1, 2, 3, 0, 0, 0];
// let m = 3;
// let nums2 = [2, 5, 6];
// let n = 3;
//
// merge(nums1, m, nums2, n);
// console.log(nums1); // [1, 2, 2, 3, 5, 6]

const addStrings = (num1, num2) => {
  let num1Arr = num1.split("").map(Number);
  let num2Arr = num2.split("").map(Number);
  let carry = 0;
  let res = [];
  let i = num1Arr.length - 1;
  let j = num2Arr.length - 1;
  while (i >= 0 || j >= 0 || carry) {
    let digit1 = i < 0 ? 0 : num1Arr[i];
    let digit2 = j < 0 ? 0 : num2Arr[j];

    let sum = digit1 + digit2 + carry;
    res.push(sum % 10);
    carry = Math.floor(sum / 10);

    // todo  别老忘了 循环变量的 变化啊 ！！！

    i--;
    j--;
  }
  return res.reverse().join("");
};

// console.log(123, addStrings("123", "456")); // 输出: "579"
// console.log(addStrings("11", "123"));  // 输出: "134"
// console.log(addStrings("456", "77"));  // 输出: "533"
// console.log(addStrings("0", "0"));  


// 版本号排序 降序
const sortVersion = (arr) => {
  arr.sort((a, b) => {
    let arr1 = a.split(".");
    let arr2 = b.split(".");
    let i = 0;
    while (true) {
      let s1 = arr1[i];
      let s2 = arr2[i];
      // todo 记得 i++     !!!
      i++;
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (s1 === s2) continue;
      return s2 - s1;
    }
  });
  return arr;
};