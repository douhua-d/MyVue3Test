class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback];
    } else {
      this.events[type].push(callback);
    }
  }

  off(type, callback) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(fn => fn !== callback);
  }

  once(type, callback) {
    const onceCallback = (data) => {
      callback(data);
      this.off(type, onceCallback);
    };

    this.on(type, onceCallback);
  }

  emit(type, ...args) {
    this.events[type] && this.events[type].forEach(fn => {
      fn.apply(this, args);
    });
  }
}



// --- 1. 初始化平台 ---
// 首先，我们得有一个外卖平台
const platform = new EventEmitter();

// --- 2. 定义我们的订阅者 (回调函数) ---
// a. 顾客的行为
const customer = {
  name: '小明',
  onOrder: () => {
    console.log(`【顾客-${customer.name}】: 订单已下！我的外卖什么时候到啊？`);
  },
  onDeliver: (food) => {
    console.log(`【顾客-${customer.name}】: 耶！我的【${food}】终于到了！开吃！`);
  },
  onLate: () => {
    console.log(`【顾客-${customer.name}】: 怎么还没到，我要给差评了！（只抱怨一次）`);
  }
};

// b. 餐厅的行为
const restaurant = {
  name: '沙县大酒店',
  onOrder: (food, customerName) => {
    console.log(`【餐厅-${restaurant.name}】: 收到【${customerName}】的订单，正在玩命制作【${food}】...`);
  },
  onPickup: () => {
    console.log(`【餐厅-${restaurant.name}】: 餐已备好，外卖小哥赶紧来取！`);
  }
};

// --- 3. 开始订阅事件 ---
// 现在，顾客和餐厅开始在平台上“订阅”他们关心的事件
// on(type, callback) - 持续监听

// 顾客和餐厅都关心“下单”事件
platform.on('order', customer.onOrder);
platform.on('order', restaurant.onOrder);

// 只有餐厅关心“取餐”事件
platform.on('pickup', restaurant.onPickup);

// 只有顾客关心“送达”事件
platform.on('deliver', customer.onDeliver);

// once(type, callback) - 只监听一次
// 顾客可能因为超时而抱怨，但只会抱怨一次，之后就不再关心这个事件了
platform.on('late', customer.onLate);


// --- 4. 模拟事件的发生 (发布事件) ---
// 随着时间的推移，外卖小哥开始触发平台上的各种事件
console.log('--- 外卖流程开始 ---');

// emit(type, ...args) - 触发事件，并可以传递参数
// 外卖小哥点击了“已下单”
platform.emit('order', '豪华版鸡腿饭', customer.name);
// 输出:
// 【顾客-小明】: 订单已下！我的外卖什么时候到啊？
// 【餐厅-沙县大酒店】: 收到【小明】的订单，正在玩命制作【豪华版鸡腿饭】...

console.log('\n--- 15分钟后 ---');
// 外卖小哥点击了“已取餐”
platform.emit('pickup');
// 输出:
// 【餐厅-沙县大酒店】: 餐已备好，外卖小哥赶紧来取！


// --- 5. 演示 off(type, callback) 解绑事件 ---
console.log('\n--- 餐厅很忙，决定不再接收下单通知 ---');
// 餐厅生意太火爆，老板决定暂时不看平台通知了，于是“取消订阅”
platform.off('order', restaurant.onOrder);
console.log('餐厅已关闭订单通知');

// 这时又有一个新订单，但只有顾客会收到通知
platform.emit('order', '精品小馄饨', '小红');
// 输出:
// 【顾客-小明】: 订单已下！我的外卖什么时候到啊？ (注意：小明的订阅还在)


console.log('\n--- 30分钟后，外卖超时了 ---');
// 触发“超时”事件
platform.emit('late');
// 输出:
// 【顾客-小明】: 怎么还没到，我要给差评了！（只抱怨一次）


console.log('\n--- 又过了5分钟，再次超时 ---');
// 再次触发“超时”事件，但因为顾客用的是 once，所以这次不会有任何反应
platform.emit('late');
// (无输出)


console.log('\n--- 终于，外卖送到了 ---');
// 外卖小哥点击了“已送达”
platform.emit('deliver', '豪华版鸡腿饭');
// 输出:
// 【顾客-小明】: 耶！我的【豪华版鸡腿饭】终于到了！开吃！

console.log('\n--- 外卖流程结束 ---');