//https://juejin.cn/post/6844904119463837704
//https://www.runoob.com/regexp/regexp-metachar.html
let str = "132123201203200000";
let reg = /^(?<A>[1-9]\d{5})(?<B>(19|20)\d{2})(?<C>0[1-9]|10|11|12)(?<D>0[1-9]|[1-2]\d|30|31)\d{3}(\d|x)$/i;
let res = reg.exec(str);
// console.log(res);
// console.log(res.groups.B);//可以直接拿到B组的内容


//验证手机号
let phoneReg = /^1[3-9]\d{9}$/;
// console.log(phoneReg.test("13245678945")); // true
// console.log(phoneReg.test("1324567895"));  //false
// console.log(phoneReg.test("12245678945"));  //false

//https://mp.weixin.qq.com/s/z9p7kyZTZBj0sDFHz90V-Q
// 数字的千分位分割法  将123456789转化为123,456,789
let price = "123456789";
let priceReg = /(?!^)(?=(\d{3})+$)/g;
// console.log(price.replace(priceReg, ","));


//手机号3-4-4分割
//将手机号18379836654转化为183-7983-6654
let mobile = "18379836654";
let mobileReg = /(?=(\d{4})+$)/g;
// console.log(mobile.replace(mobileReg, "-"));


//https://www.cnblogs.com/dxzg/p/8279919.html
//https://juejin.cn/post/6844903648309297166#heading-24
/**
 * replace()
 接收两个参数，第一个参数为匹配的内容，第二个参数为替换的元素（可用函数）*/
var str2 = "get-element-by-id";  // 得到 getElementById
var reg2 = /-\w/g; // 匹配横杆以及之后的一个字符，全局匹配
// console.log(str2.replace(reg2, function($0) {
//   console.log($0); // -e -b -i
//   return $0.slice(1).toUpperCase();
//   // 匹配到到是-e -b -i 形式截取后一个字符转成大写
// }));

// var str2 = "get-element-by-id";  // 得到 getElementById
// let reg = /-[a-z]/g;
// console.log(str2.replace(reg,function(item){
//   console.log(item);
//   return item.slice(1).toUpperCase()
// }));  // 得到 getElementById

let text = "cat, bat, sat, fat";
let result = text.replace("at", "ond");
console.log(result); // "cond, bat, sat, fat"


// let text = "cat, bat, sat, fat";
// let pattern = /.at/;
// let matches = text.match(pattern);
// console.log(matches); // [ 'cat', index: 0, input: 'cat, bat, sat, fat', groups: undefined ]
// console.log(matches[0]); // 'cat'

// let text = "cat, bat, sat, fat";
// let pattern = /.at/g;  // 加了全局匹配就是 返回的匹配到的组成的数组
// let matches = text.match(pattern);
// console.log(matches); // [ 'cat', 'bat', 'sat', 'fat' ]

/**
 * search()
 接收一个参数，可以是一个正则表达式字符串，也可以是一个RegExp对象，找到则返回匹配索引，否则返回 -1
 */
// let text = "cat, bat, sat, fat";
// let pos = text.search(/at/);
// console.log(pos); // 1

// let text = "cat, bat, sat, fat";
// let pos = text.search(/at/g);
// console.log(pos); // 1