function myAllSettled(promises) {
  return new Promise(resolve => {
    let results = [];
    let count = 0;
    promises.forEach((p, index) => {
      Promise.resolve(p).then(value => {
        results[index] = { status: "fulfilled", value };
      }).catch(reason => {
        results[index] = { status: "reject", reason };
      }).finally(() => {
        count++;
        if (count === promises.length) {
          resolve(results);
        }
      });
    });
  });
}

// 使用示例
const promise1 = Promise.resolve(42);
const promise2 = Promise.reject("Error");
const promise3 = Promise.resolve("Hello");

myAllSettled([100, promise1, promise2, promise3])
  .then(results => {
    results.forEach((result, index) => {
      console.log(`Promise ${index + 1}:`, result);
    });
  });