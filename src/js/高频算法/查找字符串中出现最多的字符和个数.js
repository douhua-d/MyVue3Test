let str = "abcabcabcbbccccc";
let num = 0;
let char = '';

// 使其按照一定的次序排列
str = str.split('').sort().join('');
// "aaabbbbbcccccccc"

// 定义正则表达式
let re = /(\w)\1+/g;
str.replace(re,($0,$1) => {
  console.log($0,$1);
  if(num < $0.length){
    num = $0.length;
    char = $1;
  }
});
console.log(`字符最多的是${char}，出现了${num}次`);

/**
 * str.replace(re, ($0, $1) => {...}) 使用正则表达式 re 进行替换操作，但实际上并没有改变字符串，而是利用回调函数处理匹配结果。
 * 在回调函数中，$0 是完整匹配的字符串，$1 是捕获组中的字符。
 * console.log($0, $1); 打印每次匹配的结果。
 * if (num < $0.length) { ... } 用于更新最长连续字符的长度 num 和字符 char。
 */