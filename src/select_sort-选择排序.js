/**
 * 选择排序*/

// 时间复杂度 O(n^2)
function selectSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = arr[i]; // 记录当前最小值
    let k = i; // 记录当前最小值得索引
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < min) {
        min = arr[j];
        k = j;
      }
    }
    arr[k] = arr[i];
    arr[i] = min;
  }
  return arr;
}

var arr = [3, 4, 1, 5, 2];
console.log("selectSort", selectSort(arr)); //1,2,3,4,5

// 选择排序
function selectSort2(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = arr[i];
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < min) {
        let c = min;
        min = arr[j];
        arr[j] = c;
      }
    }
    arr[i] = min;
  }
  return arr;
}

console.log("selectSort2---", selectSort2(arr));

function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length - 1; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[minIndex], array[i]] = [array[i], array[minIndex]];
  }
  return array;
}

console.log("selectionSort--", selectionSort(arr));

/**
 * 选择排序算法
 * @param {number[]} arr - 需要排序的数组
 * @returns {number[]} - 排序后的数组
 */
function selectionSort6(arr) {
  const n = arr.length;

  // 外层循环遍历数组的每一个位置
  for (let i = 0; i < n; i++) {
    console.log(i);
    // 假设当前 i 位置上的元素是未排序部分中最小的
    let minIndex = i;

    // 内层循环从 i + 1 位置开始，找到未排序部分中最小的元素
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // 更新最小元素的索引
      }
    }

    // 如果找到的最小元素不是当前假设的最小元素，则交换
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // 使用 ES6 解构赋值进行交换
    }
  }

  return arr;
}

// 测试示例
const array = [64, 25, 12, 22, 11];
console.log("selectionSort6==", selectionSort6(array)); // 输出: [11, 12, 22, 25, 64]




 


