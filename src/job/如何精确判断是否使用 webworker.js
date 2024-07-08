// . 经典模式（Classic Mode）
// 这是默认模式，如果没有指定 type，则使用经典模式。
// const worker = new Worker('worker.js');

// 2. 模块模式（Module Mode）
// 在模块模式中，可以使用 ECMAScript 模块特性，例如 import 和 export
// // main.js
// const worker = new Worker('worker.js', { type: 'module' });
// 
// // worker.js
// import { multiply } from './utils.js';
// 
// self.onmessage = function(event) {
//     console.log('Message received from main script');
//     const result = multiply(event.data[0], event.data[1]);
//     self.postMessage(result);
// };
// 
// // utils.js
// export function multiply(a, b) {
//     return a * b;
// }

// 3. 使用 credentials 属性
// credentials 属性指定是否应发送跨源请求的凭据。可选值为 'omit'（默认）、'same-origin' 或 'include'。
// // main.js
// const worker = new Worker('worker.js', { type: 'module', credentials: 'include' });
// 
// // worker.js
// import { fetchData } from './utils.js';
// 
// self.onmessage = function(event) {
//     fetchData().then(data => {
//         self.postMessage(data);
//     });
// };
// 
// // utils.js
// export async function fetchData() {
//     const response = await fetch('https://example.com/data', { credentials: 'include' });
//     return response.json();
// }

