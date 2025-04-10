// 1.	D
// 2.	Link是HTML标签，@import是css语法
// 3.	法1：flex布局 display:flex;  justify-content: center;align-items: center;
//    法2：绝对定位和负margin值;父盒子.box {position:relative},.div{width:100px;height:100px;position: absolute;left: 50%;top: 50%;margin-left: -50px;margin-top: -50px; }
//    法3: 绝对定位和transform;父盒子.box {position:relative},.div{position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);}
//    法4:绝对定位 + left/right/bottom/top + margin;父盒子.box {position:relative},.div{position: absolute;top: 0;left: 0;right: 0;bottom: 0; margin:auto}
// 4. 2,1
// 5.  1,4,3
// 6.  防抖表示当指定时间内持续触发某个事件时，该事件会进行初始刷新，重新开始计算
//     节流当指定时间持续触发某个事件时，指定时间内只会触发一次
function debounce(fn, timing) {
  let timer = null;
  return function() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, timing);
  };
}

function throttle(fn, time) {
  let canRun = true;
  let timer = null;
  return function() {
    if (!canRun) return;
    timer && clearTimeout(timer);
    canRun = false;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, time);
  };
}

// 7.
function change(str) {
  let reg = /-\w/g;
  let res = str.replace(reg, function($0) {
    return $0.slice(1).toUpperCase();
  });
  return res;
}

// 8.
Promise.prototype.all = function(promiseList) {
  let count = 0;
  let len = promiseList.length;
  let res = [];
  return new Promise((resolve, reject) => {
    for (let i in promiseList) {
      Promise.resolve(promiseList[i]).then(val => {
        count++;
        res[i] = val;
        if (count === len) {
          resolve(res);
        }
      }).catch(e => {
        reject(e);
      });
    }
  });
};

// 9. props,emit,ref,$parent,vuex,Event Bus
// 10.
//减少网络请求、CDN 防抖 节流 懒加载 图片压缩  js css 文件压缩

