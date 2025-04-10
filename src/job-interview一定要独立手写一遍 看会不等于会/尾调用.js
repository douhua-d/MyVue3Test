
// 普通递归
//如果n等于5，这个方法要执行5次，才返回最终的计算表达式，
// 这样每次都要保存这个方法，就容易造成栈溢出，复杂度为O(n)
// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }


// 尾递归
//可以看到，每一次返回的就是一个新的函数，不带上一个函数的参数，
// 也就不需要储存上一个函数了。尾递归只需要保存一个调用栈，复杂度 O(1)
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
console.log("--------", factorial(1));