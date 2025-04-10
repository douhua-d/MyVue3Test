//https://juejin.cn/post/7005863255990075399
//https://blog.csdn.net/weixin_53988544/article/details/117846249
/**
 * 可以这么理解：每个 setTimeout 产生的任务会直接 push 到任务队列中；
 * 而 setInterval 在每次把任务 push 到任务队列前，
 * 都要进行一下判断(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)。
 * */

function myInterval(fn, time) {
  let timeId = null;
  let isClear = false;

  function interval() {
    if (isClear) {
      isClear = false;
      clearTimeout(timeId);
    } else {
      fn();
      timeId = setTimeout(interval, time);
    }
  }

  timeId = setTimeout(interval, time);

  return () => {
    isClear = true;
  };
}

function mySetTimeOut(fn, time) {
  let now = Date.now();
  let flag = true;
  while (flag) {
    if (Date.now() - now >= time) {
      flag = false;
      fn();
    }
  }
}