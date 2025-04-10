function myNew() {
  let con = Array.prototype.shift.call(arguments);
  let newObj = Object.create(con);
  let result = con.apply(newObj, arguments);
  return typeof result === "object" ? result : newObj;
}

function myNew2() {
  let obj = {};
  let con = [].shift.call(arguments);
  obj.__proto__ = con.prototype;
  let result = con.apply(obj, arguments);
  return typeof result === "object" ? result : newObj;
}

//测试
let person = myNew(Person, "Curry", 18);


function createObject(Con) {
  // 创建新对象obj
  // var obj = {};也可以
  var obj = Object.create(null);

  // 将obj.__proto__ -> 构造函数原型
  // (不推荐)obj.__proto__ = Con.prototype
  Object.setPrototypeOf(obj, Con.prototype);

  // 执行构造函数，并接受构造函数返回值
  const ret = Con.apply(obj, [].slice.call(arguments, 1));

  // 若构造函数返回值为对象，直接返回该对象
  // 否则返回obj
  return typeof (ret) === "object" ? ret : obj;
}

//https://segmentfault.com/a/1190000016843015
//http://www.conardli.top/docs/JavaScript/%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0call%E3%80%81apply%E3%80%81bind.html#%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0call
Function.prototype.newCall = function(context, ...params) {
  if (typeof context === "object") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...params);
  delete context[fn];
  return result;
};

let person = {
  name: "DH"
};

function say(age, sex) {
  console.log(`name: ${this.name},age: ${age}, sex: ${sex}`);
  return age + sex;
}

let checkNewCall = say.newCall(person, 18, "男");
console.log(checkNewCall);

//apply 和 call 的实现原理，基本类似，区别在于 apply 的参数是以数组的形式传入。
Function.prototype.newApply = function(context, parameter) {
  if (typeof context === "object") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  let fn = Symbol();
  context[fn] = this;
  var result = context[fn](...parameter);
  delete context[fn];
  return result;
};

//https://www.cnblogs.com/echolun/p/12178655.html
Function.prototype.myBind = function(context, ...args1) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  const fn = this;
  return function F(...args2) {
    // 判断是否用与构造函数
    if (this instanceof F) {
      return new fn(...args1, ...args2);
    }
    return fn.apply(context, args1.concat(args2));
  };
};

/**
 函数防抖： 在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
 函数节流： 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，
 ---------如果在同一个单位时间内某事件被触发多次，只有一次能生效。
 */
//防抖表示当指定时间内持续触发某个事件时，该事件会进行初始刷新，重新开始计算
//在debounce函数中返回一个闭包，这里用的普通function，里面的setTimeout则用的箭头函数，
//这样做的意义是让this的指向准确，this的真实指向并非debounce的调用者，而是返回闭包的调用者。
function debounce(fn, delay) {
  let timer = null;
  return function() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

//节流当指定时间持续触发某个事件时，该事件只会执行首次触发事件，也就是说指定时间内只会触发一次。
function throttle(fn, time) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, time);
  };
}
