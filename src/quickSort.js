// 找到一个基准元素，一般取第一个元素为基准元素
// 然后从第二个开始比较，比基准元素大的放在基准元素在右边,比基准元素小的放在基准元素在左边
// 然后对左右数组进行递归 快速排序

// 快速排序  基础算法
// 时间复杂度  O(nlog2n)
function quickSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  const flag = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < len; i++) {
    if (arr[i] < flag) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(flag, quickSort(right));
}

console.log("quickSort----", quickSort([2, 100, 5, 46, 20, 13]));


/**
 *快速排序  高级算法  （不借助额外空间，进行划分交换排序）
 *  */
function quickSort2(arr) {

  //交换
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  //找到每一次划分交换排序后 这次作为基准元素的最后放置位置的后一位   左边小于它右边大于它
  function findCenter(arr, left, right) {
    let flag = arr[left];
    let idx = left + 1;
    for (let i = idx; i <= right; i++) {
      if (arr[i] < flag) {  //  找到小于基准元素的交换位置 从基准元素的下一位开始放置小于基准元素的位置，放置后位置+1
        swap(arr, idx, i);
        idx++;
      }
    }
    swap(arr, left, idx - 1); //把基准元素与当前找到的交换过的小于它的元素的最后一个元素交换位置
    return idx;
  }

  function sort(arr, left, right) {
    if (left < right) {
      let center = findCenter(arr, left, right);
      sort(arr, left, center - 1);
      sort(arr, center, right);
    }
  }

  sort(arr, 0, arr.length - 1);

  return arr;
}

let arr = [5, 9, 7, 8, 3, 6, 1];
console.log("quickSort2----", quickSort2(arr));