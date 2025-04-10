//归并排序
// let arr = [2, 5, 3];
let arr = [100, 2, 5, 7, 9, 1, 3];

function mergeSort1(arr) {  // 分割左右数组 直到数组中元素小于2
  if (arr.length < 2) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2); // 1
  let left = arr.slice(0, mid);  // [2]
  let right = arr.slice(mid); // [5,3]
  return merge(mergeSort1(left), mergeSort1((right)));
}

// 将排序好的两个数组进行合并
function merge(left, right) {
  let ret = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      ret.push(left.shift());
    } else {
      ret.push(right.shift());
    }
  }
  while (left.length) {
    ret.push(left.shift());
  }
  while (right.length) {
    ret.push(right.shift());
  }
  return ret;
}

console.log("mergeSort1------", mergeSort1(arr));


// 归并排序2
function merge_sort(arr3) {
  return merge_sort_f(arr3, 0, arr3.length - 1);
}

function merge_sort_f(arr, start, end) {  // [100, 2, 5, 7, 9, 1, 3]  0 6 ;merge_sort_f([100, 2, 5, 7, 9, 1, 3]  0 3);merge_sort_f([100, 2, 5, 7, 9, 1, 3]  4 6)
  if (start === end) {
    return [arr[start]];
  }
  if (end - start === 1) {
    // if (arr[start] > arr[end]) {
    //   const tem = arr[end];
    //   arr[end] = arr[start];
    //   arr[start] = tem;
    // }
    // return [arr[start], arr[end]];
    if (arr[start] > arr[end]) {
      return [arr[end], arr[start]];
    }
    return [arr[start], arr[end]];
  }
  const mid = Math.floor((start + end) / 2);  // 3 1 5
  const arr1 = merge_sort_f(arr, start, mid);  //merge_sort_f([100, 2, 5, 7, 9, 1, 3]  0 3);([100, 2, 5, 7, 9, 1, 3]  0 1) ;[2,100];([100, 2, 5, 7, 9, 1, 3]  0 5)
  const arr2 = merge_sort_f(arr, mid + 1, end); //merge_sort_f([100, 2, 5, 7, 9, 1, 3]  4 6);([100, 2, 5, 7, 9, 1, 3]  6 6);[3]
  return merge(arr1, arr2);
}

function merge(left, right) {
  let ret = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      ret.push(left.shift());
    } else {
      ret.push(right.shift());
    }
  }
  while (left.length) {
    ret.push(left.shift());
  }
  while (right.length) {
    ret.push(right.shift());
  }
  return ret;
}

console.log("merge_sort----", merge_sort(arr));


// 归并排序3
function merge_sort3(arr3) {
  return merge_sort_f3(arr3, 0, arr3.length - 1);
}

function merge_sort_f3(arr, start, end) {  // [100, 2, 5, 7, 9, 1, 3]  0 6 ;merge_sort_f([100, 2, 5, 7, 9, 1, 3],0,3);merge_sort_f([2, 5, 3],2,2)
  if (start === end) {
    return merge3(arr, start, end);
  }
  if (end - start === 1) {
    if (arr[start] > arr[end]) {
      if (arr[start] > arr[end]) {
        const tem = arr[end];
        arr[end] = arr[start];
        arr[start] = tem;
      }
      return merge3(arr, start, end);
    }
    return merge3(arr, start, end);
  }
  const mid = Math.floor((start + end) / 2);  // 3  1
  merge_sort_f3(arr, start, mid);  //merge_sort_f([100, 2, 5, 7, 9, 1, 3],0,3);[100, 2, 5, 7, 9, 1, 3],0,1
  merge_sort_f3(arr, mid + 1, end); //merge_sort_f([100, 2, 5, 7, 9, 1, 3],4,6)
  return merge3(arr, start, end);// ([2, 100, 5, 7, 9, 1, 3] , 0 ,3)
}

function merge3(arr, start, end) {  // ([2, 100, 5, 7, 9, 1, 3] , 0 ,1)
  if (end - start === 1) {
    return arr;
  }
  if (start === end){
    const mid = Math.floor((start + end) / 2);
    let leftIndex = start;
    let rightIndex = mid + 1;
    let tempIndex = 0;
    while (leftIndex <= mid && rightIndex <= end) {
      if (array[leftIndex] < array[rightIndex]) {
        temp[tempIndex++] = array[leftIndex++]
      } else {
        temp[tempIndex++] = array[rightIndex++]
      }
    }
  }
}

// console.log("merge_sort3----", merge_sort3(arr));