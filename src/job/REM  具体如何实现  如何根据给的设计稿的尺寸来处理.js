// REM（root em）是一种相对单位，用于创建响应式和可缩放的布局。REM 的值是相对于文档的根元素（即 <html> 元素）的字体大小。使用 REM 单位，可以确保布局在不同屏幕尺寸和 DPI 的设备上保持一致的比例。
// 
// 要根据设计稿的尺寸使用 REM，可以遵循以下步骤：
// 
// 1. 确定设计稿的基础尺寸
// 假设设计稿的宽度为 750px（这是一个常见的移动端设计宽度）。
// 
// 2. 设定 REM 的基准值
// 为了简化计算，通常会选择一个基础字体大小作为 REM 的基准值。例如，可以设定 1rem = 10px，这样 75px 就是 0.75rem，750px 就是 75rem。
// 
// 3. 动态调整根元素的字体大小
// 使用 JavaScript 来根据设备的屏幕宽度动态调整 <html> 元素的字体大小。以下是一个简单的示例，假设屏幕宽度为 750px 时，字体大小应为 100px：



(function setRemUnit() {
  var docEl = document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function() {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
  };

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
})();


// PostCSS 中有多个插件可以实现单位转换，最常用的是 postcss-px-to-viewport 和 postcss-pxtorem。
// 这些插件能够自动将 CSS 中的 px 单位转换为其他单位，
// 如 vw（视口宽度单位）或 rem（根元素的字体大小单位），从而实现响应式设计。

//  npm install postcss-pxtorem --save-dev 
// module.exports = {
//   plugins: {
//     'postcss-pxtorem': {
//       rootValue: 16, // 根元素字体大小
//       unitPrecision: 5, // 转换后的小数位数
//       propList: ['*'], // 需要转换的属性列表，* 代表所有属性都转换
//       selectorBlackList: ['.ignore'], // 不转换的类
//       replace: true, // 替换直接属性
//       mediaQuery: false, // 允许在媒体查询中转换px
//       minPixelValue: 0 // 小于或等于1px不转换
//     }
//   }
// }


//  docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';  这样设置的原因是啥？  如何理解

/**
 * 在解释这一行代码之前，我们先回顾一下REM的工作原理和目标：REM单位的大小是相对于HTML根元素的字体大小的。当我们说“1rem”，实际上是在说“HTML根元素字体大小的1倍”。
 *
 * 目标
 * 我们的目标是使网页在不同屏幕尺寸上具有相同的比例。例如，如果设计稿的宽度是750px，我们希望在任何设备上，每10px在设计稿中的宽度，都能对应于网页上的1rem。这样，我们可以用rem单位来指定元素的大小，而不必关心实际的像素值，从而实现响应式布局。
 *
 * 解释代码
 * docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'; 这行代码的作用是根据当前屏幕宽度动态调整HTML根元素的字体大小，具体来说：
 *
 * clientWidth 返回的是可视区域的宽度，即当前窗口的宽度（不包括滚动条和边框）。
 * 我们将 clientWidth 除以设计稿的宽度（750px），得到一个比例因子，表示当前屏幕宽度是设计稿宽度的多少倍。
 * 然后我们将这个比例因子乘以100，是因为我们想让每10px在设计稿中的宽度对应于网页上的1rem。所以，如果设计稿的宽度是750px，那么1rem就应该等于10px。乘以100是为了将这个10px转换成100px，这样1rem就等于100px * 比例因子。
 * 最后，加上 'px' 是为了将计算结果转换为字符串，符合CSS属性赋值的要求。
 * 示例
 * 如果屏幕宽度是750px，那么 clientWidth / 750 等于1，因此 100 * 1 等于100px，即1rem等于100px。
 * 如果屏幕宽度是375px（一半的设计稿宽度），那么 clientWidth / 750 等于0.5，因此 100 * 0.5 等于50px，即1rem等于50px。
 * 通过这种方式，我们保证了不论屏幕宽度如何变化，设计稿中的10px宽度始终对应于网页上的1rem，从而实现了响应式布局。
 */