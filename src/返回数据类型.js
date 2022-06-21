//https://blog.csdn.net/qq_42127308/article/details/109838360


// console.log(Object.prototype.toString.call(null))         [object Null]
// console.log(Object.prototype.toString.call({}))           [object Object]
// console.log(Object.prototype.toString.call([1,"p"]))      [object Array]
// console.log(Object.prototype.toString.call(Symbol(123)))  [object Symbol]

//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
//https://www.cnblogs.com/ranyonsue/p/10757567.html

//https://vue3js.cn/interview/JavaScript/typeof_instanceof.html#%E4%B8%89%E3%80%81%E5%8C%BA%E5%88%AB
const judgeType = (data) => {
  let dataType = "";
  if (typeof data !== "object") {
    dataType = typeof data;
  } else {
    let tempClass = Object.prototype.toString.call(data);
    dataType = tempClass.match(/\[object (.*)\]/)[1].toLowerCase();
    console.log("match-----", tempClass.match(/\[object (.*)\]/));
    //match----- [ '[object Array]','Array',index: 0,input: '[object Array]',groups: undefined ]

    console.log("match-----", tempClass.match(/\[object .*\]/));  // 没有用小括号捕获
    // [ '[object Array]',index: 0, input: '[object Array]',groups: undefined ]
  }
  return dataType;
};

function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}

getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
// getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回





judgeType(123);
// "number"
judgeType("123");
// "string"
judgeType(true);
// "boolean"
judgeType(undefined);
// "undefined"
judgeType(null);
// "null"
judgeType({ a: 123 });
// "object"
judgeType([123]);
// "array"
judgeType(function a() {
  return 123;
});
// "function"
judgeType(Symbol(123));
// "symbol"

console.log(judgeType([123]));

console.log("bigint--------",typeof BigInt(3n)); // bigint
