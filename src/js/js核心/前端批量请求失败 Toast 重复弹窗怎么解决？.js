// https://mp.weixin.qq.com/s/vlcIgt9n4kh3D9eHNvrdVA

//解决这个问题的核心思想是：对弹窗通知进行“合并”或“去重”，在短时间内只显示一个代表性的错误提示。

//在业务层处理（Promise.allSettled）- 最精确的方案
// 如果你能明确知道哪些请求是“批量”的，你可以在具体的业务代码中处理，而不是在全局拦截器中。使用 Promise.allSettled 可以等待所有请求都完成后，再统一处理结果。

import { message } from 'antd';

async function handleBatchTasks() {
  const tasks = [fetchApiA(), fetchApiB(), fetchApiC()];

  // 🔥 allSettled 会等待所有 promise 完成，无论成功或失败
  const results = await Promise.allSettled(tasks);

  const failedTasks = results.filter(result => result.status === 'rejected');

  if (failedTasks.length > 0) {
    // 🔥 在所有请求结束后，只弹一次窗
    message.error(`${failedTasks.length} 个任务加载失败，请重试。`);

    // 你甚至可以把具体的错误原因打印到控制台
    failedTasks.forEach(task => console.error(task.reason));
  }
}

// 优点：控制力最强，可以精确知道成功了几个、失败了几个，并给出最详细的提示。
// 缺点：无法作为全局方案，只能用于你知道是“批量”的特定场景。