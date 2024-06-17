function threeSumClosest(nums, target) {
  // 将数组进行排序
  nums.sort((a, b) => a - b);

  // 初始化最接近的和为一个很大的值
  let closestSum = Infinity;

  // 遍历每一个数，作为三个数中的第一个
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1; // 左指针
    let right = nums.length - 1; // 右指针

    // 使用双指针遍历剩下的两个数
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      // 如果当前和与目标值更接近，则更新最接近的和
      if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
        closestSum = sum;
      }

      // 根据和与目标值的关系移动双指针
      if (sum < target) {
        left++; // 当前和小于目标值，左指针右移
      } else if (sum > target) {
        right--; // 当前和大于目标值，右指针左移
      } else {
        // 如果和正好等于目标值，返回结果
        return sum;
      }
    }
  }

  // 返回最接近的和
  return closestSum;
}

// 测试用例
console.log(threeSumClosest([-1, 2, 1, -4], 1)); // 输出: 2
console.log(threeSumClosest([0, 0, 0], 1)); // 输出: 0
