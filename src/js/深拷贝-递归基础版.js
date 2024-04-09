/**
 * https://blog.csdn.net/cc18868876837/article/details/114918262
 *
 * 手动递归实现深拷贝，我们只需要完成以下2点即可：
 * 1. 对于基础类型，我们只需要简单地赋值即可（使用=）。
 * 2. 对于引用类型，我们需要创建新的对象，并通过遍历键来赋值对应的值，这个过程中如果遇到 Object 类型还需要再次进行遍历。
 */

function deepClone(target) {
  if (typeof target === "object" && target) {
    let cloneObj = {};
    for (const key in target) { // 遍历
      const val = target[key];
      if (typeof val === "object" && val) {
        cloneObj[key] = deepClone(val); // 是对象就再次调用该函数递归
      } else {
        cloneObj[key] = val; // 基本类型的话直接复制值
      }
    }
    return cloneObj;
  } else {
    return target;
  }
}

/**
 * 该基础版本存在许多问题：
 * 1. 不能处理循环引用。
 * 2. 只考虑了Object对象，而Array对象、Date对象、RegExp对象、Map对象、Set对象都变成了Object对象，且值也不正确。
 * 3. 丢失了属性名为Symbol类型的属性。
 * 4. 丢失了不可枚举的属性。
 * 5. 原型上的属性也被添加到拷贝的对象中了。
 */