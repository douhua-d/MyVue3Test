// 实现 浅拷贝
function shallowCopy(obj) {
  if (!obj || typeof obj !== "object") return;
  const newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

// 实现基础版深拷贝
function deepCopy(object) {
  if (typeof object !== "object" || !object) return;
  const newObj = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObj[key] = typeof object[key] ? deepCopy(object[key]) : object[key];
    }
  }
  return newObj;
}

// 实现完美版的 深拷贝
function deepClone(target) {
  const map = new WeakMap();

  function isObject(data) {
    return typeof data === "object" && data !== null;
  }

  function clone(data) {
    if (!isObject(data)) {
      return;
    }
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    if (typeof data === "function") {
      return new Function("return " + data.toString())();
    }
    const exist = map.get(data);
    if (exist) {
      return exist;
    }

    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }

    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach(val => {
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }

    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);

    keys.forEach(key => {
      const val = data[key];
      if (isObject(val)) {
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }

  return clone(target);
}