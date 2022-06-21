var maximumGap = function(nums) {
  if (nums.length < 2) {
    return 0;
  }
  let max = 0;
  let space;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
    if (i > 0) {
      space = nums[nums.length - i] - nums[nums.length - 1 - i];
      if (space > max) {
        max = space;
      }
    }
  }
  return Math.max(max, nums[1] - nums[0]);
};

console.log(maximumGap([3, 6, 9, 1]));
console.log(maximumGap([10]));
console.log(maximumGap([13, 16, 19, 1]));

var maximumGap2 = function(nums) {
  if (nums.length < 2) {
    return 0;
  }
  let max = 0;
  let space;
  let len = nums.length - 1;
  for (let i = len; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
    if (i < len) {
      space = nums[i + 1] - nums[i];
      if (space > max) {
        max = space;
      }
    }
  }
  return Math.max(max, nums[1] - nums[0]);
};

console.log(maximumGap2([3, 6, 9, 1]));
console.log(maximumGap2([10]));
console.log(maximumGap2([13, 16, 19, 1]));