/**
 * // 示例
 * var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
 * var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'
 *
 * function getValue(target, valuePath, defaultValue) {}
 *
 * console.log(getValue(object, "a[0].b.c", 0)); // 输出3
 * console.log(getValue(array, "[0].a.b[0]", 12)); // 输出 1
 * console.log(getValue(array, "[0].a.b[0].c", 12)); // 输出 12
 */

function getValue(target, valuePath, defaultValue) {
  try {
    // 将路径字符串解析成路径数组
    const pathArray = valuePath.replace(/\[(\d+)\]/g, '.$1').split('.');

    // 遍历路径数组，逐层访问对象或数组
    let result = target;
    for (let key of pathArray) {
      result = result[key];
      // 如果访问无效路径，则返回默认值
      if (result === undefined) {
        return defaultValue;
      }
    }

    // 返回最终结果
    return result;
  } catch (e) {
    // 处理任何异常情况，返回默认值
    return defaultValue;
  }
}

// 示例测试
var object = { a: [{ b: { c: 3 } }] };
var array = [{ a: { b: [1] } }];

console.log(getValue(object, "a[0].b.c", 0)); // 输出3
console.log(getValue(array, "[0].a.b[0]", 12)); // 输出1
console.log(getValue(array, "[0].a.b[0].c", 12)); // 输出12
