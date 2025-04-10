// 众所周知，slice是操作字符串/数组的一个方法，包含两个参数（start,end)
// 用来提取start到end（不包含）的部分。返回一个新的字符串/数组。
// 注：不会改变原来的字符串/数组。
//
// 但是当end传的是负数的时候，则是从尾部开始算起，到字符串/数组的倒数第Math.abs(end)个，但不包括倒数第Math.abs(end)的值。比如：

let msg = "hello world";
let str = msg.slice(1, -1); //截取msg从index=1，到msg的最后一个字符串，但不包括最后一个字符串
console.log(msg); //hello world
console.log(str); // ello worl

//数组也是一样的
let arr = [11, 22, 33, 44, 55, 66];
let newArr = arr.slice(2, -2); //从数组中截取下标为2开始，到数组的倒数第二个（但不包括他），返回新数组；
console.log(arr);
console.log(newArr);

function typeOf(obj) {
  // console.log(Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
  console.log(Object.prototype.toString.call(obj));
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

typeOf(1);  //  number
typeOf("字符串"); //  string
typeOf(undefined); //  undefined
typeOf(null); //  null
typeOf({ a: 2435, b: [2] }); //  object
typeOf(true); //  boolean
typeOf(function() {  //  function
  console.log("fun");
});
typeOf(new Date());  // date

