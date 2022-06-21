//https://www.jianshu.com/p/90b6280dd1b6
//https://blog.csdn.net/lianjiuxiao/article/details/116260070

Promise.myAll = function(iterator) {
  let count = 0;
  let len = iterator.length;
  let res = [];
  return new Promise((resolve, reject) => {
    for (let i in iterator) {
      Promise.resolve(iterator[i]).then(val => {
        count++;
        res[i] = val;
        if (count === len) {
          resolve(res);
        }
      }).catch(e => {
        reject(e);
      });
    }
  });
};

Promise.myRace = function(iterator) {
  return new Promise((resolve, reject) => {
    for (let item of iterator) {
      Promise.resolve(item).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    }
  });
};