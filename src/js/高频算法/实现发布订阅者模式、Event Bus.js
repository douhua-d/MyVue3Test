class EventEmit {
  constructor(props) {
    this.events = {};
  }

  on(type, fn) {
    if (this.events[type]) {
      this.events[type].push(fn);
    } else {
      this.events[type] = [fn];
    }
  }

  off(type, fn) {
    if (!this.events[type]) return;
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(item => item !== fn);
    }
  }

  emit(type, ...args) {
    if (!this.events[type]) return;
    this.events[type].forEach(fn => fn(...args));
  }

  once(type, fn) {
    
    //  todo  这样的实现有问题，只有触发了才行，不能随时解绑
    function func() {
      fn();
      this.off(type, fn);
    }

    this.on(type, func);
  }

}