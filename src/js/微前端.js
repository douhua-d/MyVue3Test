
// 微前端
// https://juejin.cn/post/7113503219904430111

/**
 * 微前端是什么：微前端是一种类似于微服务的架构，是一种由独立交付的多个前端应用组成整体的架构风格，
 * 将前端应用分解成一些更小、更简单的能够独立开发、测试、部署的应用，而在用户看来仍然是内聚的单个产品。
 * 有一个基座应用（主应用），来管理各个子应用的加载和卸载。
 */

// 所以微前端不是指具体的库，不是指具体的框架，不是指具体的工具，而是一种理想与架构模式。

// 微前端的核心三大原则就是：独立运行、独立部署、独立开发

const map = new Map();
map.set('a',[1,2]);
map.set('b',[1,2,3]);
map.set('c',[1,2,3,6]);

console.log(map.values());
console.log(typeof  map.values());
console.log(map.keys());
console.log(typeof  map.keys());

console.log(Array.from(map.keys()));
console.log(Array.from(map.values()));

console.log('a'.charCodeAt());
// console.log('A'.charCodeAt());

console.log('b'.charCodeAt());
console.log('c'.charCodeAt());
