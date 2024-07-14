// 在 JavaScript 中，forEach 是一个用于遍历数组的高阶函数，它对于数组中的每个元素执行提供的回调函数。然而，forEach 循环无法通过 return 或 break 来中断。
// return 语句只会中断当前的迭代，并不会影响循环的继续进行。


//  forEach 中的 return 无效
const array = [1, 2, 3, 4, 5];

array.forEach((value) => {
  if (value === 3) {
    return; // 只会跳过当前迭代，但不会中断循环
  }
  console.log(value);
});

// 输出:
// 1
// 2
// 4
// 5


/**
 * 使用 for...of 循环：
 * for...of 支持 break 和 continue，可以用于中断循环或跳过当前迭代。
 */

