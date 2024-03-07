//前面说过，组合继承是 JavaScript 最常用的继承模式，不过它也有自己的缺点，
// 组合继承最大的问题是，无论什么情况下都会调用两次超类的构造函数
//https://www.sillywa.com/2021/03/01/JS%E7%BB%A7%E6%89%BF%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F%E5%8F%8A%E6%AF%94%E8%BE%83/


//组合寄生式继承  ES5
function SuperType(name) {
  this.name = name;
}

SuperType.prototype.sayName = function() {
  return this.name;
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  return this.age;
};

let p1 = new SubType("好", 18);
console.log(p1.sayName());

/**
 * https://yanhaijing.com/javascript/2015/05/09/diff-between-keys-getOwnPropertyNames-forin/
 * for in
 主要用于遍历对象的 可枚举属性，包括自有属性、继承自原型的属性

 Object.keys
 返回一个数组，元素均为对象 自有的可枚举属性

 Object.getOwnProperty
 用于返回对象的 自有属性，包括可枚举和不可枚举的

 class类中，类的内部所有定义的方法，都是 不可枚举的（non-enumerable）。
 * */

// 组合寄生式继承  ES6
// https://blog.csdn.net/sinat_33488770/article/details/119960670?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-119960670.pc_agg_new_rank&utm_term=es6%E7%BB%84%E5%90%88%E7%BB%A7%E6%89%BF&spm=1000.2123.3001.4430
// ES5 ES6 继承的区别
/**
 *区别1：ES5里的构造函数就是一个普通的函数，可以使用new调用，也可以直接调用，
 *      而ES6的class不能当做普通函数直接调用，必须使用new操作符调用
 *
 *区别2：class不存在变量提升，所以父类必须在子类之前定义
 *
 *区别3：ES5的原型方法和静态方法默认是可枚举的，而class的默认不可枚举，
 *      如果想要获取不可枚举的属性可以使用Object.getOwnPropertyNames方法
 *
 *区别4：子类可以直接通过__proto__找到父类，而ES5是指向Function.prototype;
 *      ES6：Sub.__proto__ === Sup   ES5：Sub.__proto__ === Function.prototype
 *
 *区别5：ES5的继承，实质是先创造子类的实例对象this，然后再执行父类的构造函数给它添加实例方法和属性(不执行也无所谓）。
 *      而ES6的继承机制完全不同，实质是先创造父类的实例对象this（当然它的__proto__指向的是子类的prototype），然后再用子类的构造函数修改this。
 *      这就是为啥使用class继承在constructor函数里必须调用super，因为子类压根没有自己的this，
 *      另外不能在super执行前访问this的原因也很明显了，因为调用了super后，this才有值。
 * */
// 父类
class Sup {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log("我叫 " + this.name);
  }

  static sleep() {
    console.log(`我在睡${this.type}觉`);
  }
}

// static只能设置静态方法，不能设置静态属性，所以需要自行添加到Sup类上
Sup.type = "午";
// 另外，原型属性也不能在class里面设置，需要手动设置到prototype上，比如Sup.prototype.xxx = 'xxx'

// 子类，继承父类
class Sub extends Sup {n
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  say() {
    console.log("你好");
    super.say();
    console.log(`今年${this.age}岁`);
  }
}

Sub.type = "懒";