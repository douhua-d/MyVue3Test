// setTimeout 模拟实现 setInterval

/**
 * setInterval有两个缺点
 *
 * 使用setInterval时，某些间隔会被跳过
 * 可能多个定时器会连续执行
 *
 * 可以这么理解：每个setTimeout产生的任务会直接push到任务队列中；
 * 而setInterval在每次把任务push到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中)。
 * 因而我们一般用setTimeout模拟setInterval，来规避掉上面的缺点
 */

function myInterval(fn, time) {
  let timerId = null;

  function interval() {
    fn();
    timerId = setTimeout(interval, time);
  }

  timerId = setTimeout(interval, time);

  return {
    cancel: function() {
      clearTimeout(timerId);
      timerId = null;
    }
  };
}

function mySetInterval(fn, t) {
  let timerId = null;

  function interval() {
    fn();
    timerId = setTimeout(interval, t); // 递归调用
  }

  timerId = setTimeout(interval, t); // 首次调用
  return {
    // 利用闭包的特性 保存timerId
    cancel: () => {
      clearTimeout(timerId);
    }
  };
}


// 测试
var a = mySetInterval(() => {
  console.log(111);
}, 1000);
var b = mySetInterval(() => {
  console.log(222);
}, 1000);

// 终止定时器
a.cancel();
b.cancel();