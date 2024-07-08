/**
 * 输入: nums: [1,3,-1,-3,5,3,6,7]; k =3;
 * 输出：[3,3,5,5,6,7]
 */

/**
 * 版本号排序
 * 输入：['2.1.0.1','0.402.1','10.2.1','5.1.2','1.0.4.5']
 * 输出：['10.2.1','5.1.2',2.1.0.1','1.0.4.5','0.402.1']
 */


// 面试过程中写的
// /**
//  *
//  */
// 
// function versionSort(arr) {
//   arr.sort((a, b) => {
//     let arr1 = a.split("."); // [2,1,0,1]
//     let arr2 = b.split("."); // [0,402,1]
// 
//     for (let i = 0; i < arr1.length; i++) {
//       if (arr2[i]) {
//         return arr2[i] - arr1[i];
//       } else {
//         return arr1 - arr2;
//       }
//     }
// 
//   });
// }
// 
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
// console.log(searchNum([1, 3, -1, -3, 5, 3, 6, 7], 3));