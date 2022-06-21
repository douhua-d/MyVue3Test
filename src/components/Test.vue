<template>
  <div>1111111111</div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "Test",
  setup() {
    onMounted(() => {
      init()
    })

    function init() {
      merge_sort([100, 2, 5, 7, 9, 1, 3]);

      // test1(1, 2, 3);
      // test2(1, 2, 3);
      // test3(1, 2, 3);
      // test4(1, 2, 3);
    }

    // 归并排序2
    function merge_sort(arr3) {
      return merge_sort_f(arr3, 0, arr3.length - 1);
    }

    function merge_sort_f(arr, start, end) {  // [100, 2, 5, 7, 9, 1, 3]  0 6 ;merge_sort_f([100, 2, 5, 7, 9, 1, 3]  0 3);merge_sort_f([100, 2, 5, 7, 9, 1, 3]  4 6)
      if (start === end) {
        debugger
        return [arr[start]];
      }
      if (end - start === 1) {
        // if (arr[start] > arr[end]) {
        //   const tem = arr[end];
        //   arr[end] = arr[start];
        //   arr[start] = tem;
        // }
        // return [arr[start], arr[end]];
        debugger
        if (arr[start] > arr[end]) {
          return [arr[end], arr[start]];
        }
        return [arr[start], arr[end]];
      }
      debugger
      const mid = Math.floor((start + end) / 2);  // 3 1 5
      debugger
      const arr1 = merge_sort_f(arr, start, mid);  //merge_sort_f([100, 2, 5, 7, 9, 1, 3]  0 3);([100, 2, 5, 7, 9, 1, 3]  0 1) ;[2,100];([100, 2, 5, 7, 9, 1, 3]  0 5)
      debugger
      const arr2 = merge_sort_f(arr, mid + 1, end); //merge_sort_f([100, 2, 5, 7, 9, 1, 3]  4 6);([100, 2, 5, 7, 9, 1, 3]  6 6);[3]
      debugger
      return merge(arr1, arr2);
    }

    function merge(left, right) {
      debugger
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




    // 获取argument对象 类数组对象 不能调用数组方法
    function test1() {
      console.log('获取argument对象 类数组对象 不能调用数组方法', arguments);
      console.log(arguments[0]);
      debugger
    }

    // 获取参数数组  可以调用数组方法
    function test2(...args) {
      console.log('获取参数数组  可以调用数组方法', args);
    }

    // 获取除第一个参数的剩余参数数组
    function test3(first, ...args) {
      console.log('获取argument对象 类数组对象 不能调用数组方法', args);
    }

    // 透传参数
    function test4(first, ...args) {
      fn(...args);
      fn(...arguments);
    }

    function fn() {
      console.log('透传', ...arguments);
    }

  }
}
</script>

<style scoped>

</style>