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
    function fn() {
      callback();
      this.off(type, fn);
    }

    this.on(type, fn);
  }

  emit(type, ...args) {
    this.events[type] && this.events[type].forEach(fn => {
      fn.apply(this, ...args);
    });
  }
}