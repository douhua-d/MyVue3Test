const obj = { a: 1, b: 3 };

obj.c = "gsg ";
console.log(obj);

const arr = [4, "gh"];
arr.splice(1);

console.log(arr);

const arr = 1;

function fetchWithRetries(url, retries = 3) {
  return new Promise((resolve, reject) => {
    function attemptFetch(remainingRetries) {
      fetch(url).then(response => {
        if (!response.ok) {
          throw new Error("网络请求错误");
        }
        return response.json();
      }).then(data => {
        resolve(data);
      }).catch(err => {
        if (remainingRetries) {
          attemptFetch(remainingRetries - 1);
        } else {
          reject("重试三次失败");
        }
      });
    }

    attemptFetch(retries);
  });
}