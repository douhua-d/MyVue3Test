// 题目一 12345.6 => 12,345.6
function convert(money) {
  let index = money.indexOf(".");
  let part1 = money.slice(0, index);
  let part2 = money.slice(index);
  let reg = /(?!^)(?=(\d{3})+$)/g;
  return part1.replace(reg, ",") + part2;
}

console.log("正则", convert("12345.6"));


// 题目二
function deepCopy(obj) {
  if (typeof obj !== "object") return;
  const newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Object.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

const obj = { a: 1 };
const nobj = deepCopy(obj);
nobj.a = 2;
obj.a == 1;
console.log(obj);
console.log(nobj);
console.log(obj.a == 1);  // true



