/**
 * 数组去重
 *
 * 会有一个数组，数组里面的数据类型不确定，两个属性相同的对象也认为是重复的
 *
 * 利用Object.is()
 *
 * console.log(Object.is({name:1},{name:1}));  // false
 */

// 判断两个值是否相等
const isObject = value => typeof value === "object" && value !== null;
const isEqual = (obj1, obj2) => {
  if (!isObject(obj1) || !isObject(obj2)) {
    return Object.is(obj1, obj2);
  }

  if (obj1 === obj2) {
    return true;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

console.log(isEqual({ name: 1 }, { name: 1 }));
console.log(isEqual([2], { name: 1 }));
console.log(isEqual("345", 345));

let arr = [{ name: "张三" }, { name: "张三" }, 30, "30", 2, 30];

function uniqueArr(arr) {
  let res = [];
  for (let item of arr) {
    let findIndex = res.findIndex(i => isEqual(i, item));
    if (findIndex === -1) {
      res.push(item);
    }
  }
  return res;
}

console.log(uniqueArr(arr));



