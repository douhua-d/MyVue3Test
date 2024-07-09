// https://juejin.cn/post/7347154070539518002
// 1,234,567 国外标准货币表达方式 

// 数字千分位
function formatNumber(number) {
  if (typeof number !== "number") {
    return;
  }
  // 类型转换  数字转为字符串、然后才能用 split 方法
  number += "";
  let [interger, decimal] = number.split(".");

  console.log("333", interger, decimal);

  // console.log(interger.split(""), decimal);

  // 内部函数封装 复用 负责加入','
  const doSplit = (num, isInteger = true) => {
    if (num === "") return "";

    if (isInteger) num = num.split("").reverse();
    let str = [];
    for (let i = 0; i < num.length; i++) {
      console.log("=====", i, num[i]);
      if (i !== 0 && i % 3 === 0) {
        console.log("&&&&&&", i, num[i]);
        str.push(",");
      }
      str.push(num[i]);
    }
    if (isInteger) return str.reverse().join("");
    return str.join("");
  };

  interger = doSplit(interger);
  decimal = doSplit(decimal, false);
  return interger + (decimal === "" ? "" : "." + decimal);
}

console.log(formatNumber(12345.6789)); // 12,345.678,9
// console.log(formatNumber(123456.6789)); // 123,456.678,9

console.log([123456].join(), [123456].join(""));
console.log("123456".split(), "123456".split(""));


// 使用 正则表达式  正向先行断言

// 12345
// let reg = /(?=(\d{3})+$)/g

// console.log(1111111111,"123456".replace(reg, ','));

let reg = /(?!^)(?=(\d{3})+$)/g;

console.log(1111111111, "123456".replace(reg, ","));

// 数字千分位处理  比如 1236789  =>  1,236,789
function dealNumber(num) {
  let arr = num.toString().split("").map(Number).reverse();
  let strArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      strArr.push(",");
    }
    strArr.push(arr[i]);
  }
  
  return strArr.reverse().join('');
}

console.log('dealNumber==',dealNumber(12345678));


let number = 123456;

console.log(number.toString().split("")); // todo 拿到的还是字符串

console.log(number.toString().split("").map(Number));  // 好了数字了


