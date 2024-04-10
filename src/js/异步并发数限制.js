/**
 * 关键点
 * 1. new promise 一经创建，立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的执行微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行
 * 5. 任务完成后，需要从 doingTasks 中移出
 */

// https://juejin.cn/post/6998194847408472100  失败重试 

// Promise.resolve()  等解释  https://blog.csdn.net/whl0071/article/details/126176400

// 图片请求并发控制 面试题  https://blog.csdn.net/tonghonglei/article/details/88054116

function limit(count, array, iterateFunc) {
  const tasks = [];
  const doingTasks = [];
  let i = 0;
  const enqueue = () => {
    console.log("enqueue===");
    if (i === array.length) {
      return Promise.resolve();
    }
    const task = Promise.resolve().then(() => iterateFunc(array[i++]));
    console.log({ task });
    tasks.push(task);
    console.log({tasks});
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1));
    console.log({ doing });
    doingTasks.push(doing);
    console.log({doingTasks});
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve();
    console.log('123--res', { res });
    return res.then(enqueue);
  };
  console.log('接近结尾');
  return enqueue().then(() => Promise.all(tasks));
}

// test
// const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))

const timeout = i => new Promise(resolve => setTimeout(() => {
  console.log("每次迭代拿到的异步任务结果", i);
  resolve(i);
}, i));

limit(3, [1000, 2000, 3000, 4000, 5000, 6000], timeout).then((res) => {
  console.log("最后的所有结果汇总--res---", res);
});


// console.log("试试看------",Promise.resolve().then(() => {
//   console.log("啥--？？？？？？？？？？");
// }));


var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/getImgData/gray.gif',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png'
];
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      console.log('一张图片加载完成');
      resolve();
    }
    img.onerror = reject
    img.src = url
  })
};

 