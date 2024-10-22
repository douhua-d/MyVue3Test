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
        this.events[type] = fnList.filter(item => item !== fn);
      }
    }
  }
}