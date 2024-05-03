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