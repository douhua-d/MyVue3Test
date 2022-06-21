//手写-怎么在制定数据源里面生成一个长度为 n 的不重复随机数组
// 能有几种方法 时间复杂度多少（字节）

//第一版 时间复杂度为 O(n^2)
function getTenNum(testArray, n) {
  let result = [];
  for (let i = 0; i < n; ++i) {
    const random = Math.floor(Math.random() * testArray.length);
    let cur = testArray[random];
    if (result.includes(cur)) {
      cur = testArray[Math.floor(Math.random() * testArray.length)];
    }
    result.push(cur);
  }
  return result;
}

function getUniqueArr(source, n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * source.length);
    let cur = source[index];
    if (result.includes(cur)) {
      cur = source[Math.floor(Math.random() * source.length)];
    }
    result.push(cur);
  }
  return result;
}

const testArray = ["1", 2, 3, 4, "5", 6, 7, 8, 9, 10, 11, 12, 13, 14];
const resArr = getTenNum(testArray, 10);
console.log(resArr);
console.log("666666", getUniqueArr(testArray, 6));


//第二版 标记法 / 自定义属性法 时间复杂度为 O(n)
function getTenNum2(testArray, n) {
  let result = [];
  let obj = {};
  while (n > 0) {
    let index = Math.floor(Math.random() * testArray.length);
    if (!obj[index]) {
      obj[index] = true;
      result.push(testArray[index]);
      n--;
    }
  }
  return result;
}

console.log("getTenNum2", getTenNum2(testArray, 6));


//第三版 交换法 时间复杂度为 O(n)
//值得一提的是操作数组的时候使用交换法 这种思路在算法里面很常见
function getTenNum3(testArray, n) {
  const cloneArr = [...testArray];
  let result = [];
  for (let i = 0; i < n; i++) {
    const ran = Math.floor(Math.random() * (cloneArr.length - i));
    result.push(cloneArr[ran]);
    cloneArr[ran] = cloneArr[cloneArr.length - i - 1];
  }
  return result;
}


//最终版 边遍历边删除 时间复杂度为 O(n)
function getUniqueArray(testArray, n) {
  let result = [];
  let cloneArr = [...testArray];
  for (let i = 0; i < n; i++) {
    let random = Math.floor(Math.random() * cloneArr.length);
    let cur = cloneArr[random];
    result.push(cur);
    cloneArr.splice(random, 1);
  }
  return result;
}

console.log("getUniqueArray", getTenNum2(testArray, 5));