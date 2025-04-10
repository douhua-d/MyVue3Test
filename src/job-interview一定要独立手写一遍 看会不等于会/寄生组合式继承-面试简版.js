/**
 * 类的继承在几年前是重点内容，有n种继承方式各有优劣，es6普及后越来越不重要，
 * 那么多种写法有点『回字有四样写法』的意思，
 * 如果还想深入理解的去看红宝书即可，我们目前只实现一种最理想的继承方式。
 */

// 寄生组合继承
function Parent(name) {
  this.name = name
}
Parent.prototype.say = function() {
  console.log(this.name + ` say`);
}
Parent.prototype.play = function() {
  console.log(this.name + ` play`);
}

function Child(name, parent) {
  // 将父类的构造函数绑定在子类上
  Parent.call(this, parent)
  this.name = name
}

/**
 1. 这一步不用Child.prototype = Parent.prototype的原因是怕共享内存，修改父类原型对象就会影响子类
 2. 不用Child.prototype = new Parent()的原因是会调用2次父类的构造方法（另一次是call），会存在一份多余的父类实例属性
 3. Object.create是创建了父类原型的副本，与父类原型完全隔离
 */
Child.prototype = Object.create(Parent.prototype);

// 注意记得把子类的构造指向子类本身
Child.prototype.constructor = Child;
Child.prototype.say = function() {
  console.log(this.name + ` say`);
}

