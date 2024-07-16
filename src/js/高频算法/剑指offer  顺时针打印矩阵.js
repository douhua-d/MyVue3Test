// 剑指offer  顺时针打印矩阵 

// 顺时针打印矩阵是一个经典的算法问题，它要求按照顺时针方向逐层遍历一个矩阵。我们可以通过分步骤逐层处理矩阵的边界来实现这一算法。

function spiralOrder(matrix) {
  if (matrix.length === 0) return [];

  let result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // 从左到右遍历上边界
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // 从上到下遍历右边界
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    // 确保当前行仍在有效范围内，从右到左遍历下边界
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    // 确保当前列仍在有效范围内，从下到上遍历左边界
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}

// 示例使用
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(spiralOrder(matrix)); // 输出: [1, 2, 3, 6, 9, 8, 7, 4, 5]

/**
 * 代码解释
 * 初始化边界和结果数组：
 *
 * top 表示当前的上边界，初始化为 0。
 * bottom 表示当前的下边界，初始化为 matrix.length - 1。
 * left 表示当前的左边界，初始化为 0。
 * right 表示当前的右边界，初始化为 matrix[0].length - 1。
 * result 数组用于存储顺时针遍历的结果。
 * 遍历矩阵的四个边界：
 *
 * 通过 while 循环确保遍历仍在有效范围内，即 top <= bottom 且 left <= right。
 * 从左到右遍历上边界：
 *
 * 使用 for 循环从 left 到 right 遍历上边界的元素，并将它们添加到 result 数组中。
 * 遍历完上边界后，将 top 加 1，表示上边界向下收缩。
 * 从上到下遍历右边界：
 *
 * 使用 for 循环从 top 到 bottom 遍历右边界的元素，并将它们添加到 result 数组中。
 * 遍历完右边界后，将 right 减 1，表示右边界向左收缩。
 * 从右到左遍历下边界（在确保当前行仍在有效范围内）：
 *
 * 使用 if 条件检查 top <= bottom，确保当前行仍在有效范围内。
 * 使用 for 循环从 right 到 left 遍历下边界的元素，并将它们添加到 result 数组中。
 * 遍历完下边界后，将 bottom 减 1，表示下边界向上收缩。
 * 从下到上遍历左边界（在确保当前列仍在有效范围内）：
 *
 * 使用 if 条件检查 left <= right，确保当前列仍在有效范围内。
 * 使用 for 循环从 bottom 到 top 遍历左边界的元素，并将它们添加到 result 数组中。
 * 遍历完左边界后，将 left 加 1，表示左边界向右收缩。
 * 返回结果：
 *
 * 当所有边界都被遍历完后，result 数组中包含了顺时针遍历矩阵的所有元素，返回该数组。
 */