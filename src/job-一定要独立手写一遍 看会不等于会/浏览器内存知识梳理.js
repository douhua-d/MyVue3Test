// 浏览器内存知识梳理

// https://juejin.cn/post/7221793823704514620#heading-2


let set = new Set();

set.add(1);
set.add(2);
set.add(1);
set.add({ name: 1 });
set.add({ name: 2 });
set.add({ name: 1 });

// console.log(set.entries());

for(let item of set.entries()){
  console.log(item);
}