//https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex
//https://juejin.cn/post/6967272970196615199
//https://zhuanlan.zhihu.com/p/136223806
/**
 * flex 是 flex-grow flex-shrink  flex-basis 的简写
 * */
//
// flex:1 为：flex: 1 1 0;
// 数值 1 设置的是 flex-grow，flex-shrink没设置的时候默认值是1，和初始值一样的；
// 特殊在于flex-basis，初始值为 auto 那常规思路没设置就采用默认值则：flex:1 === flex:1 1 auto;
// 但MDN给了定义一个值的时候的解释，如果flex只定义了一个数字值，则 flex-basis 的值为 0；
// 所以：flex:1 为：flex: 1 1 0;

/**
 第一个参数表示: flex-grow 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
 第二个参数表示: flex-shrink 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
 第三个参数表示: flex-basis给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小
 * */


// /* 一个值, 无单位数字: flex-grow */
// flex: 2;
//
// /* 一个值, width/height: flex-basis */
// flex: 10em;
// flex: 30px;
// flex: min-content;
//
// /* 两个值: flex-grow | flex-basis */
// flex: 1 30px;
//
// /* 两个值: flex-grow | flex-shrink */
// flex: 2 2;
//
// /* 三个值: flex-grow | flex-shrink | flex-basis */
// flex: 2 2 10%;


// <'flex-grow'>
// 定义 flex 项目的 flex-grow 。负值无效。省略时默认值为 1。 (初始值为 0)

// <'flex-shrink'>
// 定义 flex 元素的 flex-shrink 。负值无效。省略时默认值为1。 (初始值为 1)

// <'flex-basis'>
// 定义 flex 元素的 flex-basis 属性。若值为0，则必须加上单位，以免被视作伸缩性。省略时默认值为 0。(初始值为 auto)