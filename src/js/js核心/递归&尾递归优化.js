/**
 * 什么是尾递归？
 * 尾递归是指递归调用是函数的最后一步操作，即递归调用的返回值直接返回，不做任何额外操作。
 * 普通递归 vs 尾递归
 */

// 普通递归
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1); // 递归调用后还有乘法操作，不是尾递归
}

// n =3
//  3 * factorial(2)
//   3 * 2 * factorial(1)
//     3 * 2 * 1

// 尾递归

/**
 * 尾递归是指，在函数返回的时候，调用自身本身，并且，return语句不能包含表达式。
 */
function factorial(n, acc = 1) {
  if (n === 1) return acc;
  return factorial(n - 1, n * acc); // 递归调用是最后一步，直接返回
}

console.log(factorial(5)); // 输出 120



// 1. 普通递归（斐波那契）
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // 递归调用后还有加法操作，不是尾递归
}

// 2. 尾递归（斐波那契）
function fib(n, a = 0, b = 1) {
  if (n === 0) return a;
  if (n === 1) return b;
  return fib(n - 1, b, a + b); // 递归调用是最后一步
}
console.log(fib(10)); // 输出 55