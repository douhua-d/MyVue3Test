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
    for (let j = i + 1; j < array.length -1; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[minIndex], array[i]] = [array[i], array[minIndex]];
  }
  return array
}

console.log('selectionSort--',selectionSort(arr));
 


