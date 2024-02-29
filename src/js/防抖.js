// 防抖原理：
/**
 * 防抖（debounce）：不管事件触发频率多高，一定在事件触发n秒后才执行，
 * 如果你在一个事件触发的 n 秒内又触发了这个事件，就以新的事件的时间为准，n秒后才执行，
 * 总之，触发完事件 n 秒内不再触发事件，n秒后再执行。
 */

window.addEventListener("resize", debounce(handleResize, 200));

// 实现
// 注意考虑两个问题：
// 1.在debounce函数中返回一个闭包，这里用的普通function，里面的setTimeout则用的箭头函数，这样做的意义是让this的指向准确，this的真实指向并非debounce的调用者，而是返回闭包的调用者。
// 
// 2.对传入闭包的参数进行透传。

// 不是立即执行的，等待触发后才会执行
function debounce(fn, time) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

//有时候我们需要让函数立即执行一次，再等后面事件触发后等待n秒执行，我们给debounce函数一个flag用于标示是否立即执行。
// 
// 当定时器变量timer为空时，说明是第一次执行，我们立即执行它。

function debounce(fn, time, flag) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    if (flag && !timer) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}