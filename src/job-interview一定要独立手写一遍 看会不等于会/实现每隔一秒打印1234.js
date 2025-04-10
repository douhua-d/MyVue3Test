//使用 闭包
// for (var i = 1; i < 5; i++) {
//   (function(i) {
//     setTimeout(function() {
//       console.log(i);
//     }, i * 1000);
//   })(i);
// }

// for (var i = 1; i < 5; i++) {
//   (function(i) {
//     setTimeout(() => console.log(i), i * 1000);
//   })(i);
// }

// 使用 块级作用域 let
for (let i = 1; i < 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}