//  async 函数 返回一个 promise对象
//  https://juejin.cn/post/7007031572238958629

// https://juejin.cn/post/7215844385615036453

 //  https://juejin.cn/post/7215809449910304827  看这个吧


// async function foo() {
//   return Promise.resolve('foo')
// }
// foo().then(() => console.log('a'))
// Promise.resolve()
//   .then(() => console.log('b'))
//   .then(() => console.log('c'))
//   .then(() => console.log('d'))
//
// // 输出结果：b c a d


async function foo() {
  await 'foo'
  console.log('a')
}
foo().then(() => console.log('b'))
Promise.resolve()
  .then(() => console.log('c'))
  .then(() => console.log('d'))
// 输出结果：a c b d

