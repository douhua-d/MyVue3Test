
// 例如，调用 printNumbers(5, 1000) 应该每隔 1 秒依次打印数字 1 到 5。

// 创建一个 delay 函数，返回一个 Promise，在指定的时间后解析
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 定义一个 async 函数来按顺序打印数字
async function printNumbers(n, delayTime) {
  for (let i = 1; i <= n; i++) {
    console.log(i); // 打印当前数字
    await delay(delayTime); // 等待指定的延迟时间
  }
}

// 调用 printNumbers 函数，示例: 打印 1 到 5，每个数字之间间隔 1 秒
printNumbers(5, 1000);
