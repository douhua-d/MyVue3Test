/**
 * 在JavaScript中，Promise 的 then 方法允许链式调用，并且在每个 then 中可以返回不同类型的数据。
 * 不同的返回值会影响后续 then 中接收到的数据。下面将详细说明各种情况及其影响。
 *
 * 返回值是普通值（非Promise对象）
 * 返回值是Promise对象
 * 返回值是另一个Promise链
 */


// 1. 返回普通值
// 如果 then 方法中的回调返回一个普通值，该值会被传递给下一个 then 方法中的回调。

// Promise.resolve(1)
//   .then(value => {
//     console.log(value); // 1
//     return value + 1;
//   })
//   .then(value => {
//     console.log(value); // 2
//     return value * 2;
//   })
//   .then(value => {
//     console.log(value); // 4
//   });


// 2. 返回Promise对象
// 如果 then 方法中的回调返回一个新的Promise对象，后续的 then 会等待该Promise对象的解析，并接收其解析后的值。
// 在这个例子中，第一个 then 返回一个新的Promise，第二个 then 等待这个Promise解析并接收其值。


// Promise.resolve(1)
//   .then(value => {
//     console.log(value); // 1
//     return new Promise(resolve => {
//       setTimeout(() => resolve(value + 1), 3000);
//     });
//   })
//   .then(value => {
//     console.log(value); // 2 (after 3 second)
//     return value * 2;
//   })
//   .then(value => {
//     console.log(value); // 4
//   });


Promise.resolve(1)
  .then(value => {
    console.log(value); // 1
  })
  .then(value => {
    console.log(value, 22); // undefined , 22
    return Promise.reject("err");
    // return value * 2;
  })
  .then(value => {
    console.log(value); // 4   上边抛出错误了就不会执行到这里了
  }).catch(err => {
  console.log("捕获 err", err);
});


// 3. 返回另一个Promise链
// 如果 then 返回的是一个已经存在的Promise链，那么该链的最终值会被传递给后续的 then。
// 在这个例子中，第一个 then 返回一个已经存在的 anotherPromise，第二个 then 等待 anotherPromise 解析并接收其值。

const anotherPromise = new Promise(resolve => {
  setTimeout(() => resolve(3), 1000);
});

Promise.resolve(1)
  .then(value => {
    console.log(value); // 1
    return anotherPromise;
  })
  .then(value => {
    console.log(value); // 3 (after 1 second)
  });


// 复杂示例：then 返回异步请求
// 假设我们有一个异步请求函数 fetchData，它返回一个Promise。
// 在这个例子中，每个 then 返回的是一个 fetchData 函数调用，该函数返回一个Promise。
// 每个 then 会等待上一个Promise解析，并接收其返回的数据。

function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

Promise.resolve(1)
  .then(value => {
    console.log(value); // 1
    return fetchData('https://api.example.com/data1');
  })
  .then(data => {
    console.log(data); // Data from https://api.example.com/data1 (after 1 second)
    return fetchData('https://api.example.com/data2');
  })
  .then(data => {
    console.log(data); // Data from https://api.example.com/data2 (after 1 second)
    return fetchData('https://api.example.com/data3');
  })
  .then(data => {
    console.log(data); // Data from https://api.example.com/data3 (after 1 second)
  });

