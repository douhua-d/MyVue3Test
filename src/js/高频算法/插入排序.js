/**
 * 插入排序
 * 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
 * 因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。
 1、先拿到第一个元素，认为它是已排序的
 2、拿到下一个元素a，与已排序序列从后往前相比
 3、如果已排序序列中的元素大于a，则将它的位置往后移一位
 4、重复2，3步骤，直到已排序序列中的元素小于等于a
 5、将a插入到4布中元素后

 while (j >= 0 && arr[j] > arr[i]) {  // 这样是错误的！！！ arr[i]的位置元素变化了，必须借助中间变量保存一份才可
 arr[j + 1] = arr[j];
 j--;
 console.log(arr[i]);
 }
 arr[j + 1] = arr[i];
 */

//https://blog.csdn.net/alzzw/article/details/98100378

// 排序汇总 https://interview.poetries.top/fe-improve-docs/algorithm/algorithm2/algorithm/21-%E6%8E%92%E5%BA%8F_%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F.html#%E8%A7%A3%E6%B3%95
// 时间复杂度 O(n^2)
function insertSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let j = i - 1;
    let cur = arr[i]; //必须借助中间变量保存一份 当前要处理的数 才可
    while (j >= 0 && arr[j] > cur) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = cur;
  }
  return arr;
}

// do while 实现
function insertSort2(arr) {
  let len = arr.length;
  let i = 1;
  let j = i - 1;
  do {
    let cur = arr[i];
    do {
      if (arr[j] > cur) {
        arr[j + 1] = arr[j];
        j--;
      } else {
        arr[j + 1] = cur;
      }
    } while (j >= 0);
    i++;
  } while (i < len);

  return arr;
}

let arr = [5, 3, 7, 2, 6];
console.log("插入排序arr", insertSort(arr));
// console.log("插入排序arr", insertSort2(arr));


//集合对象迭代器
let colors = ["red", "green", "black"];
console.log("11", colors.entries()); // 11 Object [Array Iterator] {}
for (let i of colors.entries()) {
  console.log(i, "iiiiiii"); //[ 0, 'red' ] 'iiiiiii'
  // [ 1, 'green' ] 'iiiiiii'
  //  [ 2, 'black' ] 'iiiiiii'
}
