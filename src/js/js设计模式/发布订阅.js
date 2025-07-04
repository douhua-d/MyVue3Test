// 发布订阅模式


class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, fn, isOnce = false) {
    if (this.events[type]) {
      this.events[type].push({ fn, isOnce });
    } else {
      this.events[type] = [{ fn, isOnce }];
    }
  }

  once(type, fn) {
    this.on(type, fn, true);
  }

  emit(type, ...args) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(item => {
      const { fn, isOnce } = item;
      fn(...args);
      if (isOnce) return false;
      return true;
    });
  }

  off(type, fn) {
    if (!fn) {
      this.events[type] = [];
    } else {
      const fnList = this.events[type];
      if (fnList) {
        this.events[type] = fnList.filter(item => item.fn !== fn);
      }
    }
  }
}

// 测试代码
const emitter = new EventEmitter();

// 测试 on 方法
const regularHandler = (message) => {
  console.log(`Regular handler received: ${message}`);
};
emitter.on('regularEvent', regularHandler);

// 测试 once 方法
const onceHandler = (message) => {
  console.log(`Once handler received: ${message}`);
};
emitter.once('onceEvent', onceHandler);

// 触发事件
emitter.emit('regularEvent', 'Hello, Regular!');
emitter.emit('onceEvent', 'Hello, Once!');

// 再次触发 onceEvent，验证 once 方法
emitter.emit('onceEvent', 'This should not be received by once handler');

// 测试 off 方法
emitter.off('regularEvent', regularHandler);
emitter.emit('regularEvent', 'This should not be received by regular handler');