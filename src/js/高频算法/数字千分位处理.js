// https://juejin.cn/post/7347154070539518002
// 1,234,567 国外标准货币表达方式 
function formatNumber(number) {
  if (typeof number !== "number") {
    return;
  }
  // 类型转换
  number += "";
  let [interger, decimal] = number.split(".");

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
