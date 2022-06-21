/**
 * https://zhuanlan.zhihu.com/p/77876876
 *
 * */
function EventEmitter() {
  this.listeners = {};
  this.maxListener = 10;
}

EventEmitter.prototype.on = function(event, cb) {
  if (!this.listeners[event]) {
    this.listeners[event] = [];
  }
  this.listeners[event].push(cb);
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
};

EventEmitter.prototype.emit = function(event, ...args) {
  this.listeners[event].forEach(fn => {
    fn(...args);
  });
};

EventEmitter.prototype.removeListener = function(event, listener) {
  if (!this.listeners[event]) {
    return;
  }
  this.listeners[event] = this.listeners[event].filter(fn => fn !== listener);
};

EventEmitter.prototype.once = function(event, listener) {
  var self = this;

  function fn() {
    var args = Array.prototype.slice.call(arguments);
    listener.apply(null, args);
    self.removeListener(event, fn);
  }

  this.on(event, fn);
};

EventEmitter.prototype.removeAllListener = function(event) {
  this.listeners[event] = [];
};

EventEmitter.prototype.listeners = function(event) {
  return this.listeners[event];
};

EventEmitter.prototype.setMaxListeners = function(num) {
  this.maxListener = num;
};