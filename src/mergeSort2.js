function mergeSort(array, left, right, temp) {  //[100, 2, 5, 7, 9, 1, 3]  0 6
  if (left < right) {
    const mid = Math.floor((left + right) / 2);  // 3
    mergeSort(array, left, mid, temp)       // [100, 2, 5, 7, 9, 1, 3]  0 3
    mergeSort(array, mid + 1, right, temp)
    merge(array, left, right, temp);
  }
  return array;
}

function merge(array, left, right, temp) { // [100, 2, 5, 7, 9, 1, 3]  0 3
  const mid = Math.floor((left + right) / 2); // 1
  let leftIndex = left;  // 0
  let rightIndex = mid + 1; // 2
  let tempIndex = 0;  // [100, 2, 5, 7,               9, 1, 3]
  while (leftIndex <= mid && rightIndex <= right) {
    if (array[leftIndex] < array[rightIndex]) {  //array[0] array[2]
      temp[tempIndex++] = array[leftIndex++]
    } else {
      temp[tempIndex++] = array[rightIndex++]  // temp[1] = array[2]
    }
  }
  while (leftIndex <= mid) {
    temp[tempIndex++] = array[leftIndex++]
  }
  while (rightIndex <= right) {
    temp[tempIndex++] = array[rightIndex++]
  }
  tempIndex = 0;
  for (let i = left; i <= right; i++) {
    array[i] = temp[tempIndex++];
  }
}