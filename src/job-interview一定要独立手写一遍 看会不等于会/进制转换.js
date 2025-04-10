
var num = 10101010;
// 0*2^0 + 1*2 + 0 + 1*2^3 + 0 + 1*2^5 + 0 + 1*2^7 = 2 + 8 + 32 + 128 = 170

// 把num 当做2进制 的值 转换为10进制
var result = parseInt(0xA, "0X");
console.log(result) // 170