// 数组扁平化处理  
// https://interview.poetries.top/docs/base/handwritten.html#_9-%E5%AE%9E%E7%8E%B0%E6%95%B0%E7%BB%84%E6%89%81%E5%B9%B3%E5%8C%96flat%E6%96%B9%E6%B3%95

let arr = [1, [2, [3, [4, 5]]], 6];

// console.log(arr.flat(Infinity));


// 递归处理
// let res = [];
// function myFlat(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     let item = arr[i];
//     if (Array.isArray(item)) {
//       myFlat(item);
//     } else {
//       res.push(item);
//     }
//   }
// }
// myFlat(arr);
// console.log(res);


// 用 reduce 实现数组的 flat 方法
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

console.log("用 reduce 实现数组的 flat 方法", flatten(arr));

