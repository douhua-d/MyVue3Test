//  https://mp.weixin.qq.com/s/x6ZaKf-1GnpSqaR9t-2DBg

// async await原理，手写
// https://juejin.cn/post/7007031572238958629#heading-15

async function async1 () {
  console.log('1')
  await async2()
  console.log('AAA')
}

async function async2 () {
  console.log('3')
  return new Promise((resolve, reject) => {
    resolve()
    console.log('4')
  })
}

console.log('5')

setTimeout(() => {
  console.log('6')
}, 0);

async1()

new Promise((resolve) => {
  console.log('7')
  resolve()
}).then(() => {
  console.log('8')
}).then(() => {
  console.log('9')
}).then(() => {
  console.log('10')
})
console.log('11')

// // 最终结果👉: 5 1 3 4 7 11 8 9 AAA 10 6


/**
 * 步骤拆分👇：
 *
 * 先执行同步代码，输出5
 *
 * 执行setTimeout，是放入宏任务异步队列中
 *
 * 接着执行async1函数，输出1
 *
 * 执行async2函数，输出3
 *
 * Promise构造器中代码属于同步代码，输出4
 *
 * async2函数的返回值是Promise，等待2个then后放行，所以AAA暂时无法输出
 *
 * async1函数暂时结束，继续往下走，输出7
 *
 * 同步代码，输出11
 *
 * 执行第一个then，输出8
 *
 * 执行第二个then，输出9
 *
 * 终于等到了两个then执行完毕，执行async1函数里面剩下的，输出AAA
 *
 * 再执行最后一个微任务then，输出10
 *
 * 执行最后的宏任务setTimeout，输出6
 * 
 * */