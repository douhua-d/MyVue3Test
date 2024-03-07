class LRUCache {
  constructor(length) {
    this.length = length;
    this.data = new Map();
  }

  set(key, value) {
    const data = this.data;
    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);
    if (data.size > this.length) {
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  get(key) {
    const data = this.data;
    if (!data.has(key)) return null;
    const val = data.get(key);
    data.delete(key);
    data.set(key, val);
    return val;
  }
}

function deepCopy(target) {
  if (!target || typeof target !== "object") return;
  const res = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      res[key] = typeof target[key] === "object" ? deepCopy(target[key]) : target[key];
    }
  }
  return res;
}