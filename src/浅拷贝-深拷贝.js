// 浅拷贝的实现
// Object.assign(target,source);
// 拓展运算符
// 数组的slice concat
function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== "object") return;
  // 根据 object 的类型判断是新建一个数组还是对象
  let newObj = Array.isArray(object) ? [] : {};
  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObj[key] = object[key];
    }
  }
  return newObj;
}

/**
 * 不能处理循环引用。
 只考虑了Object对象，而Array对象、Date对象、RegExp对象、Map对象、Set对象都变成了Object对象，且值也不正确。
 丢失了属性名为Symbol类型的属性。
 丢失了不可枚举的属性。
 原型上的属性也被添加到拷贝的对象中了*/
//深拷贝的实现
function deepCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== "object") return;
  // 根据 object 的类型判断是新建一个数组还是对象
  let newObj = Array.isArray(object) ? [] : {};
  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObj[key] = typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
    }
  }
  return newObj;
}

/**
 * 完美的深拷贝实现  考虑了各种类型的对象
 * */
function deepClone(target) {
  const map = new WeekMap();

  function isObject(target) {
    return (typeof target === "object" && target) || (typeof target === "function");
  }

  function clone(data) {

    if (!isObject(target)) {
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