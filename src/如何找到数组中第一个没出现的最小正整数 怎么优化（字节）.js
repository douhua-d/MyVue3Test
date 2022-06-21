//第一版
function firstMissingPositive(nums) {
  nums = nums.filter(item => item > 0);
  if (nums.length) {
    nums.sort((a, b) => a - b);
    if (nums[0] !== 1) {
      return 1;
    } else {
      for (let i = 0; i < nums.length; i++) {
        if (nums[i + 1] - nums[i] > 1) {
          return nums[i] + 1;
        }
      }
      return nums[nums.length - 1] + 1;
    }
  }
  return 1;
}

// 第二版 优化 不对所有的内容进行排序  使用选择排序  每次找到最小的元素
function firstMissingPositive2(nums) {
  nums = nums.filter(item => item > 0);
  for (let i = 0; i < nums.length; i++) {
    let min = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < min) {
        let c = min;
        min = nums[j];
        nums[j] = c;
      }
    }
    nums[i] = min;
    if (i > 0) {
      if (nums[i] - nums[i - 1] > 1) {
        return nums[i - 1] + 1;
      }
    } else {
      if (min !== 1) {
        return 1;
      }
    }
  }
  return nums.length ? nums.pop() + 1 : 1;
}

console.log(firstMissingPositive2([1,2,0]));
console.log(firstMissingPositive2([3,4,-1,1]));
console.log(firstMissingPositive2([7,8,9,11,12]));