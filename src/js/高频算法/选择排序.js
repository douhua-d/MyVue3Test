function selectionSort(arr) {
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

var arr = [3, 4, 1, 5, 100, 2];
console.log("selectionSort--", selectionSort(arr));