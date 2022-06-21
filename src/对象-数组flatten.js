const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 }
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3
};

// flatten(obj) 结果返回如下 (阿里)
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }

function isObject(val) {
  return typeof val === "object" && val !== null;
}

function flatten(obj) {
  if (!isObject(obj)) {
    return;
  }
  let res = {};
  let dfs = (cur, prefix) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? "." : ""}${key}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dfs(obj, "");

  return res;
}

// console.log(flatten(obj));

//数组flatten
//https://juejin.cn/post/6844903999192350728
//https://juejin.cn/post/6844903779133816840
function flatten2(arr) {
  return arr.reduce((a, b) => {
    // return Array.isArray(b) ? a.concat(flatten(b)) : a.concat(b);
    return a.concat(Array.isArray(b) ? flatten2(b) : b);
  }, []);
};

// es6
const flatten1 = (arr =>
    arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten1(b) : b), [])
);

console.log(flatten1([1, [2, 3], 4, [[5, 6], 7]]));
console.log([1, [2, 3], 4, [[5, 6], 7]].flat(Infinity));