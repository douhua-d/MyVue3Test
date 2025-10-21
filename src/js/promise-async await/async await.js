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


/**
 * 结论先说：打印顺序是 a → c → b → d。原因是 await 和 then 的回调都会进 microtask 队列，但它们入队的先后不同，且链式 then 会“下一轮”再入队。
 *
 * 下面按“同步 → microtask”的时间线走一遍：
 *
 * 同步阶段
 *
 * 定义 foo。
 *
 * 执行 foo()：
 *
 * 运行到 await 'foo'。await 等价于 await Promise.resolve('foo') —— 立即得到已完成的 Promise，但仍然把“后续执行（也就是 console.log('a')）”排进 microtask 队列（记为 M1：继续执行并打印 a）。
 *
 * foo() 此时返回一个未完成的 Promise（等它继续执行完才会完成）。
 *
 * foo().then(() => console.log('b'))：给上面的 Promise 绑了一个 then，但现在不会入队，得等 foo() 那个 Promise 真正 resolve 后才会把 b 的回调入队。
 *
 * Promise.resolve().then(() => console.log('c')).then(() => console.log('d'))：
 *
 * Promise.resolve() 是已完成的 Promise，立刻把 第一个 then 的回调排进 microtask（记为 M2：打印 c）。
 *
 * 第二个 then(() => console.log('d')) 只是注册，要等 c 跑完以后，才会把 打印 d 的回调再排入队列。
 *
 * 此时 microtask 队列顺序：[ M1(继续 foo、打印 a), M2(打印 c) ]
 *
 * 开始清空 microtask 队列
 *
 * 处理 M1：恢复 foo，执行 console.log('a') → 打印 a。
 * foo 到达函数末尾返回（相当于 return undefined），于是 foo() 的 Promise 现在 resolve，这会把 then(() => console.log('b')) 的回调排进 microtask（记为 M3：打印 b）。
 *
 * 队列现在变成：[ M2(c), M3(b) ]
 *
 * 处理 M2：执行 console.log('c') → 打印 c。
 * c 的 then 执行完毕，链上的下一个 then(() => console.log('d')) 才会被排进 microtask（记为 M4：打印 d）。
 *
 * 队列现在变成：[ M3(b), M4(d) ]
 *
 * 处理 M3：打印 b。
 *
 * 处理 M4：打印 d。
 *
 * 得到最终顺序：a → c → b → d
 *
 * 要点回顾：
 *
 * await 总是让出执行权，把后续代码排进 microtask（即便等待的是已完成的值/Promise）。
 *
 * Promise.resolve().then(...) 的回调也进 microtask；链式 then（第二个 then）要等第一个 then 的回调跑完后，下一轮 microtask 才会入队。
 *
 * foo().then(b) 的回调要等 foo 内部 await 后的代码（打印 a）执行完，foo() 的 Promise 才会 resolve，进而把 b 入队；此时队列里已经有了 c，所以顺序变成 a → c → b → d。
 */

