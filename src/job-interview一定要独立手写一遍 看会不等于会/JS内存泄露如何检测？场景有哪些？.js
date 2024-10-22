// avaScript内存泄露（memory leak）是指应用程序中已不再需要的内存没有被正确释放，
// 导致内存使用量不断增加，从而可能引发性能问题。
// 检测内存泄露和避免内存泄露是前端开发中的重要任务。以下是一些检测内存泄露的方法和常见场景

// 检测内存泄露的方法
// 使用浏览器开发工具
// 
// Chrome DevTools：Chrome浏览器的开发者工具提供了内存快照（Heap Snapshot）和时间线记录（Timeline）功能，用于分析内存使用情况。
// 打开DevTools，选择“Performance”面板，然后记录一段时间的性能数据。结束记录后，可以查看内存使用的变化趋势。
// 在“Memory”面板，可以拍摄Heap Snapshot，分析对象的分布和引用关系，查找哪些对象没有被正确释放。
// 使用第三方工具
// 
// LeakCanary：虽然主要用于Android开发，但也有一些类似的JavaScript库可以帮助检测内存泄露。
// Heap Analytics工具：一些分析工具，如New Relic、Dynatrace等，可以帮助监控和分析应用的内存使用情况。
// 手动分析
// 
// 定期检查应用的内存使用情况，尤其是在执行关键操作（如页面导航、数据加载）后，记录内存使用的变化。
// 通过代码审查和测试，查找可能导致内存泄露的代码段。



// 常见的内存泄露场景

// 全局变量
// 
// 不必要的全局变量会一直存在于内存中，直到页面刷新或关闭。避免使用全局变量，尽量使用局部变量或模块化的方式管理状态。
// 闭包
// 
// 闭包函数可以引用其外部作用域的变量，这些变量会保留在内存中。如果闭包没有正确释放或解除引用，可能会导致内存泄露。
// DOM引用
// 
// 当JavaScript对象和DOM节点互相引用时，即使从DOM中移除了节点，对象引用依然存在，会导致内存无法释放。确保在移除DOM节点时，同时解除其在JavaScript中的引用。
// 定时器和回调
// 
// 未清除的定时器（如setInterval、setTimeout）和事件监听器会导致内存泄露。确保在不再需要时清除定时器和解除事件监听器。
// 缓存和数据存储
// 
// 不当的缓存策略和过大的数据存储（如使用大量的localStorage）也可能导致内存泄露。需要定期清理和管理缓存。
// 未处理的异步请求
// 
// 异步请求（如fetch、XHR）未正确处理和清理，可能导致内存泄露。确保在请求完成后适当地处理和清理相关资源。

// 内存泄露示例
function createLeak() {
  var element = document.createElement('div');
  element.id = 'leak';
  document.body.appendChild(element);

  element.addEventListener('click', function() {
    console.log('Clicked');
  });
}

createLeak(); // 每次调用都会创建一个新的DOM节点并添加事件监听器，且不会被释放

// 解决方案
function createNoLeak() {
  var element = document.createElement('div');
  element.id = 'no-leak';
  document.body.appendChild(element);

  function handleClick() {
    console.log('Clicked');
    element.removeEventListener('click', handleClick); // 移除事件监听器
    document.body.removeChild(element); // 移除DOM节点
  }

  element.addEventListener('click', handleClick);
}

createNoLeak(); // 创建DOM节点并添加事件监听器，点击后正确清理资源

