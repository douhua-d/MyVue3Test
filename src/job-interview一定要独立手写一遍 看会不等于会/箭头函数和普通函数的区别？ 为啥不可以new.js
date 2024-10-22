// 箭头函数和普通函数的区别？ 为啥不可以new

//  https://blog.csdn.net/m0_46615524/article/details/125516375  

// 一.箭头函数在一些情况下书写更简洁
//         （如：只有一个参数，函数体直接返回值的时候），即：()中定义参数，如果只有一个参数，可以不写括号；{}中写函数体，如果函数体中只有返回值，可以不写return. 例如：show(item=>item)
// 
// 二.箭头函数没有自己的this
//         箭头函数内的this变量指向外层非箭头函数的函数的this，或者将该箭头函数作为属性的对象，箭头函数不支持call()/apply()/bind()函数特性,普通函数可以通过call()/apply()/bind()改变this的指向。
// 
// 三. 箭头函数内部不可以使用arguments对象，取而代之用rest参数...解决 （rest参数：形式为...变量名）。

// 四.箭头函数没有arguments,super,new.target, 但是可以调用外围的arguments、super、new.target”
//         todo  链接 https://blog.csdn.net/m0_46615524/article/details/125566551
//         前端面试题：（理解）箭头函数没有arguments,super,new.target_薇z的博客-CSDN博客
// 
// 五. 箭头函数是匿名函数，简化了函数定义，不可以当做构造函数。
// 为什么不能用作构造函数：
//         构造函数是通过new关键字来生成对象实例，生成对象实例的过程也是通过构造函数给实例绑定this的过程，而箭头函数没有自己的this。
//         创建对象过程，new 首先会创建一个空对象，并将这个空对象的--proto--指向构造函数的prototype，从而继承原型上的方法，
//         但是箭头函数没有prototype。因此不能使用箭头作为构造函数，也就不能通过new操作符来调用箭头函数。
// 


/**
 * 普通函数 如果是被 new 调用的话 会有 new.target
 * new.target 属性允许你检测函数或构造方法是否是通过new运算符被调用的
 *
 *
 * new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是undefined。 箭头函数没有new.target
 *
 * 箭头函数不能被new执行,因为箭头函数没有this, 没有办法修改 this 的指向，
 * 所以也不可以将其作为构造函数、它也没有 prototype 对象。
 *
 * ！！！重点是没有prototype”
 *
 */

// new.target 允许你检测函数或构造函数是否通过 new 调用。
// 可以在普通函数和类构造函数中使用 new.target，但不能在箭头函数中使用。
// 使用 new.target 可以帮助你确保构造函数正确地通过 new 关键字调用，防止错误的用法。
function Foo() {
  if (!new.target) throw "Foo() must be called with new";
  console.log("Foo instantiated with new");
}

Foo(); // throws "Foo() must be called with new"
new Foo(); // logs "Foo instantiated with new"