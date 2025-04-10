// a[3].b -> a.3.b
let path = "a[3].b";
// const paths = path.replace(/\[(\d+)\]/g, '.$1')  //a.3.b

//[ 'a', '3', 'b' ]
const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
// console.log(paths);

// let result = { a: [{ b: 1 }] };
// for (const p of paths) {
//   console.log("p---------", p);
//   console.log("Object(result)-----", Object(result)[p]);
// }

/**
 * 可选链，(optional chaining)，操作符表示为 ?.，
 * 属于 ES2020 新增的内容，另外在 Typescript 3.7 中也添加了可选链的操作，
 * 大大简化了对象的访问。通过获取对象属性获得的值可能是undefined或null时，
 * 可选链操作符提供了一种方法来简化被连接对象的值访问。
 const o = {}
 o?.a?.b?.c?.d
 */

// 实现 lodash 的 _get()
function _get(source, path, defaultValue) {
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let result = source;
  for (let p of paths) {
    console.log("p------", p);
    console.log("Object(result)-------", Object(result));
    result = Object(result)[p];
    console.log("Object(result)[p]------", result);
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}

/**
 * p------ a
 Object(result)------- { a: [ { b: 1 } ] }
 Object(result)[p]------ [ { b: 1 } ]
 p------ 0
 Object(result)------- [ { b: 1 } ]
 Object(result)[p]------ { b: 1 }
 p------ b
 Object(result)------- { b: 1 }
 Object(result)[p]------ 1
 最后的取值结果 1
 */
console.log("最后的取值结果", _get({ a: [{ b: 1 }] }, "a[0].b", 3));


// 写的取值路径没有值时
console.log("最后的取值结果", _get({ a: [{ b: 1 }] }, "a[3].b", 3));
/**
 * p------ a
 Object(result)------- { a: [ { b: 1 } ] }
 Object(result)[p]------ [ { b: 1 } ]
 p------ 3
 Object(result)------- [ { b: 1 } ]
 Object(result)[p]------ undefined
 最后的取值结果 3
 */