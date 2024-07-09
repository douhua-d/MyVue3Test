/**
 * 输入: nums: [1,3,-1,-3,5,3,6,7]; k =3;
 * 输出：[3,3,5,5,6,7]
 * 
 * 困难等级  滑动窗口
 */

function maxSlidingWindow(nums, k) {
  const result = []; // 存放结果
  const deque = []; // 存放当前窗口的索引

  for (let i = 0; i < nums.length; i++) {
    // 移除队列中不在当前窗口范围内的元素
    if (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }

    // 移除队列中比当前元素小的所有元素
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // 将当前元素的索引添加到队列中
    deque.push(i);

    // 当窗口大小达到 k 时，记录当前窗口的最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// 测试用例
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log(maxSlidingWindow(nums, k)); // 输出：[3, 3, 5, 5, 6, 7]



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