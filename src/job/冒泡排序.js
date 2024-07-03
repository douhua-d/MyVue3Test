// https://interview.poetries.top/algorithm/algorithm-interview/19-%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E4%B8%93%E9%A2%98%EF%BC%88%E4%B8%8A%EF%BC%89.html#%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F


// 每一次从头到尾的遍历都只能定位到一个元素的位置，因此元素有多少个，总的循环就要执行多少轮。
// 在这个例子中，总的元素有 5 个，因此理论上来说还有一轮从头到尾的循环要走。
// 相信大家已经隐约感觉到了哪里不对，不过没关系，掌握了基本思路，优化啥的都好说。我们先按照这个思路来编码：


// 随着外层循环的进行，数组尾部的元素会渐渐变得有序——当我们走完第1轮循环的时候，
// 最大的元素被排到了数组末尾；走完第2轮循环的时候，第2大的元素被排到了数组倒数第2位；
// 走完第3轮循环的时候，第3大的元素被排到了数组倒数第3位......以此类推，
// 走完第 n 轮循环的时候，数组的后 n 个元素就已经是有序的。


//  从小到大的冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    // 注意差别在这行，我们对内层循环的范围作了限制
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log("bubbleSort------", bubbleSort([1, 8, 6, 4, 70, 60]));

// 实现一个大到小的冒泡排序
function sort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j + 1] > arr[j]) {
        // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

console.log("sort------", sort([1, 8, 6, 4, 70, 60]));

function betterBubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    // 区别在这里，我们加了一个标志位
    let flag = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 只要发生了一次交换，就修改标志位
        flag = true;
      }
    }

    // 若一次交换也没发生，则说明数组有序，直接放过
    if (flag == false) return arr;
  }
  return arr;
}
