// 百度一面 手写题
// urls
// num <= 3
// 写的是错误的  return 肯定不是在循环里，要在return 里边写for 循环
//https://blog.csdn.net/tonghonglei/article/details/88054116

function fn(urls) {
  let num = urls.length;
  let limit = 3;
  let count = 0;
  for (let i = 0; i < num; i++) { // 顺序
    return new Promise((resolve, reject) => {
      if (count <= limit) {
        let img = new Image();
        img.src = num[i];
        img.onload = function() {
          count++; // 移除 promise 利用队列 堆栈等
        };
        resolve();
      } else {
        reject(err);
      }
    });
  }
}

// zoom = 1 ie
// clear:both  其他值 left
//

// 百度一面手写 bind实现 和调用
Function.prototype.myBind = function(context, ...args1) {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  let fn = this;
  return function F(...args2) {
    if (fn instanceof F) {
      return new fn(...args1, ...args2);
    } else {
      return fn.apply(context, [...args1, ...args2]);
    }
  };
};

const obj = {
  a: "124"
};

const obj2 = {
  a: "666666"
};

function test(obj) {
  console.log(this);
  console.log(obj);
  console.log(obj.a);
}

let fn1 = test.myBind(obj, obj);
fn1();


