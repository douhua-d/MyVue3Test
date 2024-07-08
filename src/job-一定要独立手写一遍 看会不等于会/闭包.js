/**
 * 闭包（Closure）是 JavaScript 中的一个重要概念，它指的是一个函数能够访问其外部作用域（通常是创建该函数的作用域）中的变量，即使该外部作用域已经结束。
 *
 * 闭包的定义
 * 闭包是由函数和创建该函数的词法环境（Lexical Environment）共同组成的。在 JavaScript 中，函数在定义时，会捕获其外部作用域中的变量，从而形成闭包。即使函数被调用时，其外部作用域已经结束，函数依然能够访问这些变量。
 *
 * 闭包的特点
 * 函数内部可以访问外部变量：即使外部函数已经执行完毕并退出，内部函数依然可以访问其外部函数的变量。
 * 变量的持久化：通过闭包，外部函数的变量得以在外部函数执行完毕后继续存在，并且被内部函数访问和修改。
 * 私有变量：可以通过闭包创建私有变量，这些变量对外部不可见，但可以被闭包内部的函数访问和操作。
 */

// 1、基本闭包

// 在这个例子中，innerFunction 是一个闭包，
// 它能够访问 outerFunction 中的变量 outerVariable。
// 即使 outerFunction 已经执行完毕，innerFunction 依然能够访问 outerVariable。
function outerFunction() {
  let outerVariable = 'I am an outer variable';

  function innerFunction() {
    console.log(outerVariable); // 访问外部变量
  }

  return innerFunction;
}

const closure = outerFunction();
closure(); // 输出: 'I am an outer variable'


// 例 2：变量持久化
// 在这个例子中，createCounter 返回的匿名函数形成了一个闭包，
// 它能够访问并更新 createCounter 中的变量 count。
// 每次调用 counter，变量 count 都会被持久化和更新。
function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 输出: 1
console.log(counter()); // 输出: 2
console.log(counter()); // 输出: 3


// 示例 3：私有变量

// 在这个例子中，_name 是 Person 函数中的私有变量，通过闭包，
// getName 和 setName 方法能够访问和修改 _name，而外部代码无法直接访问 _name。
function Person(name) {
  let _name = name; // 私有变量

  return {
    getName: function() {
      return _name;
    },
    setName: function(newName) {
      _name = newName;
    }
  };
}

const person = Person('John');
console.log(person.getName()); // 输出: 'John'
person.setName('Jane');
console.log(person.getName()); // 输出: 'Jane'
