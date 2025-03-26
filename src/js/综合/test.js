// let obj = {
//     greet: function() {
//         console.log('Hello!');
//     }
// };
//
// obj?.greet();  // 输出: 'Hello!'

// 如果 obj 没有 greet 方法，则不抛出错误，返回 undefined
let obj2 = {};
obj2.greet?.();