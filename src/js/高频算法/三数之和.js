var threeSum = function(nums) {
  // 用于存放结果数组
  let res = [];
  // 给 nums 排序
  nums = nums.sort((a, b) => {
    return a - b;
  });
  // 缓存数组长度
  const len = nums.length;
  // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
  for (let i = 0; i < len - 2; i++) {
    // 左指针 j
    let j = i + 1;
    // 右指针k
    let k = len - 1;
    // 如果遇到重复的数字，则跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    while (j < k) {
      // 三数之和小于0，左指针前进
      if (nums[i] + nums[j] + nums[k] < 0) {
        j++;
        // 处理左指针元素重复的情况
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
      } else if (nums[i] + nums[j] + nums[k] > 0) {
        // 三数之和大于0，右指针后退
        k--;

        // 处理右指针元素重复的情况
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      } else {
        // 得到目标数字组合，推入结果数组
        res.push([nums[i], nums[j], nums[k]]);

        // 左右指针一起前进
        j++;
        k--;

        // 若左指针元素重复，跳过
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }

        // 若右指针元素重复，跳过
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      }
    }
  }

  // 返回结果数组
  return res;
};


function threeSum(arr) {
  let res = [];
  let len = arr.length;
  arr.sort((a, b) => a - b);  // todo 别忘了  先排序
  for (let i = 0; i < len - 2; i++) {
    let j = i + 1;
    let k = len - 1;

    while (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }

    while (j <= k) {
      let total = arr[i] + arr[j] + arr[k];
      if (total < 0) {
        j++;
        while (j < k && arr[j] === arr[j - 1]) {
          j++;
        }
      } else if (total > 0) {
        k--;
        while (j < k && arr[k] === arr[k + 1]) {
          k--;
        }
      } else {
        res.push(arr[i], arr[j], arr[k]);

        // todo 别忘了后边还有逻辑呢  移动指针 和 判断重复
        j++;
        k--;
        while (j < k && arr[j] === arr[j - 1]) {
          j++;
        }
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      }
    }
  }
  return res;
}