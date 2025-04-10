// 函数声明 函数表达式 变量声明  函数作用域问题
// https://www.cnblogs.com/liuhe688/p/5891273.html   示例详解

var x = 1, y = 0, z = 0;
var add = function(x) {
  return x = x + 1;
};
y = add(x);   // 2

console.log({ x });  //  1
console.log({ y });  //  2

function add(x) {
  return x = x + 3;
}

z = add(x);  // 2

console.log("===========");
console.log({ x });
console.log({ y });
console.log({ z });
// x,y,z的值

//  函数的形参也是局部变量
//  https://juejin.cn/post/7069578126979760158
//

/**
 * 因为JS基于的是词法作用域，不难得出它的运行结果是10。这段代码经历了这样的执行过程：
 *
 * f2函数调用，f1函数调用
 * 在f1函数作用域内查找是否有局部变量num
 * 发现没找到，于是根据书写位置，向上一层作用域（全局作用域）查找，发现num，打印num=10
 * @type {number}
 */
var num = 10;
function f1(){
  console.log(num)
}
function f2(){
  var num  = 20;
  f1()
}
f2();







//高途教育一面 手写算法题
//最大二进制奇数
/**
 *给你一个二进制字符串s，其中至少包含一个'1'，按照某种方式重新排列字符串中的位，使得到的二进制数字是可以由该组合生成的最大二进制奇数
 *示例1:
 输入：s = '010'
 输出：'001'
 *示例2:
 输入：s = '0101'
 输出：'1001'
 */
function fn(s) {

  const arr = s.split();
  arr.sort((a, b) => b - a);
  let nums = 0;
  arr.forEach(i => {
      if (i === 1) {
        nums += 1;
      }
    }
  )
    [arr[nums - 1], arr[arr.length - 1]] = [arr[arr.length - 1], arr[nums - 1]];
  return arr.join();
}


function rearrangeToMaxOddBinary(s) {
  // 统计0和1的数量
  let count0 = 0;
  let count1 = 0;

  for (let char of s) {
    if (char === '0') {
      count0++;
    } else if (char === '1') {
      count1++;
    }
  }

  // 确保最后一位是'1'，使得它是奇数
  if (count1 === 0) {
    return "没有'1'，无法生成奇数";
  }

  // 构建结果字符串
  let result = '';

  // 添加所有的'1'，减去1个以确保最后一位是'1'
  result += '1'.repeat(count1 - 1);
  // 添加所有的'0'
  result += '0'.repeat(count0);
  // 最后添加一个'1'
  result += '1';

  return result;
}

// 示例1
console.log(rearrangeToMaxOddBinary('010')); // 输出：'001'

// 示例2
console.log(rearrangeToMaxOddBinary('0101')); // 输出：'1101'
