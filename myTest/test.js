function currying(fn, ...args) {
  if (args.length > fn.length) {
    return fn(...args);
  }
  return (...args2) => currying(fn, ...args, ...args2);
}