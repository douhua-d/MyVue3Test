/**
 * 输入: nums: [1,3,-1,-3,5,3,6,7]; k =3;
 * 输出：[3,3,5,5,6,7]
 */


// 面试过程中写的也对，虽然没用滑动窗口
// function searchNum(arr, k = 3) {
//   if (!arr.length) return [];
//   let res = [];
//   for (let i = 0; i < arr.length - k + 1; i++) {
//     let curArr = arr.slice(i, k + i);
//     console.log("arr[i]===", curArr, arr[i]);
//     let curMax = curArr[0];
//     for (let val of curArr) {
//       if (val > curMax) {
//         curMax = val;
//       }
//     }
//     res.push(curMax);
//   }
//   return res;
// }
// 