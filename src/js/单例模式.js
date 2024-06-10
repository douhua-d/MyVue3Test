/**
 * 惰性单例又被成为懒汉式，相对应的概念是饿汉式：
 *
 * 懒汉式单例是在使用时才实例化
 * 饿汉式是当程序启动时或单例模式类一加载的时候就被创建。
 * 我们可以举一个简单的例子比较一下：
 * @param name
 * @constructor
 */

class FuncClass {
  constructor() {
    this.bar = "bar";
  }
}

// 饿汉式
const HungrySingleton = (function() {
  const _instance = new FuncClass();

  return function() {
    return _instance;
  };
})();

// 懒汉式
const LazySingleton = (function() {
  let _instance = null;

  return function() {
    return _instance || (_instance = new FuncClass());
  };
})();

const visitor1 = new HungrySingleton();
const visitor2 = new HungrySingleton();
const visitor3 = new LazySingleton();
const visitor4 = new LazySingleton();

console.log(visitor1 === visitor2);	// true
console.log(visitor3 === visitor4);	// true


let Singleton = function(name) {
  this.name = name;
};

Singleton.prototype.getName = function() {
  alert(this.name);
};

Singleton.getInstance = (function(name) {
  var instance;
  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();

let a = Singleton.getInstance("ConardLi");
let b = Singleton.getInstance("ConardLi2");

console.log(a === b);   //true